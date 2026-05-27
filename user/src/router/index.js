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
            component:()=>import("@/views/home.vue"),
            meta:{ prefetch:["articles","category"] }
          },
          {
            path:"/archive",
            name:"archive",
            component:()=>import("@/views/archive.vue"),
            meta:{ prefetch:["articles"] }
          },
          {
            path:"/atPages/:id",
            name:"atPages",
            component:()=>import("@/views/atPages.vue"),
            meta:{ prefetch:["articles"] }
          },
          {
            path:"/about",
            name:"about",
            component:()=>import("@/about.vue")
          },
          {
            path:"/goableSearch",
            name:"goableSearch",
            component:()=>import("@/views/goableSearch.vue"),
            meta:{ prefetch:["articles"] }
          },
          {
            path:"/category",
            name:"category",
            component:()=>import("@/views/category.vue"),
            meta:{ prefetch:["category","articles"] }
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
