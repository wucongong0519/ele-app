import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
      {path:'/',name:'index', component: () => import('./views/index.vue'),
       children: [
         {
           path: '',
           redirect: '/home'
         },
         {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('./views/Order.vue')
        },
        {
          path: '/me',
          name: 'me',
          component: () => import('./views/Me.vue')
        },
        {
          path: '/address',
          name: 'address',
          component: () => import('./views/Address.vue')
        },
        {
          path: '/city',
          name: 'city',
          component: () => import('./views/City.vue')
        },
       ]  
    },
      {path:'/login',name:'login', component: () => import('./views/login.vue')},
      {path:'/search',name:'search', component: () => import('./views/Search.vue')},
      {path:'/shop',name:'shop', component: () => import('./views/shop/Shop.vue'),redirect:'/goods',
      children: [
        {path:'/goods', name:'goods',component: ()=> import('./views/shop/Goods.vue')},
        {path:'/seller', name:'seller',component: ()=> import('./views/shop/Seller.vue')},
        {path:'/comments', name:'comments',component: ()=> import('./views/shop/Comment.vue')}
      ]
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true :false
  if (to.path==='/login') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})
export default router