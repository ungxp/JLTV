<template>
<div class="big">
    <div class="distribution">
        <p class="txtDistribution">订单分布</p>
        <p class="enDistribution">Order Distribution</p>
        <div class="car1">
            <img src="../../assets/images/car1.png" alt="汽车1" class="carImg">
            <p class="num">35200</p>
            <p class="orderNum">订单数量</p>
            <p class="type">供货类型—轻卡</p>
        </div>
        <div class="car2">
            <img src="../../assets/images/car2.png" alt="汽车2" class="carImg">
            <p class="num">35200</p>
            <p class="orderNum">订单数量</p>
            <p class="type">供货类型—轻客</p>
        </div>
        <div class="car3">
            <img src="../../assets/images/car3.png" alt="汽车3" class="carImg">
            <p class="num">35200</p>
            <p class="orderNum">订单数量</p>
            <p class="type">供货类型—SUV</p>
        </div>
        <div class="car4">
            <img src="../../assets/images/car4.png" alt="汽车4" class="carImg">
            <p class="num">35200</p>
            <p class="orderNum">订单数量</p>
            <p class="type">供货类型—皮卡</p>
        </div>
    </div>
    <div class="trend">
        <p class="txtTrend">产量走势</p>
        <p class="enTrend">Production Trend</p>
        <p class="txtTrend2">前30天产量走势</p>
        <div class="chart" ref="myEchart"></div>
    </div>
    <div class="progress">
      <p class="txtProgress">生产进度跟踪</p>
      <p class="enProgress">Production Progress</p>
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(page,index) in pages" :key="index">
                <ul>
                  <li class="progressItem" v-for="item in page" :key="item.id" :style="'top:'+top(item.id)+'rem'">
                    <p class="orderId">订单编号：</p><br><p class="orderId1">JD201904060547</p>
                    <p class="productId">产品编号：</p><br><p class="productId1">JMC1070P8W-B-1</p>
                    <div class="verticalLine2"></div>
                    <i class="iconfont" :class="item.iconName"></i>
                    <p :class="item.productName">{{item.prodectNum}}</p>
                    <div class="barBig"></div>
                    <div class="barSmall"></div>
                    <p class="barNum">8500</p>
                    <p class="barProgress">(50%)</p>
                    <p class="min">0</p>
                    <p class="max">17000</p>
                    <img src="../../assets/images/scale.png" alt="刻度" class="scale">
                    <p class="startTime">2019/04/05</p>
                    <p class="endTime">2019/05/05</p>
                  </li>
                </ul>
              </div>
          </div>
      </div>
      
    </div>
    <div class="verticalLine"></div>
    <div class="level"></div>
