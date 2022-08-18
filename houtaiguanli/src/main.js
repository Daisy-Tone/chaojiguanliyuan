import Vue from 'vue'
import App from './App.vue'
import {
  Button, Radio, Container, Main, Header, Aside, Menu, Submenu,
  MenuItem, MenuItemGroup, Row, Col, Dropdown, DropdownMenu, DropdownItem,
  Card, Divider, Table, TableColumn, Breadcrumb, BreadcrumbItem, Tag, Form,
  FormItem, Input, Select, Option, Switch, DatePicker, Dialog, Pagination,
  MessageBox, Message
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../public/css/reset.css'


import router from './router'
import store from './store'
import axios from 'axios'
import './api/mock.js'


Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Radio);
Vue.use(Container);
Vue.use(Main);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Row);
Vue.use(Col);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Switch);
Vue.use(DatePicker);
Vue.use(Dialog);
Vue.use(Pagination);

Vue.prototype.$axios = axios
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

// 路由守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  // 如果token为空并且访问的路径不为登录，则自动跳转到登录页面
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }
  else if(token && to.name === 'login'){
    next({name:'home'})
  }
  else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
