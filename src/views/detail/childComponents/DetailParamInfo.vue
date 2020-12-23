<template>
  <div class="param-info" v-if="Object.keys(paramInfo)">
    <table class="info-size">
      <tr>
        <td></td>
      </tr>
    </table>

    <table class="info-param">
      <tr>
        <td class="info-param-key"></td>
        <td class="param-value"></td>
      </tr>
    </table>

    <div class="info-img">
      <img src="" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props:{
    paramInfo:{
      type:Object,
      default() {
        return{}
      }
    }
  }
}
</script>

<style scoped>

</style>