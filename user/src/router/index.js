import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
        path:"/",
        name:"main",
        component:()=>import("@/views/main.vue"),
        redirect:"/home",
        children:[
          {
            path:"/home",
            name:"home",
            component:()=>import("@/views/home.vue")
          },
          {
            path:"/category",
            name:"category",
            component:()=>import("@/views/category.vue")
          }
        ]
      },
      {
        path:"/login",
        name:"login",
        component:()=>import("@/login.vue")
      }
    ]
})

export default router
