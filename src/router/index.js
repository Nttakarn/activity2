import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Login.vue'
import signup from '../views/Signup.vue'
// import aa from '../views/aa.vue'
import home from '../views/home.vue'
import admin from '../views/admin.vue'
import test from '../views/test.vue'
import aa from '../views/MyAc.vue'
import vv from '../views/vv.vue'
import profile from '../views/profile.vue'
import barHome from '../components/barHome.vue'
import addCoin from '../components/addCoin.vue'
// import coinHis from '../components/coinHis.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/vv',
    name: 'vv',
    component: vv
  },
  {
    path: '/profile/:ID_student',
    name: 'profile',
    component: profile
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
  {
    path: '/test',
    name: 'test',
    component: test
  },
  {
    path: '/addCoin',
    name: 'addCoin',
    component: addCoin
  },
  // {
  //   path: '/coinHis/:name_coin/:ID',
  //   name: 'coinHis',
  //   component: coinHis
  // },
  {
    path: '/MyAc/:ID_student',
    name: 'MyAc',
    component: aa
  },
  {
    path: '/barHome',
    name: 'barHome',
    component: barHome
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
