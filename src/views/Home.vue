<template>
  <div class="home">
      <div class="header">
        <div class="address_map" @click="$router.push({name:'address',params: {city: city}})">
          <i class="fa fa-map-marker"></i>
          <span>{{address}}</span>
          <i class="fa fa-sort-desc"></i>
        </div>
      </div>
      <div class="search_wrap" :class="{'fixedview': showFilter}" @click="$router.push('/search')">
        <div class="shop_search">
          <i class="fa fa-search"></i>
          搜索商家 商家名称
        </div>
      </div>
      <div id="container">
        <!-- 轮播 -->
        <mt-swipe :auto="4000" class='swiper'>
          <mt-swipe-item v-for="(img,index) in swipeImgs" :key="index">
            <img :src="img" alt="">
          </mt-swipe-item>
        </mt-swipe>
        <!-- 分类 -->
         <mt-swipe :auto="0" class='entries' :show-indicators="false">
          <mt-swipe-item v-for="(item,i) in entries" :key="i">
            <div class="foodentry" v-for="(en,index) in item" :key="index">
              <div class="img_wrap">
                <img :src="en.image" alt="">
              </div>
              <span>{{en.name}}</span>
            </div>
          </mt-swipe-item>
        </mt-swipe>
        <!-- 推荐商家 -->
        <div class="shoplist-title">推荐商家</div>
        <!-- 筛查 -->
        <FilterView :filterData="filterData" @searchFixed="showFilterView" @update="update"/>
        <!-- 商家列表 -->
        <mt-loadmore 
        :top-method="loadData" 
        :bottom-method="loadMore" 
        :bottom-all-loaded="allLoaded" 
        :bottomLoadingText="bottomLoadingText"
        :auto-fill="false"
        ref="loadmore">
          <div class="sholist">
            <IndexShop :restaurant= "item.restaurant" v-for="(item,index) in restaurants" :key="index"/>
          </div>
        </mt-loadmore>
      </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import { Loadmore } from 'mint-ui'
import FilterView from '../components/FilterView'
import IndexShop from '../components/indexShop'
export default {
  name: 'home',
  data () {
    return {
      swipeImgs: [],
      entries: [],
      filterData: null,
      showFilter: false,
      size: 5,
      page: 1,
      restaurants: [],
      bottomLoadingText: "上拉加载更多",
      allLoaded: false,
      data: null

    }
  },
  components: {
    FilterView,
    IndexShop
  },
  created () {
     this.getData();
  },
  methods: {
    getData () {
      this.$http('/api/profile/shopping').then(res => {
        // console.log(res)
        this.swipeImgs =  res.data.swipeImgs
        this.entries = res.data.entries
      })
       this.$http('/api/profile/filter').then(res => {
        // console.log(res)
        this.filterData = res.data
      })
     this.loadData()
    },
    loadData () {
      this.page = 1
      this.allLoaded = false
      this.bottomLoadingText = "上拉加载更多"
       this.$http.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data)
      .then(res =>{
        // console.log(res)
        this.restaurants = res.data
        this.$refs.loadmore.onTopLoaded()
      })
    },
    loadMore () {
      if(!this.allLoaded) {
        this.page++
        this.$http.post(`/api/profile/restaurants/${this.page}/${this.size}`)
        .then(res =>{
          // console.log(res)
          this.$refs.loadmore.onBottomLoaded();
          if(res.data.length>0) {
            res.data.forEach(element => {
              this.restaurants.push(element)
            });
            if(res.data.length < this.size) {
              this.allLoaded = true
              this.bottomLoadingText = "没有更多了哦" 
            }
          }else {
            this.allLoaded = true
            this.bottomLoadingText = "没有更多了哦"
          }
        })
      }
    },
    showFilterView (isShow) {
      this.showFilter = isShow
    },
    update (condition) {
      console.log(condition)
      this.data = condition
      this.loadData()
    }
  },
  computed: {
    address () {
     return this.$store.getters.address;
    },
    city (){
      return this.$store.getters.location.addressComponent.city||his.$store.getters.location.addressComponent.province
    }
  }

}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search_wrap .shop_search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}

.search_wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img_wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img_wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}
/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #333;
  background: #fff;
}
.shoplist-title:after,
.shoplist-title:before {
  display: block;
  content: "一";
  width: 5.333333vw;
  height: 0.266667vw;
  color: #999;
}
.shoplist-title:before {
  margin-right: 3.466667vw;
}
.shoplist-title:after {
  margin-left: 3.466667vw;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}

.mint-loadmore {
  height: calc(100% - 95px);
  overflow: auto;
}
</style>