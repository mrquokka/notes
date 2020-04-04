import Vue from 'vue'
import VueRouter from 'vue-router'

import main from '../views/main.vue'
import note from '../views/note.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/note/:id',
    name: 'note',
    component: note
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
