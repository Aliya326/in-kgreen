import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:"/",
      name:"main",
      component:()=>import("@/main.vue"),
      redirect:"/home",
      children:[
      {
        path:"/home",
        name:"home",
        component:()=>import("@/views/home.vue")
      },
    ]
  }
  ],
})

export default router
