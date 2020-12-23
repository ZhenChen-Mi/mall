<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="titles"
                 @tabClick="tabClick"
                 ref="tabControlNew"
                 class="tab-control-new"
                 v-show="isTabFixed"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            :pull-down-refresh="false"
            @pullUpLoad="loadMore"
            >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from './childCompos/HomeSwiper'
  import RecommendView from './childCompos/RecommendView'
  import FeatureView from './childCompos/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";



  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {debounce} from "common/utils";


  export default{
    name:'Home',
    data() {
      return{
        banners:[],
        recommends:[],
        titles:['流行','新款','精品'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        leaveY:0
      }
    },
    components:{
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,100)

      // 监听item中图片加载完成
      // 最开始是没有$bus的，需要在main.js中给Vue的原型中添加$bus
      this.$bus.$on('itemImageLoad', () => {
        // 使用防抖动函数
        // this.$refs.scroll.refresh();
        refresh();
      });


    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods:{
      /**
       * 事件监听相关方法
       */

      tabClick(index) {
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControlNew.currentIndex = index
        this.$refs.tabControl.currentIndex = index
      },
      backTop(){
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position){
        // 1.判断BackTop是否显示
        this.isShowBackTop = position.y < -1000
        // 2.决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y > this.tabOffsetTop)
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 给tabOffsetTop赋值
        // 所有组件都有一个属性$el:用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      },

      // 改成使用事件总线监听
      /*imageLoad(){
        this.$refs.scroll.refresh();
      },*/
      /**
       * 网络请求相关方法
       */
      getHomeMultidata() {
        // 箭头函数作用域中this是往上层找
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp();
        });
      },

    },
    created() {
      // 1、请求多个数据
      this.getHomeMultidata();
      // 2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    destroyed(){

    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.leaveY);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.leaveY = this.$refs.scroll.getScrollY();
    }
  }
</script>

<!-- scoped 表示这些样式只对当前组件生效 -->
<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;

    position:relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /* 现在采用的是better-scroll插件实现滚动
       不会对navbar造成影响
       采用原生滚动式才使用以下样式
     */
    /*position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }


  /*原始吸顶效果*/
  /*.tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }*/




  .content{
    /*height: 300px;*/
    overflow: hidden;
    position:absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content{
    height: calc(100vh - 93px);
    overflow: hidden;
  }*/

  .tab-control-new{
    position: relative;
    z-index: 9;
  }
</style>
