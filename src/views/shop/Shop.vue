<template>
    <div class="shop" v-if="showInfo">
        <!-- 头部 -->
        <nav class="header-nav">
            <div class="nav_bg">
                <img :src="showInfo.rst.scheme" alt="">
            </div>
            <div class="nav_back">
                <i @click="$router.push('/home')" class="fa fa-chevron-left">返回</i>
            </div>
            <div class="shop_image">
                <img :src="showInfo.rst.image_path" alt="">
            </div>
        </nav>
        <!-- 商家详情信息 -->
        <div class="index-rst">
            <div class="rst-name" @click="showInfoModel=true">
                <span>{{showInfo.rst.name}}</span>
                <i class="fa fa-caret-right"></i>
            </div>
            <!-- 弹窗信息 -->
            <InfoModel :rst="showInfo.rst" :showInfoModel="showInfoModel" @close="close"/>
            <!-- 评分月售 -->
            <div class="rst-order">
                <span>评分{{showInfo.rst.rating}}</span>
                <span>月售{{showInfo.rst.recent_order_num}}单</span>
                <span>蜂鸟专送约{{showInfo.rst.order_lead_time}}分钟</span>
            </div>
             <!-- 优惠信息 -->
             <!-- 公告 -->
             <p class="promotion">公告：{{showInfo.rst.promotion_info}}</p>
             <!-- 导航 -->
             <Navbar/>
             <!-- 容器 -->
             <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from "../../components/shop/Navbar"
import InfoModel from '../../components/shop/InfoModel'
export default {
   name: 'Shop',
   data () {
       return {
           showInfo:null,
           showInfoModel:false
       }
   },
   components: {
      Navbar, 
      InfoModel
   },
   created () {
       this.getData()
   },
   methods: {
       getData () {
           this.$http('/api/profile/batch_shop').then(res => {
               console.log(res)
               this.showInfo = res.data
           })
       },
       close () {
           this.showInfoModel = false
       }
   }
}
</script>

<style scoped>
.shop {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header-nav {
  position: relative;
}
.nav_bg img {
  width: 100%;
  height: 26.666667vw;
}
.nav_back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 26.666667vw;
  background: rgba(0, 0, 0, 0.5);
}
.nav_back i {
  color: #fff;
  font-size: 1.3rem;
  margin-left: 1.333333vw;
  margin-top: 1.333333vw;
}
.shop_image {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -10vw;
  margin-top: 11vw;
}
.shop_image img {
  width: 20vw;
  height: 20vw;
  border-radius: 0.8vw;
}

.index-rst {
  padding: 8vw 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  box-shadow: inset 0 -0.666667vw 0.666667vw hsla;
}
.index-rst .rst-name {
  flex: 1;
  width: 72vw;
  font-size: 1.3rem;
  font-weight: 700;
  white-space: nowrap;
  padding-right: 2.666667vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.6vw 0;
}
.rst-name span {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
}

.index-rst .rst-order {
  white-space: nowrap;
  height: 3.2vw;
  margin-top: 1.733333vw;
  color: #666;
  text-align: center;
  font-size: 0.6rem;
}
.rst-order span {
  margin: 0 3px;
}
.index-rst .rst-promotion {
  width: 80vw;
  font-size: 0.6rem;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 2.266667vw auto 2.666667vw;
  padding: 0;
  white-space: nowrap;
}
</style>