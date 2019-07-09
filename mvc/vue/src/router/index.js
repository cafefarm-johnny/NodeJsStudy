import Vue from 'vue'
import Router from 'vue-router'

import body from '@/components/layout/body'

import add from '@/components/burger/add'
import list from '@/components/burger/list'

import signup from '@/components/sign/signup'
import signin from '@/components/sign/signin'

Vue.use(Router)

export default new Router({
  mode: 'history', 
  routes: [
    {
      path: '/',
      name: 'Body',
      component: body
    },
    {
      path: '/burger/add', 
      name: 'add', 
      component: add
    }, 
    {
      path: '/burger/list', 
      name: 'list', 
      component: list
    }, 
    {
      path: '/signup', 
      name: 'signup', 
      component: signup
    }, 
    {
      path: '/signin', 
      name: 'signin', 
      component: signin
    }
  ]
})
