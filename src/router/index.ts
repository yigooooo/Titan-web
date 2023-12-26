import { createRouter, createWebHistory } from 'vue-router'
import * as path from "path";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/Login.vue')
    },
    {
      path:'/RootIndex',
      name:'RootIndex',
      component:()=> import('@/RootIndex.vue'),
      children:[
        {
          path:'main',
          name:'main',
          component:()=> import('@/views/Mian.vue')
        },
        {
          path:'doctor',
          name:'doctor',
          component:()=> import('@/views/Doctor.vue')
        },
        {
          path:'nurse',
          name:'nurse',
          component:()=> import('@/views/Nurse.vue')
        },
        {
          path:'department',
          name:'department',
          component:()=> import('@/views/Department.vue')
        },
        {
          path:'ward',
          name:'ward',
          component:()=> import('@/views/Ward.vue')
        },
        {
          path:'bed',
          name:'bed',
          component:()=> import('@/views/Bed.vue')
        },
        {
          path:'rootWorkSpace',
          name:'rootWorkSpace',
          component:()=> import('@/views/WorkSpace.vue'),
          children:[
            {
              path: 'rootInfo',
              name: 'rootInfo',
              component: () => import('@/views/components/root/RootInfo.vue')
            },
            {
              path:'resetPassword',
              name:'resetPassword',
              component:() => import('@/views/components/root/ResetPassword.vue')
            }
          ]
        }
      ]
    },
  ]
})

export default router
