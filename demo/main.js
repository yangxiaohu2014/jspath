// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import App from './app'
import {routes} from './router/config'

Vue.config.productionTip = false
Vue.use(Router)
const router =  new Router({
	mode: 'history',
	routes
})

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
	router,
	template: '<App/>',
	components: { App }
}).$mount('#app')
