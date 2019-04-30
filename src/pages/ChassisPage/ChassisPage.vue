<template>
<div class="big">
    <div class="left">
      <img src="../../assets/images/left.png" alt="左边看板区" class="left_bg">
      <img :src="item.url" alt="" class="iconPosition"  v-for="(item) in positionMix" :key="item.url" :style="`left:${item.x/100}rem;top:${item.x/100}rem`">
    </div>
    <div class="right">
      <div class="logoDiv">
        <img src="../../assets/images/logo.png" alt="商标" class="logo">
      </div>
      <div class="technology">
        <img src="../../assets/images/Technology.png" alt="工艺" class="icon_g">
        <p class="tecText">工艺</p>
        <p class="tecEnglish">Technology</p>
        <p class="tecNum">2</p>
      </div>
      <div class="quality">
        <img src="../../assets/images/Quality.png" alt="质量" class="icon_z">
        <p class="tecText">质量</p>
        <p class="tecEnglish">Quality</p>
        <p class="tecNum">4</p>
      </div>
      <div class="equipment">
        <img src="../../assets/images/Equipment.png" alt="设备" class="icon_s">
        <p class="tecText">设备</p>
        <p class="tecEnglish">Equipment</p>
        <p class="tecNum">6</p>
      </div>
      <div class="production">
        <img src="../../assets/images/Production.png" alt="生产" class="icon_c">
        <p class="tecText">生产</p>
        <p class="tecEnglish">Production</p>
        <p class="tecNum">2</p>
      </div>
      <div class="materiel">
        <img src="../../assets/images/Materiel.png" alt="物料" class="icon_l">
        <p class="tecText">物料</p>
        <p class="tecEnglish">Materiel</p>
        <p class="tecNum">2</p>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      //定位图片
      positionImgs:[
        {url:require('../../assets/images/Technology.png')},
        {url:require('../../assets/images/Quality.png')},
        {url:require('../../assets/images/Equipment.png')},
        {url:require('../../assets/images/Production.png')},
        {url:require('../../assets/images/Materiel.png')}
      ],
      //模拟定位
      positionXY:[
        {x:100,y:200},
        {x:150,y:99},
        {x:490,y:320},
        {x:733,y:600},
        {x:20,y:1000},
      ]
    }
  },
  mounted() {
    // this.$axios.post('/Api/Adtype/GetAndonTypeInformation').then(res => {
    //   console.log(res)
    // })
  },
  computed: {
    //处理过后的定位图遍历数组：包括图片和位置
    positionMix() {
      const positionMix = []
      this.positionImgs.forEach((item, index) => {
        this.positionXY.forEach((i, number) => {
          // this.positionImgs[index]
          if(index == number) { 
            positionMix.push(Object.assign(item,i))
          }
        })
      })
      return positionMix
    }
  }
}
</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.big
  width 19.2rem
  height 10.8rem
  position absolute
  background url('../../assets/images/bg.png') no-repeat
  background-size cover
  .left
    width 14.19rem
    height 10.12rem
    position absolute
    left .34rem
    top .35rem
    .left_bg
      width 14.19rem
      height 10.12rem
    .iconPosition
      position absolute
      left 2rem
      top 1rem
  .right
    .logoDiv
      width 2.48rem
      height .95rem
      position absolute
      left 15.61rem
      top .41rem
      .logo
        width 2.48rem
        height .95rem
    .technology
      width 3.79rem
      height 1.37rem
      position absolute
      left 14.94rem
      top 1.85rem
      background url('../../assets/images/bgSmall.png')
      background-size contain
      background-size 3.79rem 1.37rem
      .icon_g
        width .7rem
        height .86rem
        position absolute
        left .14rem
        top .27rem
      .tecText
        font-size .41rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left .92rem
        top .48rem
        color #fff
      .tecEnglish
        font-size .21rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 1.82rem
        top .73rem
        color #fff
      .tecNum
        font-size .65rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 3.15rem
        top .42rem
        color #fff
    .quality
      width 3.79rem
      height 1.37rem
      position absolute
      left 14.94rem
      top 3.66rem
      background url('../../assets/images/bgSmall.png')
      background-size contain
      background-size 3.79rem 1.37rem
      .icon_z
        width .7rem
        height .86rem
        position absolute
        left .14rem
        top .27rem
      .tecText
        font-size .41rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left .92rem
        top .48rem
        color #fff
      .tecEnglish
        font-size .21rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 1.82rem
        top .73rem
        color #fff
      .tecNum
        font-size .65rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 3.15rem
        top .42rem
        color #fff
    .equipment
      width 3.79rem
      height 1.37rem
      position absolute
      left 14.94rem
      top 5.52rem
      background url('../../assets/images/bgSmall.png')
      background-size contain
      background-size 3.79rem 1.37rem
      .icon_s
        width .7rem
        height .86rem
        position absolute
        left .14rem
        top .27rem
      .tecText
        font-size .41rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left .92rem
        top .48rem
        color #fff
      .tecEnglish
        font-size .21rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 1.82rem
        top .73rem
        color #fff
      .tecNum
        font-size .65rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 3.15rem
        top .42rem
        color #fff
    .production
      width 3.79rem
      height 1.37rem
      position absolute
      left 14.94rem
      top 7.3rem
      background url('../../assets/images/bgSmall.png')
      background-size contain
      background-size 3.79rem 1.37rem
      .icon_c
        width .7rem
        height .86rem
        position absolute
        left .14rem
        top .27rem
      .tecText
        font-size .41rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left .92rem
        top .48rem
        color #fff
      .tecEnglish
        font-size .21rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 1.82rem
        top .73rem
        color #fff
      .tecNum
        font-size .65rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 3.15rem
        top .42rem
        color #fff
    .materiel
      width 3.79rem
      height 1.37rem
      position absolute
      left 14.94rem
      top 9.09rem
      background url('../../assets/images/bgSmall.png')
      background-size contain
      background-size 3.79rem 1.37rem
      .icon_l
        width .7rem
        height .86rem
        position absolute
        left .14rem
        top .27rem
      .tecText
        font-size .41rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left .92rem
        top .48rem
        color #fff
      .tecEnglish
        font-size .21rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 1.82rem
        top .73rem
        color #fff
      .tecNum
        font-size .65rem
        font-family 'PingFang-SC-Medium'
        font-weight 500
        position absolute
        left 3.15rem
        top .42rem
        color #fff
</style>