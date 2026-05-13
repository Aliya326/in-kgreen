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
          },
          {
            path:"/atPages/:id",
            name:"atPages",
            component:()=>import("@/views/atPages.vue")
          },
          {
            path:"/about",
            name:"about",
            component:()=>import("@/about.vue")
          },
          {
            path:"/goableSearch",
            name:"goableSearch",
            component:()=>import("@/views/goableSearch.vue")
          },
          {
            path:"/category",
            name:"category",
            component:()=>import("@/views/category.vue")
          },
          
        ]
      },
      {
        path:"/:pathMatch(.*)*",
        name:"not-found",
        component:()=>import("@/404.vue")
      },

    ]
})

export default router
