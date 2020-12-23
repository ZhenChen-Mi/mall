<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt="">
      <span class="title">{{shop.name}}</span>
    </div>

    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">
            {{shop.sells | sellCounteFilter}}
          </div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">
            {{shop.goodsCount}}
          </div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better' :item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more' :item.isBetter}"><span>{{item
              .isBetter?'高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailShopInfo",
    computed:{

    },
    filters:{
      sellCounteFilter:function (value) {
        const yu = Math.floor(value / 10000);
        if (yu > 0){
          return (yu + Math.floor((value%10000)/1000)/10) + '万';
        }
        return value;
      }
    },
    props:{
      shop:{
        type:Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .shop-info{
    padding: 0 10px;
    margin-top: 20px;
  }
  .shop-top img{
    width: 50px;
    height: 50px;
  }
  .title{
    margin-left: 10px;
    position: relative;
    top: -19px;
  }
  .shop-middle{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .shop-middle-item{
    flex: 1;
  }
  .shop-middle-left{
    display: flex;
    text-align: center;
  }
  .shop-middle-left{
    flex: 1;
  }
  .shop-middle-left div{
    flex: 1;
  }
  .info-goods{
    border-right: 2px solid #eee;
  }
  .sells-count{
    font-size: 20px;
  }
  .goods-count{
    font-size: 20px;
  }
  .sells-text{
    font-size: 13px;
  }
  .goods-text{
    font-size: 13px;
  }
  .shop-middle-right{
  }
  table{
    width: 95%;
    font-size: 13px;
    /*table-layout:fixed;*/
    margin-left:10%;
  }
  .score{
    color: green;
  }
  .score-better{
    color: var(--color-high-text);
  }
  .better span{
    color: #fff;
    background-color: green;
  }
  .better-more span{
    background-color: var(--color-high-text);
  }
  .shop-bottom{
    text-align: center;
    margin-top: 10px;
  }
  .enter-shop{
    display: inline-block;
    width: 50%;
    background-color: rgb(242,245,252);
    padding: 3px 10px;
    border-radius: 8px;
  }

</style>