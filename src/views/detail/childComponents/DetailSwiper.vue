<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImages">
      <img :src="item" alt=""  @load="topImagesLoad">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "DetailSwiper",
    data() {
      return {
        isLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      topImagesLoad(){
        if (!this.isLoad){
          this.$emit('detailImageLoad');
        };
        this.isLoad = true;
      }
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 300px;

  }
</style>