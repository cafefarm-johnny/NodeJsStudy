import Vue from 'vue'
import Router from 'vue-router'
import body from '@/components/layout/body';
import add from '@/components/burger/add';
import list from '@/components/burger/list';

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
    }
  ]
})
