<template>
<!-- ref/children -> 父组件通过ref明确获取某一子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'   //要先引入BetterScroll插件
import PullDown from '@better-scroll/pull-down/'   //再引入 pulldown 插件
import PullUp from '@better-scroll/pull-up/'   //再引入 pullup 插件

BScroll.use(PullDown)
BScroll.use(PullUp)

export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    },
    pullDownRefresh:{
      type:Boolean,
      default: false
    }
  },
  data() {
    return{
      scroll:null
    }
  },
  mounted() {
    // 创建better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullDownRefresh:this.pullDownRefresh,
      pullUpLoad:this.pullUpLoad
    });
    // 监听滚动位置
    if (this.probeType ===2 || this.probeType ===3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scroll', position);
      })
    };
    if (this.pullDownRefresh){
      this.scroll.on('pullingDown', () => {
        this.$emit('pullDownRefresh');
      });
    };
    if (this.pullUpLoad){
      this.scroll.on('pullingUp',() => {
        this.$emit('pullUpLoad');
      });
    };



  },
  methods: {
    scrollTo(x, y, time = 300){
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    finishPullDown(){
      this.scroll && this.scroll.finishPullDown && this.scroll.finishPullDown();
    },
    refresh(){
      this.scroll && this.scroll.refresh() && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }

}
</script>

<style scoped>

</style>