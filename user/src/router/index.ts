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
            meta:{ prefetch:["articlesPage","categoriesList"], pageSize: 20 }
          },
          {
            path:"/archive",
            name:"archive",
            component:()=>import("@/views/archive.vue"),
            meta:{ prefetch:["articlesPage"], pageSize: 30 }
          },
          {
            path:"/atPages/:id",
            name:"atPages",
            component:()=>import("@/views/atPages.vue"),
            meta:{ prefetch:["articleDetail"] }
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
            meta:{ prefetch:["articlesPage"], pageSize: 20 }
          },
          {
            path:"/category",
            name:"category",
            component:()=>import("@/views/category.vue"),
            meta:{ prefetch:["categoriesList","articlesPage"], pageSize: 24 }
          },
        ]
      },
      {
        path:"/login",
        name:"login",
        component:()=>import("@/login.vue")
      },
      {
        path:"/register",
        name:"register",
        component:()=>import("@/Register.vue")
      },
      {
        path:"/:pathMatch(.*)*",
        name:"not-found",
        component:()=>import("@/404.vue")
      },
    ]
})

export default router
