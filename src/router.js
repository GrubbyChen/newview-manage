import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/carousel'
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: () => import('./views/Carousel.vue')
    },
    {
      path: '/photo',
      name: 'photo',
      component: () => import('./views/Photo.vue')
    },
    {
      path: '/album',
      name: 'album',
      component: () => import('./views/Album.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import('./views/Video.vue')
    }
  ]
})
