import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // order
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../views/order/ListView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/order/MainView.vue'),
    },
    {
      path: '/orders/register',
      name: 'order-register',
      component: () => import('../views/order/RegisterView.vue'),
    },
    {
      path: '/orders/register/:id',
      name: 'order-update',
      component: () => import('../views/order/RegisterView.vue'),
    },
    {
      path: '/orders/:id',
      name: 'order-detail',
      component: () => import('../views/order/DetailView.vue'),
    },
    // admin menu
    {
      path: '/admin/home',
      name: 'menus-home',
      component: () => import('../views/admin-menu/MainView.vue'),
    },
    {
      path: '/admin/menus/register',
      name: 'menus-register',
      component: () => import('../views/admin-menu/RegisterView.vue'),
    },
    {
      path: '/admin/menus',
      name: 'menus',
      component: () => import('../views/admin-menu/ListView.vue'),
    },
    // :id << 이런거 들어오는거를 밑에다 둬야 함. 아니면 다른거 씹힐 수 있음.
    {
      path: '/admin/menus/:id',
      name: 'menus-detail',
      component: () => import('../views/admin-menu/DetailView.vue'),
    },

    // update
    {
      path: '/admin/menus/register/:id',
      name: 'menus-update',
      component: () => import('../views/admin-menu/RegisterView.vue'),
    },
  ],
});

export default router;