</div>
</template>
<script>
import echarts from 'echarts'
import Swiper from 'swiper'
export default {
    data(){
      return{
        progress:[
          {
            id:1,
            prodectNum:358,
            productName:'nameRed',
            iconName:'icon-xiajiang1'
          },
          {
            id:2,
            prodectNum:158,
            productName:'nameGreen',
            iconName:'icon-shangsheng1'
          },
          {
            id:3,
            prodectNum:128,
            productName:'nameRed',
            iconName:'icon-xiajiang1'
          },
          {
            id:4,
            prodectNum:0,
            productName:'nameGray',
            iconName:'icon-zuoyousuofang'
          },
          {
            id:5,
            prodectNum:158,
            productName:'nameGreen',
            iconName:'icon-shangsheng1'
          },
          {
            id:6,
            prodectNum:128,
            productName:'nameRed',
            iconName:'icon-xiajiang1'
          },
          {
            id:7,
            prodectNum:158,
            productName:'nameGreen',
            iconName:'icon-shangsheng1'
          },
          {
            id:8,
            prodectNum:158,
            productName:'nameGreen',
            iconName:'icon-shangsheng1'
          },
          {
            id:9,
            prodectNum:0,
            productName:'nameGray',
            iconName:'icon-zuoyousuofang'
          },
          {
            id:10,
            prodectNum:128,
            productName:'nameRed',
            iconName:'icon-xiajiang1'
          },
          {
            id:11,
            prodectNum:158,
            productName:'nameGreen',
            iconName:'icon-shangsheng1'
          },
          {
            id:12,
            prodectNum:128,
            productName:'nameRed',
            iconName:'icon-xiajiang1'
          },
        ]
      }
    },
    methods:{
        initChart(){
            this.chart = echarts.init(this.$refs.myEchart)
            this.chart.setOption({
                xAxis: {
                    type: 'category',
                    data: ['01', '02', '03', '04', '05', '06', '07','08','09','10',
                    '11', '12', '13', '14', '15', '16', '17','18','19','20',
                    '21', '22', '23', '24', '25', '26', '27','28','29','30'],
                    axisTick : {show: false},
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#294a88',
                            opacity: 0.2,
                            width: 2,
                            type:'solid'
                        }
                    },
                    axisLabel: {
                        fontSize:'50%',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                },
                yAxis: {
                    type: 'value',
                    min: 0,
                    max: 2000,
                    interval: 500,
                    axisTick : {show: false},
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#fff',
                            opacity:0.2
                        }
                    },
                    axisLabel: {
                        fontSize:'45%',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#294a88',
                            opacity:0.2,
                            width: 2
                        }
                    },
                    axisLine: {
                      show: true,
                      lineStyle: {
                            color: '#294a88',
                            opacity: 0.5,
                            width: 2,
                            type:'solid'
                      }
                    }
                },
                series: [{
                    data: [500, 650, 500, 600, 300, 700, 500, 700, 530, 720, 800, 1010, 1230, 1000, 800, 700, 600, 750, 600, 550, 800, 700, 780, 900, 800, 900, 1000, 1100, 1000, 1300],
                    type: 'line',
                    symbol: 'square',
                    symbolSize: 6,
                    lineStyle: {
                        normal: {
                            color: '#1C5FB2',
                            width: 2,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        normal: {
                            // borderWidth: 3,
                            // borderColor: 'yellow',
                            color: 'white'
                        }
                    }
                }],
            })
            
        },
        top(i){
          let top=0
          if((i)%6==1){
            top=0
          }
          else if((i)%6==2){
            top=1.65
          }
          else if((i)%6==3){
            top=3.3
          }
          else if((i)%6==4){
            top=4.95
          }
          else if((i)%6==5){
            top=6.6
          }
          else if((i)%6==0){
            top=8.25
          }
          return top
        },
        
    },
    mounted(){
        window.requestAnimationFrame(() => {//在下次重绘之前调用指定的回调函数更新动画，如果没有这句话，刷新时会获取不到div的宽高
          // init echats etc..
          // console.log(11)
          this.initChart()
          new Swiper ('.swiper-container', {
              autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
                },
              direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项
          }) 
          // this.pages() 
        })
        
        const that = this
        window.addEventListener("resize", function () {
            that.chart.resize()
        });
             
    },
    computed:{
      pages(){
          const pages=[]
          this.progress.forEach((item,index)=>{
            const page=Math.floor(index/6)
            if(!pages[page]){
              pages[page]=[]
            }
            pages[page].push(item)
          })
          return pages
        }
    }
}

</script>
<style scoped lang='stylus' rel='stylesheet/stylus'>
.big
  width 19.2rem
  height 10.8rem
  background url('../../assets/images/bg.png') no-repeat
  background-size 100% 100%
