import Vue from 'vue'
import VueRouter from 'vue-router'

import TodoList from "@/components/TodoList";
import TodoPage from "@/components/TodoPage";



Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList
  },
  {
    path: '/:id',
    name: 'TodoPage',
    component: TodoPage,
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
