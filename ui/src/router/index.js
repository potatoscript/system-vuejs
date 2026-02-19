import { createRouter, createWebHistory } from 'vue-router'
import JobView from '../views/JobView.vue'

const routes = [
  {
    path: '/',
    name: 'job',
    component: JobView
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import('../views/EmployeeView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/SignUp.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
