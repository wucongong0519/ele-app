<template>
    <div class="goods" v-if="showInfo">
      <!-- 推荐 -->
      <div class="recommend" v-for="(recommend,index) in showInfo.recommend" :key="index">
        <p class="recommend-name">{{recommend.name}}</p>
        <div class="recommend-wrap">
          <ul>
            <li v-for="(item,i) in recommend.items" :key="i">
              <img :src="item.image_path" alt="">
              <div class="recommend-food">
                <p class="recommend-food-name">{{item.name}}</p>
                <p class="recommend-food-zm">月售{{item.month_sales}} 好评率{{item.satisfy_rate}}</p>
              </div>
              <div class="recommend-food-price">
                <p>￥{{item.activity.fixed_price}}</p>
                <CartControll :food="item"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 分类 -->
      <div class="menuview">
        <!-- 左侧菜单 -->
        <div class="menu-wrapper" ref="menuScroll">
          <ul>
            <li v-for="(menu,index) in showInfo.menu" :key="index" @click="selectMenu(index)" :class="{'current':currentIndex == index}">
              <img v-if="menu.icon_url" :src="menu.icon_url" alt="">
              <span>{{menu.name}}</span>
            </li>
          </ul>
        </div>
        <!-- 右侧列表 -->
        <div class="foods-wrapper" ref="foodScroll">
          <ul>
            <li class="food-list-hook" v-for="(item,index) in showInfo.menu" :key="index" >
              <!-- 标题 -->
              <div class="category-title">
                <strong>{{item.name}}</strong>
                <span>{{item.description}}</span>
              </div>
              <!-- 标题下foodlist -->
              <div 
                v-for="(food,i) in item.foods"
                :key="i"
                class="fooddetails"
              >
                 <img :src="food.image_path" alt="">
                 <section class="fooddetails-info">
                   <h4>{{food.name}}</h4>
                   <p class="fooddetails-des">{{food.description}}</p>
                   <p class="fooddetails-sales">月售{{food.month_sales}}分 好评率{{food.satisfy_rate}}</p>
                   <div class="fooddetails-price">
                     <span class="price">￥{{food.activity.fixed_price}}</span>
                     <CartControll :food="food"/>
                   </div>
                 </section>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 购物车 -->
      <ShopCart :shopInfo="showInfo"/>
      <!-- 商品详情 -->
      <Food :food="selectFood" :isShow="showFood" @close="close"/>
    </div>
</template>

