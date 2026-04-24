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
            path:"/archive",
            name:"archive",
            component:()=>import("@/views/archive.vue")
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
