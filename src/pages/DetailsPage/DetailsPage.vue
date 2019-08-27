<template>
<div class="big">
    <div class="distribution">
        <p class="txtDistribution">订单分布</p>
        <p class="enDistribution">Order Distribution</p>
        <div class="order">
          <div class="swiper-container swiper-containerF">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(page, index) in orderPages" :key="index">
                <div class="car" v-for="(item,index) in page" :key="index">
                    <img :src="'data:image/png;base64,'+item.图片" alt="汽车" class="carImg" v-if="item.图片">
                    <p class="num">{{item.数量}}</p>
                    <p class="orderNum">订单数量</p>
                    <p class="type">供货类型—{{item.系列名称}}</p>
                </div>
              </div>
            </div>
          </div>
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
      <div class="swiper-container swiper-containerG">
          <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(page,index) in pages" :key="index">
                <ul>
                  <li class="progressItem" v-for="(item,key) in page" :key="key" >
                    <p class="orderId">订单编号：</p><br><p class="orderId1">{{item.订单编号}}</p>
                    <p class="productId">产品编号：</p><br><p class="productId1">{{item.产品编号}}</p>
                    <div class="verticalLine2"></div>
                    <!-- <i class="iconfont" :class="item.iconName"></i> -->
                    <p :class="color(item.差异数)">{{Math.abs(item.差异数)}}</p>
                    <div class="barBig">
                      <div class="barSmall" :style="'width:'+(item.完成率*1).toFixed(1)*4.2+'rem'"></div>
                      <p class="min">0</p>
                      <p class="max">{{item.计划数}}</p>
                      <p class="barNum">{{item.完工数}}({{(item.完成率*100).toFixed(1)}}%)</p>
                      <p class="startTime">{{item.计划开始时间|time}}</p>
                      <p class="endTime">{{item.计划结束时间|time}}</p>
                    </div>
                    <!-- <p class="barProgress"></p> -->
                    <img src="../../assets/images/scale.png" alt="刻度" class="scale">
                    <img src="../../assets/images/up.png" alt="上升" class="nameGreen"  v-if="item.差异数>0">
                    <img src="../../assets/images/down.png" alt="下降" class="nameRed"  v-if="item.差异数<0">
                    <img src="../../assets/images/flat.png" alt="持平" class="nameGray"  v-if="item.差异数==0">
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
import { constants } from 'fs';
export default {
    data(){
      return{
        progress:[],
        chart:[],
        orderDistribution:[],
        swiperG:'',
        swiperF:'',
        Max:0
      }
    },
    methods:{
        color(data){
          if(data>0){
            return 'shangsheng'
          }else if(data<0){
            return 'xiajiang'
          }else{
            return 'zuoyousuofang'
          }
        },
        getOrderDistribution(url1,url2,url3){
            this.$axios.post(url1).then(res => {//获取订单完工情况（用于生产看板-生产进度跟踪）
              // console.log(res)
              // this.progress=[]
              this.$message.closeAll()
              this.progress=res.data
              this.$nextTick(() => {//滚动效果
                if(this.swiperG) {
                  this.swiperG.update(false)
                  this.$forceUpdate()
                }else if(this.pages.length>=2){
                  var myswiper = new Swiper('.swiper-containerG',{
                    loop: false,
                    autoplay: {
                      delay: 15000,
                      reverseDirection: false,
                      disableOnInteraction:false
                    },
                    // direction: 'vertical',
                    observer:true,
                    observeParents:true
                  })
                  this.swiperG = myswiper
                  this.$forceUpdate()
                }
                
              })
              // mySwiper.update()
            }).catch((error) => {
                    // console.log(error.message)
                    if(error.message && error.message == 'Network Error') {
                        this.$message.error('请求已超时')             
                    }else if (error.response && error.response.data == '网络已断开' && error.response.status == 502) {
                        this.$message({
                            message: '服务已断开',
                            type: 'error',
                            duration: 0
                        })      
                    }
                })
          
          this.$axios.post(url2).then(res2=>{//取最近30天每天的完工数量合计（用于生产看板-产量走势）
            this.$message.closeAll()
            console.log('30天',res2)
            var data=[]
            var dateTime=[]
            var result=JSON.parse(res2.data)
            result.forEach((item,index)=>{
            data.push(item.数量)
            var time=item.日期.slice(8,10)
            dateTime.push(time)
            })
            var max = data.reduce(function(a,b) {
                return b>a?b:a
            })
            this.Max = max % 5 == 0?max:max+(5 - max % 5)
            console.log('产量走势',data)
            console.log('日期',dateTime)
            this.initChart(data,dateTime,this.Max)
            // console.log(JSON.parse(res2.data))
          })
          this.$axios({
            method: 'post',
            url: url3,
            headers: {
              'Accept-Encoding': 'gzip'
            }
          }).then(res3=>{//获取订单最近30天的计划数量合计，按车型系列统计（用于生产看板-订单分布）
            this.$message.closeAll()
            console.log('订单分布',res3)
            this.orderDistribution=res3.data
            console.log(res3.data)
            if(this.swiperF && this.orderPages.length<2) {
              this.swiperF.destroy()
              this.$forceUpdate()
              this.swiperF = ''
              this.$forceUpdate()
            }
            if(this.orderPages.length>1){
              this.$nextTick(() => {//滚动效果
              if(this.swiperF) {
              // this.swiperF.init()
              // this.$forceUpdate()
	              // this.swiperF.update(true)
                // this.swiperF.autoplay.start()//重新开始轮播
              }else{
              var myswiper = new Swiper('.swiper-containerF',{
                loop: false,
                autoplay: {
                  delay: 15000,
                  reverseDirection: false,
                  disableOnInteraction:false
                },
                // direction: 'vertical',
                observer:true,
                observeParents:true,
                observeSlideChildren:true,
                on:{
                  slideChangeTransitionEnd: function(){ 
                  this.update(true);
                  this.autoplay.start();
                  }
                }
              })
              this.swiperF = myswiper
              this.$forceUpdate()
              }
              })
              // mySwiper.update()
            }
          })
          
        },
        initChart(data,dateTime,Max){
            this.chart = echarts.init(this.$refs.myEchart)
            this.chart.setOption({
                grid:[{
                  x:'5%',
                  y:'25%',
                  x2:'2%',
                  y2:'25%'
                }],
                xAxis: {
                    type: 'category',
                    data: dateTime,
                    axisTick : {show: false},
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#fff',
                            opacity: 0.4,
                            width: 1,
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
                    max: Max,
                    interval: parseInt(Max/5),
                    axisTick : {show: false},
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#fff',
                                opacity:0.4
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
                                color: '#fff',
                                opacity:0.4
                            }
                        },
                    // nameGap: 30,
                },
                series: [{
                    data:data,
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
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: ['#ccc'],
                            width: 1,
                            opacity:0.01,
                            type: 'solid'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'white'
                        }
                    }
                }],
            })
            
        },
    },
    // updated(){

    // },
    activated(){
      localStorage.setItem('NowPage',this.$route.path)
      const that = this
      window.addEventListener('offline',  function() {
          that.$message({
              message: '与服务器连接中断，正在尝试重连中...',
              type: 'error',
              duration: 0
          })      
      })
      window.addEventListener('online',  function() {
          that.$message.closeAll()      
      })
      this.getOrderDistribution('/JLDPWebApi/Api/Mcorder/GetProductionProgress','/JLDPWebApi/Api/Mcbarcode/GetProductionTrend','/JLDPWebApi/Api/Mcorder/GetOrderDistribution')
      var timer1 = window.setInterval(()=>{
        that.getOrderDistribution('/JLDPWebApi/Api/Mcorder/GetProductionProgress','/JLDPWebApi/Api/Mcbarcode/GetProductionTrend','/JLDPWebApi/Api/Mcorder/GetOrderDistribution')
      }, 60000);
      // this.$nextTick(()=>{
      // })
      window.requestAnimationFrame(() => {//在下次重绘之前调用指定的回调函数更新动画，如果没有这句话，刷新时会获取不到div的宽高
        this.initChart()
      })
      
      window.addEventListener("resize", function () {
          that.chart.resize()
      });
    },
    computed:{
      pages(){
          const pages=[]
          this.progress.forEach((item,index)=>{
            // console.log(this.progress)
            const page=Math.floor(index/6)
            item.差异数==null?item.差异数=0:item.差异数=item.差异数
            item.完工数==null?item.完工数=0:item.完工数=item.完工数
            item.完工率==null?item.完工率=0:item.完工率=item.完工率
            item.完工数>=item.计划数?item.完成率=100:item.完成率=item.完成率
            console.log(item.完成率)
            if(!pages[page]){
              pages[page]=[]
            }
            pages[page].push(item)
          })
          return pages
        },
        orderPages(){
          const pages=[]
          this.orderDistribution.forEach((item,index)=>{
            const page=Math.floor(index/4)//4个一页
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
    height .02rem
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
      font-size .34rem
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
    .order
      width 9.2rem
      height 6.85rem
      // margin-top .12rem
      // padding-left .19rem
      // padding-right .4rem
      // padding-top .63rem
      // padding-bottom .39rem
      overflow hidden
      position absolute
      left .19rem
      top .75rem
      .swiper-containerF
        width 9.15rem
        height 6.8rem
        // margin-top .12rem
        .swiper-wrapper
          width 9.15rem
          height 6.8rem
          .swiper-slide
            width 9.15rem
            height 6.8rem
            .car
              display inline-block
              float left
              position relative
              width 4.27rem
              height 2.95rem
              margin-left .21rem
              margin-top .22rem
              background rgba(5,53,153,0.18)
              .carImg
                position absolute
                left .08rem
                top .96rem
                width 3.44rem
                height 1.92rem
              .num
                font-size .33rem
                color #fff
                font-weight 500
                position absolute
                right .97rem
                top .28rem
                font-family 'PingFang-SC-Medium'
              .orderNum
                font-size .17rem
                color rgba(198,213,253,1)
                font-weight 500
                position absolute
                left 3.3rem
                top .39rem
                font-family 'PingFang-SC-Medium'
              .type
                font-size .24rem
                color rgba(198,213,253,1)
                font-weight 500
                position absolute
                right .32rem
                top .64rem
                font-family 'PingFang-SC-Medium'
  .trend
    width 9.59rem
    height 3.31rem
    position absolute
    top 7.48rem
    left 0
    .txtTrend
      font-size .34rem
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
      height 3rem
      position absolute
      left .2rem
      top .3rem
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
      font-size .34rem
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
      left .48rem
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
            position relative
            // left .48rem
            top 0
            width 8.64rem
            height 1.34rem
            background rgba(5,53,153,.18)
            margin-bottom .3rem
            .orderId
              position absolute
              left .27rem
              top .15rem
              font-family 'PingFang-SC-Regular'
              font-weight 100
              font-size .18rem
              color rgba(198,213,253,1)
              line-height .24rem
            .orderId1
              position absolute
              left .27rem
              bottom .7rem
              font-family 'PingFang-SC-Medium'
              font-weight 100
              font-size .18rem
              color #fff
              line-height .24rem
            .productId
              position absolute
              left .27rem
              top .68rem
              font-family 'PingFang-SC-Regular'
              font-weight 100
              font-size .18rem
              color rgba(198,213,253,1)
              line-height .24rem
            .productId1
              position absolute
              left .27rem
              bottom .18rem
              font-family 'PingFang-SC-Medium'
              font-weight 100
              font-size .18rem
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
            .xiajiang
              font-size .29rem
              width .15rem
              height .29rem
              font-weight 400
              color red
              position absolute
              left 3rem
              top .49rem
            .shangsheng
              font-size .29rem
              width .15rem
              height .29rem
              color #80C635
              position absolute
              font-weight 400
              left 3rem
              top .49rem
            .zuoyousuofang
              width .37rem
              height .15rem
              font-weight 400
              font-size .37rem
              color #63BBC9
              position absolute
              left 3.1rem
              top .45rem
            .nameRed
              position absolute
              left 2.67rem
              top .52rem
              width .15rem
              height .29rem
            .nameGreen
              position absolute
              left 2.67rem
              top .52rem
              width .15rem
              height .29rem
            .nameGray
              position absolute
              left 2.6rem
              top .56rem
              width .37rem
              height .15rem
            .barBig
              width 4.2rem
              height .27rem
              background rgba(226,231,238,.2)
              text-align center
              position relative
              left 3.82rem
              top -.1rem
              .barSmall
                width 2.2rem
                height .27rem
                background linear-gradient(0deg,rgba(25,145,235,1) 0%,rgba(46,161,248,1) 100%)
                border-radius .04rem 0 0 .04rem
                position absolute
                left 0
                top 0
              .barNum
                font-size .19rem
                color #fff
                font-weight 400
                line-height 0.27rem
                position relative
                margin-left auto
                margin-right auto
              .min
                font-size .2rem
                color rgba(198,213,253,1)
                font-weight 400
                position absolute
                left 0
                top -.18rem
              .max
                font-size .2rem
                color rgba(198,213,253,1)
                font-weight 400
                position absolute
                right 0
                top -.18rem
              .startTime
                font-size 16px
                font-weight 500
                color rgba(124,140,165,1)
                position absolute
                left 0
                top .6rem
              .endTime
                font-size 16px
                font-weight 500
                color rgba(124,140,165,1)
                position absolute
                right 0
                top .6rem
            .scale
              position absolute
              left 3.82rem
              bottom .43rem
              width 4.18rem
              height .1rem
</style>