<script>
import CartControll from '../../components/shop/CartControll'
import ShopCart from '../../components/shop/ShopCart'
import Food from '../../components/shop/Food'
import BScroll from 'better-scroll'
export default {
  name: 'Goods',
  data () {
    return {
      showInfo: null,
      menuScroll: {},
      foodScroll: {},
      scrollY: 0,
      listHeight: [], //12个菜单的高度
      selectFood: null,
      showFood: false,
    }
  },
  components: {
    CartControll,
    ShopCart,
    Food
  },
  computed: {
    currentIndex  () {
      for(let i=0;i<this.listHeight.length;i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i+1]
        if(this.scrollY>=h1&&this.scrollY<=h2) {
          return i
        }
      }
      return 0
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$http('/api/profile/batch_shop').then(res => {
       res.data.recommend.forEach(element => {
         element.items.forEach(item => {
           item.count = 0
         })
       });
       res.data.menu.forEach(menu => {
         menu.foods.forEach(item => {
           item.count = 0
         })
       });
        console.log(res)
        this.showInfo = res.data
        this.$nextTick(() => {
          // DOM已经更新
          this.initScroll();
          this.calcHeight()
        });
      })
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuScroll,{
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodScroll,{
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll',pos => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    selectMenu (index) {
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      let el = foodlist[index]
      console.log(this.foodScroll)
      this.foodScroll.scrollToElement(el, 250);
    },
    calcHeight () {
      let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
      console.log(foodlist)
      let height = 0
      this.listHeight.push(0)
      for(let i = 0; i<foodlist.length-1;i++) {
        height += foodlist[i].clientHeight
        this.listHeight.push(height)
      } 
      console.log(this.listHeight)
    },
    handleFood (food) {
      this.showFood = true
      this.selectFood = Food
    },
    close () {
      this.showFood = false
    }
  }
}
</script>

<style scoped>
.goods {
  position: relative;
  height: calc(100% - 10.666667vw);
  /* width:100%; */
}

.recommend {
  padding-top: 4.266667vw;
  background-color: #fff;
}
.recommend-name {
  padding-left: 4.266667vw;
  color: #333;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 2.666667vw;
}
.recommend-wrap {
  overflow-x: scroll;
  display: flex;
  width: 100%;
}
.recommend-wrap ul {
  display: flex;
  padding-left: 4.266667vw;
}
.recommend-wrap ul li {
  flex: none;
  width: 32vw;
  margin-right: 2.666667vw;
}
.recommend-wrap li img {
  display: block;
  width: 32vw;
  height: 32vw;
  border-top-left-radius: 0.8vw;
  border-top-right-radius: 0.8vw;
  max-width: 100%;
}
.recommend-food .recommend-food-name {
  color: #333;
  font-size: 0.8rem;
  margin: 1.866667vw 0 1.233333vw;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.recommend-food .recommend-food-zm {
  color: #999;
  font-size: 0.6rem;
  margin-bottom: 1.866667vw;
  min-height: 1em;
}
.recommend-food-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0.266667vw;
}
.recommend-food-price p {
  font-size: 1rem;
  color: #ff5339;
}

::-webkit-scrollbar {
  width: 0 !important;
}

.menuview {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 10.8vw;
  background-color: #fff;
  display: flex;
  /* overflow: hidden; */
  /* position: sticky; */
}
.menu-wrapper {
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100% - 12.8vw);
  background-color: #f8f8f8;
  padding-bottom: 10.666667vw;
  width: 20.533333vw;
  overflow: hidden;
}
.menu-wrapper li {
  padding: 4.666667vw 2vw;
  font-size: 0.6rem;
  color: #666;
  line-height: 1.2;
}
.menu-wrapper li img {
  max-width: 100%;
  width: 3.466667vw;
  height: 3.466667vw;
  vertical-align: top;
  margin-right: 0.8vw;
}

.foods-wrapper {
  overflow-y: hidden;
  /* height: 100%; */
  height: calc(100% - 12.8vw);
  width: 79.466667vw;
  padding-bottom: 10.666667vw;
  overflow: hidden;
}
.category-title {
  margin-left: 2.666667vw;
  padding: 2vw 8vw 2vw 0;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.category-title strong {
  margin-right: 1.333333vw;
  font-weight: 700;
  font-size: 0.8rem;
  color: #666;
  flex: none;
}
.category-title span {
  flex: 1;
  color: #999;
  font-size: 0.6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fooddetails {
  min-height: 30.666667vw;
  padding: 2.666667vw 0 2.666667vw 2.666667vw;
  margin-bottom: 0.133333vw;
  display: flex;
}
.fooddetails img {
  width: 25.333333vw;
  height: 25.333333vw;
  flex: none;
  margin-right: 2.666667vw;
  border-radius: 0.533333vw;
}
.fooddetails-info {
  flex: 1;
  padding-bottom: 6.666667vw;
  padding-right: 4vw;
}
.fooddetails-info h4 {
  padding-right: 4vw;
  font-weight: 700;
  overflow: hidden;
  font-size: 1rem;
  white-space: nowrap;
  width: 40vw;
  text-overflow: ellipsis;
  color: #333;
}
.fooddetails-des {
  margin: 1.333333vw 0;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 42.666667vw;
}
.fooddetails-sales {
  margin: 1.733333vw 0 !important;
  color: #999;
  font-size: 0.6rem;
  line-height: 1;
  min-height: 1em;
}
.fooddetails-price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 3.733333vw;
}
.fooddetails-price .price {
  font-size: 1rem;
  line-height: 4.266667vw;
  color: #ff5339;
  padding-bottom: 0.933333vw;
  display: flex;
  align-items: baseline;
}

.menu-wrapper .current {
  background-color: #fff !important;
  color: #333 !important;
}
</style>