//   background-attachment fixed
  position relative
  .verticalLine
    width .02rem
    height 10.8rem
    background-color #fff
    opacity 0.4
    position absolute
    left 9.59rem
    top 0
  .level
    width 9.59rem
    height .01rem
    background-color #fff
    opacity 0.4
    position absolute
    left 0
    top 7.48rem
  .distribution
    width 9.59rem
    height 7.48rem
    position absolute
    top 0
    left 0
    .txtDistribution
      font-size .32rem
      color rgba(217,239,255,1)
      position absolute
      left .41rem
      top .37rem
      font-family 'PingFang-SC-Bold'
      font-weight bold
    .enDistribution
      font-size .2rem
      color rgba(217,239,255,1)
      position absolute
      left 1.81rem
      top .49rem
      font-family 'PingFang-SC-Medium'
      font-weight 500
    .car1
      width 4.27rem
      height 2.95rem
      position absolute
      left .4rem
      top .97rem
      background rgba(5,53,153,0.18)
      .carImg
        position absolute
        left .08rem
        top .96rem
      .num
        font-size .31rem
        color #fff
        font-weight 500
        position absolute
        left 2.36rem
        top .28rem
        font-family 'PingFang-SC-Medium'
      .orderNum
        font-size .15rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 3.3rem
        top .39rem
        font-family 'PingFang-SC-Medium'
      .type
        font-size .22rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 2.36rem
        top .64rem
        font-family 'PingFang-SC-Medium'
    .car2
      width 4.27rem
      height 2.95rem
      position absolute
      left 4.88rem
      top .97rem
      background rgba(5,53,153,0.18)
      .carImg
        position absolute
        left .08rem
        top .96rem
      .num
        font-size .31rem
        color #fff
        font-weight 500
        position absolute
        left 2.36rem
        top .28rem
        font-family 'PingFang-SC-Medium'
      .orderNum
        font-size .15rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 3.3rem
        top .39rem
        font-family 'PingFang-SC-Medium'
      .type
        font-size .22rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 2.36rem
        top .64rem
        font-family 'PingFang-SC-Medium'
    .car3
      width 4.27rem
      height 2.95rem
      position absolute
      left .4rem
      top 4.14rem
      background rgba(5,53,153,0.18)
      .carImg
        position absolute
        left .08rem
        top .96rem
      .num
        font-size .31rem
        color #fff
        font-weight 500
        position absolute
        left 2.36rem
        top .28rem
        font-family 'PingFang-SC-Medium'
      .orderNum
        font-size .15rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 3.3rem
        top .39rem
        font-family 'PingFang-SC-Medium'
      .type
        font-size .22rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 2.36rem
        top .64rem
        font-family 'PingFang-SC-Medium'
    .car4
      width 4.27rem
      height 2.95rem
      position absolute
      left 4.88rem
      top 4.14rem
      background rgba(5,53,153,0.18)
      .carImg
        position absolute
        left .08rem
        top .96rem
      .num
        font-size .31rem
        color #fff
        font-weight 500
        position absolute
        left 2.36rem
        top .28rem
        font-family 'PingFang-SC-Medium'
      .orderNum
        font-size .15rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 3.3rem
        top .39rem
        font-family 'PingFang-SC-Medium'
      .type
        font-size .22rem
        color rgba(198,213,253,1)
        font-weight 500
        position absolute
        left 2.36rem
        top .64rem
        font-family 'PingFang-SC-Medium'
  .trend
    width 9.59rem
    height 3.31rem
    position absolute
    top 7.48rem
    left 0
    .txtTrend
      font-size .32rem
      color rgba(217,239,255,1)
      position absolute
      left .43rem
      top .32rem
      font-family 'PingFang-SC-Bold'
      font-weight bold
    .txtTrend2
      font-size .2rem
      color rgba(217,239,255,1)
      position absolute
      left 7.63rem
      top .44rem
    .enTrend
      font-size .2rem
      color rgba(217,239,255,1)
      position absolute
      left 1.88rem
      top .46rem
      font-family 'PingFang-SC-Medium'
      font-weight 500
    .chart
      width 9.3rem
      height 2.4rem
      position absolute
      left .2rem
      top .7rem
  .progress
    width 9.6rem
    height 10.8rem
    position absolute
    left 9.59rem
    .txtProgress
      position absolute
      left .41rem
      top .37rem
      font-family 'PingFang-SC-Bold'
      font-weight bold
      font-size .32rem
      color rgba(217,239,255,1)
    .enProgress
      position absolute
      left 2.49rem
      top .5rem
      font-family 'PingFang-SC-Medium'
      font-weight 500
      font-size .2rem
      color rgba(217,239,255,1)
    .swiper-container
      position absolute
      left 0
      top .96rem
      width 9rem
      height 9.55rem
      .swiper-wrapper
        width 9rem
        height 9.55rem
        .swiper-slide
          width 9rem
          height 9.55rem
          .progressItem
            position absolute
            left .48rem
            top .96rem
            width 8.64rem
            height 1.34rem
            background rgba(5,53,153,.18)
            .orderId
              position absolute
              left .27rem
              top .15rem
              font-family 'PingFang-SC-Regular'
              font-weight 100
              font-size .16rem
              color rgba(198,213,253,1)
              line-height .24rem
            .orderId1
              position absolute
              left .27rem
              bottom .7rem
              font-family 'PingFang-SC-Medium'
              font-weight 100
              font-size .16rem
              color #fff
              line-height .24rem
            .productId
              position absolute
              left .27rem
              top .68rem
              font-family 'PingFang-SC-Regular'
              font-weight 100
              font-size .16rem
              color rgba(198,213,253,1)
              line-height .24rem
            .productId1
              position absolute
              left .27rem
              bottom .18rem
              font-family 'PingFang-SC-Medium'
              font-weight 100
              font-size .16rem
              color #fff
              line-height .24rem
            .verticalLine2
              width .01rem
              height .92rem
              background-color #fff
              opacity .29rem
              position absolute
              left 2.3rem
              top .22rem
            .icon-xiajiang1
              font-size .29rem
              color red
              position absolute
              left 2.67rem
              top .49rem
            .icon-shangsheng1
              font-size .29rem
              color #80C635
              position absolute
              left 2.67rem
              top .49rem
            .icon-zuoyousuofang
              width .15rem
              font-size .37rem
              color #63BBC9
              position absolute
              left 2.67rem
              top .49rem
            .nameRed
              position absolute
              left 2.93rem
              top .53rem
              font-weight 400
              font-size .28rem
              color rgba(255,0,54,1)
            .nameGreen
              position absolute
              left 2.93rem
              top .53rem
              font-weight 400
              font-size .28rem
              color rgba(26,250,41,1)
            .nameGray
              position absolute
              left 3.21rem
              top .53rem
              font-weight 400
              font-size .28rem
              color rgba(99,187,201,1)
            .barBig
              width 4.2rem
              height .27rem
              background rgba(226,231,238,.2)
              position absolute
              left 3.82rem
              top .44rem
            .barSmall
              width 2.2rem
              height .27rem
              background linear-gradient(0deg,rgba(25,145,235,1) 0%,rgba(46,161,248,1) 100%)
              border-radius .04rem 0 0 .04rem
              position absolute
              left 3.82rem
              top .44rem
            .barNum
              font-size .19rem
              color #fff
              font-weight 400
              position absolute
              left 5.54rem
              top .47rem
            .barProgress
              font-size .14rem
              color #fff
              font-weight 400
              position absolute
              left 6rem
              top .52rem
            .min
              font-size .18rem
              color rgba(198,213,253,1)
              font-weight 400
              position absolute
              left 3.83rem
              top .21rem
            .max
              font-size .18rem
              color rgba(198,213,253,1)
              font-weight 400
              position absolute
              left 7.54rem
              top .21rem
            .scale
              position absolute
              left 3.82rem
              bottom .43rem
              width 4.18rem
              height .1rem
            .startTime
              font-size 16px
              font-weight 500
              color rgba(124,140,165,1)
              position absolute
              left 3.39rem
              top 1.03rem
            .endTime
              font-size 16px
              font-weight 500
              color rgba(124,140,165,1)
              position absolute
              left 7.52rem
              top 1.03rem
</style>