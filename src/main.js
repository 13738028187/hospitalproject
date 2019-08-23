import Vue from 'vue'
import App from './App'
import fly from './utils/fly'
import 'mpvue-weui/src/style/weui.css'
import store from './store/index'
import promise from 'es6-promise'
import './utils/main.css'
import './utils/icon.css'
import './utils/animation.css'


Vue.config.productionTip = false
App.mpType = 'app'

import https from './store/state'
Vue.prototype.$https = https
Vue.prototype.$store = store
Vue.prototype.$fly = fly
Vue.prototype.$promise = promise

const app = new Vue(App)

app.$mount()

export default {

}
