import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './config/routes'
import store from './store/'

import './assets/stylesheets/app.scss'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({ store, router }).$mount('#app')

