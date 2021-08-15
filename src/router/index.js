import Vue from 'vue'
import VueRouter from 'vue-router'
import Memories from '../views/Memories.vue'
//import Tags from '../views/Tags.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Memories',
    component: Memories
  },

  {
    path: '/foods',
    name: 'Foods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Foods.vue')
  },
  
  {
    path: '/analisis',
    name: 'Analisis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Analisis.vue')
  },

  {
    path: '/tags',
    name: 'Tags',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tags.vue')
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
