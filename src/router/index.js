import Vue from 'vue'
import Router from 'vue-router'

// 懒加载的方式加载组件
const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Fenlei = () => import('views/fenlei/Fenlei')
const Profile = () => import('views/profile/Profile')
const Detail = () => import('views/detail/Detail')

// 1、安装插件
Vue.use(Router);


const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Fenlei
  },
  {
    path:'/shopcart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
];

// 2、创建路由对象
const router = new Router({
  routes,
  mode:'history'
})

// 3、导出router,在main.js中导入该router
export default router