(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3f6ba16"],{7094:function(t,a,s){"use strict";var e=s("9d4e"),i=s.n(e);i.a},"9d4e":function(t,a,s){},bb51:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"home"},[s("div",{staticClass:"header"},[s("div",{staticClass:"address_map",on:{click:function(a){return t.$router.push({name:"address",params:{city:t.city}})}}},[s("i",{staticClass:"fa fa-map-marker"}),s("span",[t._v(t._s(t.address))]),s("i",{staticClass:"fa fa-sort-desc"})])]),s("div",{staticClass:"search_wrap",class:{fixedview:t.showFilter},on:{click:function(a){return t.$router.push("/search")}}},[t._m(0)]),s("div",{attrs:{id:"container"}},[s("mt-swipe",{staticClass:"swiper",attrs:{auto:4e3}},t._l(t.swipeImgs,function(t,a){return s("mt-swipe-item",{key:a},[s("img",{attrs:{src:t,alt:""}})])}),1),s("mt-swipe",{staticClass:"entries",attrs:{auto:0}},t._l(t.entries,function(a,e){return s("mt-swipe-item",{key:e,staticClass:"entry_wrap"},t._l(a,function(a,e){return s("div",{key:e,staticClass:"foodentry"},[s("div",{staticClass:"img_wrap"},[s("img",{attrs:{src:a.image,alt:""}})]),s("span",[t._v(t._s(a.name))])])}),0)}),1)],1),s("div",{staticClass:"shoplist-title"},[t._v("推荐商家")]),s("FilterView",{attrs:{filterData:t.filterData},on:{searchFixed:t.showFilterView,update:t.update}}),s("mt-loadmore",{ref:"loadmore",attrs:{"top-method":t.loadData,"bottom-method":t.loadMore,"bottom-all-loaded":t.allLoaded,"auto-fill":!1,bottomPullText:t.bottomPullText}},[s("div",{staticClass:"shoplist"},t._l(t.restaurants,function(t,a){return s("IndexShop",{key:a,attrs:{restaurant:t.restaurant}})}),1)])],1)},i=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"shop_search"},[s("i",{staticClass:"fa fa-search"}),t._v("\n      搜索商家 商家名称\n    ")])}],o=(s("ac6a"),s("76a0"),s("dbdd")),r=s("d91b"),n={name:"home",data:function(){return{swipeImgs:[],entries:[],filterData:null,showFilter:!1,page:1,size:5,restaurants:[],allLoaded:!1,bottomPullText:"上拉加载更多",data:null}},computed:{address:function(){return this.$store.getters.address},city:function(){return this.$store.getters.location.addressComponent.city||this.$store.getters.location.addressComponent.province}},created:function(){this.getData()},methods:{getData:function(){var t=this;this.$http("/api/profile/shopping").then(function(a){t.swipeImgs=a.data.swipeImgs,t.entries=a.data.entries}),this.$http("/api/profile/filter").then(function(a){t.filterData=a.data}),this.loadData()},loadData:function(){var t=this;this.page=1,this.allLoaded=!1,this.bottomPullText="上拉加载更多",this.$http.post("/api/profile/restaurants/".concat(this.page,"/").concat(this.size),this.data).then(function(a){console.log(a.data),t.$refs.loadmore.onTopLoaded(),t.restaurants=a.data})},loadMore:function(){var t=this;this.allLoaded||(this.page++,this.$http.post("/api/profile/restaurants/".concat(this.page,"/").concat(this.size)).then(function(a){t.$refs.loadmore.onBottomLoaded(),a.data.length>0?(a.data.forEach(function(a){t.restaurants.push(a)}),a.data<t.size&&(t.allLoaded=!0,t.bottomPullText="没有更多了哦")):(t.allLoaded=!0,t.bottomPullText="没有更多了哦")}))},showFilterView:function(t){this.showFilter=t},update:function(t){this.data=t,this.loadData()}},components:{FilterView:o["a"],IndexShop:r["a"]}},l=n,d=(s("7094"),s("2877")),c=Object(d["a"])(l,e,i,!1,null,"2957b496",null);a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-c3f6ba16.a25e3767.js.map