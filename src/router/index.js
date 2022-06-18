import Vue from 'vue'
import VueRouter from 'vue-router'
import Memories from '../views/Memories.vue'
import store from '../store/index.js'

Vue.use(VueRouter)


const routes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgotPassword.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    //beforeEnter: guardMyroute,
    meta: {
      requiresAuth: false//true
    }
  },
  {
    path: '/',
    name: 'Memories',
    component: Memories,
    //beforeEnter: guardMyroute,
    meta: {
      requiresAuth: false//true
    }
  },

  {
    path: '/foods',
    name: 'Foods',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Foods.vue'),
    //beforeEnter: guardMyroute,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/chat',
    name: 'Chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Chat.vue'),
    //beforeEnter: guardMyroute,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/analisis',
    name: 'Analisis',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Analisis.vue'),
    //beforeEnter: guardMyroute,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/tags',
    name: 'Tags',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tags.vue'),
    //beforeEnter: guardMyroute,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//Guards
router.beforeEach((to, from, next) => {
  const authenticatedUser = store.getters.isLogged;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !authenticatedUser) next('login')// si no auth mandarlo al login
  else if (!requiresAuth && authenticatedUser) next('/')// si esta auth no dejarlo ir al login/register
  else next();// si todo ok ir al intended place
});
//

export default router
/*
function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
if(localStorage.getItem('access_token'))
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated)
 {
  next(); // allow to enter route
 }
 else
 {
  next('/login'); // go to '/login';
 }
}
*/