import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserVIew from "@/views/Users/UserVIew.vue";
import UserCreateVIew from "@/views/Users/UserCreateVIew.vue";
import UserEditView from "@/views/Users/UserEditView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: UserVIew
    },
    {
      path: '/users/create',
      name: 'userCreate',
      component: UserCreateVIew
    },
    {
      path: '/users/:id/edit',
      name: 'userEdit',
      component: UserEditView
    },
  ]
})

export default router
