<template>
  <div class="wrapper" ref="wrapper">
    <div>

    </div>
  </div>
</template>

<script>


  import BScroll from '@better-scroll/core'
  export default {
    name: 'Fenlei',
    data() {
      return{
        scroll:null
      }
    },
    components:{
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        
      })
    }
  }
</script>

<style scoped>
.wrapper{
  height: 200px;
  background-color: #ffff00;

  /*overflow: hidden;*/
}
</style>
