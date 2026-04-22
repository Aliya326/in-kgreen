import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/Main.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/Home.vue'),
        },
        {
          path: 'user/list',
          name: 'userList',
          component: () => import('@/views/user/list.vue'),
        },
        {
          path: 'user/role',
          name: 'userRole',
          component: () => import('@/views/user/role.vue'),
        },
        {
          path: 'content/list',
          name: 'contentList',
          component: () => import('@/views/content/list.vue'),
        },
        {
          //分类
          path: 'content/category',
          name: 'contentCategory',
          component: () => import('@/views/content/category.vue'),
        }
      ]
    }

  ],
})

export default router
