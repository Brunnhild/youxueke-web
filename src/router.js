import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "fallback" */ '@/views/home')
      // meta: { requireLogin: true }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import(/* webpackChunkName: "verify" */ '@/views/users')
      // meta: { requireLogin: true }
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import(/* webpackChunkName: "verify" */ '@/views/teams')
      // meta: { requireLogin: true }
    },
    {
      path: '/match',
      name: 'match',
      component: () => import(/* webpackChunkName: "verify" */ '@/views/matchInfo')
      // meta: { requireLogin: true }
    },
    {
      path: '/verify',
      name: 'verify',
      component: () => import(/* webpackChunkName: "verify" */ '@/views/verify')
      // meta: { requireLogin: true }
    },
    {
      path: '*',
      name: 'not found',
      // for the unknown page
      redirect: '/'
    }
  ]
})
