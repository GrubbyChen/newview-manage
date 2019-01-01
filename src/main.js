import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import antd from 'ant-design-vue'
// import { Button, Upload, Table, Tooltip, Divider, Icon, message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './styles/index.less'

Vue.use(antd)

// Vue.use(Button)
// Vue.use(Upload)
// Vue.use(Table)
// Vue.use(Tooltip)
// Vue.use(Divider)
// Vue.use(Icon)

// Vue.prototype.$message = message
// Vue.prototype.$confirm = confirm

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
