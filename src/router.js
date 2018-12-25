import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: () => import('./views/Carousel.vue')
    },
    {
      path: '/picture',
      name: 'picture',
      component: () => import('./views/Picture.vue')
    },
    {
      path: '/camera',
      name: 'camera',
      component: () => import('./views/Camera.vue')
    }
  ]
})
