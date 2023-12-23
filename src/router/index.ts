import { createRouter, createWebHistory } from 'vue-router'


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
        }
      ]
    },
  ]
})

export default router
