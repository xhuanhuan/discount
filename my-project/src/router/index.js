import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Post from '@/components/Post'
import Personal from '@/components/Personal'
import Login from '@/components/Login'
import signUp from '@/components/signup'
import Shop from '@/components/shop'
import Activity from '@/components/activity'
import map from '@/components/map'
import uploadimg from '@/components/uploadimg'
import citypicker from '@/components/citypicker'
import openshop from '@/components/OpenShop'
import uploadimg_iview from '@/components/uploadimg_iview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/uploadimg',
      name: 'uploadimg',
      component: uploadimg
    },
    {
      path: '/citypicker',
      name: 'citypicker',
      component: citypicker
    },
    {
      path: '/openshop',
      name: 'openshop',
      component: openshop
    },
    {
      path: '/uploadimg_iview',
      name: 'uploadimg_iview',
      component: uploadimg_iview
    }
  ]
})
