<template>
<div class="big">
    <div class="left">
      <!-- 左边背景图 -->
      <img :src="'data:image/png;base64,'+picBase64" alt="左边看板区" class="left_bg">
      <!-- 闪烁图标 -->
      <!-- <div class="blink"> -->
      <div :class="`swiper-container${index}`"  v-for="(swiper1, index) in getSwiper" :key="index" :style="`position:absolute;left:${14.19*(swiper1[0].X坐标)/bgWidth}rem;top:${10.12*(swiper1[0].Y坐标)/bgHeight}rem;width:${swiper1[0].控件宽/100*3}rem;height:${swiper1[0].控件高/100*3}rem`" class="swiper-container" >
      <!-- 位置变了 -->
        <div class="swiper-wrapper" :style="`width:${swiper1[0].控件宽/100*3}rem;height:${swiper1[0].控件高/100*3}rem`">
          <div class="swiper-slide"  v-for="(item) in swiper1" :key="item.GUID" :style="`width:${item.控件宽/100*3}rem;height:${item.控件高/100*3}rem`">
            <img :src="'data:image/png;base64,'+item.Andon看板闪烁图片" alt="闪烁" :class="{'iconPosition':isA}" :style="`width:${item.控件宽/100*3}rem;height:${item.控件高/100*3}rem`" class="icon">
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <div class="right">
      <div class="logoDiv">
        <!-- 最上面的logo -->
        <img src="../../assets/images/logo.png" alt="商标" class="logo">
      </div>
      <!-- 右边轮播 -->
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(page, index) in andonpages" :key="index">
            <!-- 一个安灯类别框 -->
            <div class="technology" v-for="(item,i) in page" :key="i">
              <img :src="'data:image/png;base64,'+item.Andon看板标识图片" alt="工艺" class="icon_g">
              <p class="tecText">{{item.Andon类别名称}}</p>
              <p class="tecEnglish">{{item.Andon类别英文名称}}</p>
              <p class="tecNum">{{item.数量}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 音乐 -->
      <div>
        <audio id="myAudio" preload="auto">
          <source src="../../assets/music/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
        </audio>
      </div>
    </div>
</div>
</template>
<script>

// import { setInterval } from 'timers';
// import { constants } from 'fs';
// import qs from 'qs'
import { resolve } from 'url';
import {Base64} from 'js-base64';
// import md5 from 'js-md5';
import Swiper from 'swiper'
import { setInterval, setTimeout, clearInterval } from 'timers';
import { constants } from 'fs';
export default {
  data(){
    return{
      AndonType: [
        {
            GUID:0,//安灯类别Guid
            HashCodeB:0,//获取Andon看板标识图片哈希码
            HashCodeC:0//获取Andon看板闪烁图片哈希码
        }
      ],
      HashCode:0,//获取Andon监控点背景图哈希值
      typeGuid:'',//获取Andon类别Guid
      HashCodeB:0,//获取Andon看板标识图片哈希码
      HashCodeC:0,//获取Andon看板闪烁图片哈希码
      picBase64:'',//获取图片base64编码
      andonBigList: [],//处理后右边安灯大数组
      leftAndonList:[],//左侧闪烁安灯详细列表
      swiperA:'',
      swiper2:'',
      isA:true,
      timer:'',
      TypeInformation: [],
      bgWidth:0,//背景实际宽
      bgHeight:0,//背景实际高
      getSwiper:[],//获取闪烁图表轮播
      myswiper:[],
      //原TypeInformation
      //测试
      ceshinub:1,
      oldTypeInformation:[],
      //原CountGroupbyType
      oldCountGroupbyType:[]
      // count: 0,
      // msg: ""
    }
  },
  
  activated() {
    localStorage.setItem('NowPage',this.$route.path)        
        const that=this    
        // console.log(this.leftAndonList)
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
       
    this.getAndonMonitoryPointBackgroundImage()//获取Andon监控点背景图(用于Andon看板)
    this.getAndonTypeInformation(this.AndonType)//处理后右边安灯大数组
    setInterval(() => {
      clearInterval(this.timer)
      this.AndonType = [];
      this.getSwiper=[]
      // this.count++;
      // if(this.count % 2 == 0)
      //   this.msg = "1"
      //   else this.msg = ""
      this.TypeInformation.forEach((item, index) => {
          this.AndonType.push({GUID:item.Andon类别Guid, AndonTypeName:item.Andon类别名称, AndonTypeEName:item.Andon类别英文名称, HashCodeB:item.Andon看板标识图片哈希码, HashCodeC:item.Andon看板闪烁图片哈希码})
      })
      this.getAndonMonitoryPointBackgroundImage()//获取Andon监控点背景图(用于Andon看板)
      this.getAndonTypeInformation(this.AndonType)//处理后右边安灯大数组
    }, 60000)
    // //console.log(this.leftAndonList)
    // img[0].onload = function()
    // {
        // var width = this.naturalWidth;
        // this.$nextTick(()=>{
          // //console.log(img[0].naturalWidth)
        // })
        
    // }
  },
  watch:{
      'oldCountGroupbyType':{
        handler(newValue, oldValue) {
          var andonchange = 0
          var guidchange=0
          if(newValue.length!=0){
            newValue.forEach((item,index)=>{
              
              oldValue.forEach((it,ind)=>{
                if(item.GUID==it.GUID){
                  guidchange++
                  if (it.数量< item.数量) {
                      andonchange++
                      console.log('andonchange',andonchange)
                  }
                }
              })
            })
            if(guidchange!=newValue.length){
              andonchange++
            }
          }
          if(andonchange!= 0) {
            this.ceshinub++
            let audio = document.getElementById('myAudio')
            audio.load()//重新加载，从头播放
            audio.play()//开始播放
          }
        },
        deep: true
      },
       'ceshinub': function(newValue,oldValue) {
        this.$emit('getAndonData',newValue)
      }
    },
  computed: {
    //计算右侧安灯轮播页大数组
    andonpages(){
      const pages=[]
      this.andonBigList.forEach((item,index)=>{
        const page=Math.floor(index/5)//5个一页
        if(!pages[page]){
          pages[page]=[]
        }
        pages[page].push(item)
      })
      return pages
    }
  },
  methods:{
    getAndonMonitoryPointBackgroundImage(){//获取Andon监控点背景图(用于Andon看板)
      this.$axios.post('/JLDPWebApi/Api/Andon/GetAndonMonitoryPointBackgroundImage',{
        MonitoryPointGuid: this.$route.params.watchPoint,//监控点Guid
        HashCode:this.HashCode//将data中的哈希赋值给HashCode参数
      }).then(res => {
        this.$message.closeAll()
        // // //console.log(res)
        if(res.data!=0){//如果上一次返回0，即图片没有变化，或第一次申请，就将新获取到的哈希值赋值给this，防止出现背景图片时有时无的现象
          var data=JSON.parse(res.data)
          // // //console.log('背景图片',data)
          this.HashCode=data.HashCode//获取哈希值并赋值给data中的HashCode
          this.picBase64=data.PicBase64//获取图片base64编码
        }
        // // //console.log('背景',res)
      }).catch((error) => {
                    // // console.log(error.message)
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
    },
    getAndonTypeInformation(data){//获取Andon类别信息（包含Andon看板标识图片，Andon看板闪烁图片，Andon类别基本信息）(用于Andon看板)
      // var _this = this;
      // this.$axios.post('http://192.168.100.15/JLDPWebApi/Api/Andon/GetAndonCountGroupbyType',{
      //   MonitoryPointGuid: '1edcdbda-359e-475d-b4c6-fadf4ea7b255'//监控点Guid
      // }).then(res=>{
      //   // //console.log(111,res)
      // })
      // // //console.log("data:", data);
      this.$axios.post('/JLDPWebApi/Api/AdType/GetAndonTypeInformation',{
        MonitoryPointGuid: this.$route.params.watchPoint,//监控点Guid
        Data:data
      }).then(resTypeInformation => {
        this.$message.closeAll()
        // // //console.log('是否有新数据',resTypeInformation)
        if(JSON.parse(resTypeInformation.data)[0].Result != 0){
          // // //console.log('获取Andon类别信息',JSON.parse(JSON.parse(resTypeInformation.data)[0].Data))
          //获取的安灯类别信息
          this.TypeInformation = JSON.parse(JSON.parse(resTypeInformation.data)[0].Data)
          this.oldTypeInformation = JSON.parse(JSON.parse(resTypeInformation.data)[0].Data)
          // // //console.log('获取Andon类别信息11111', this.TypeInformation)

          // // //console.log(JSON.parse(resTypeInformation.data)[0])
        }
        
        //如果上一次返回0，即图片没有变化，或第一次申请，就将新获取到的哈希值赋值给this，防止出现图片时有时无的现象

        // this.HashCodeC=this.TypeInformation.HashCodeC//获取哈希值并赋值给TypeInformation中的HashCodeC
        // this.typeGuid=this.TypeInformation.GUID//获取哈希值并赋值给TypeInformation中的GUID
        // this.HashCodeB=this.TypeInformation.HashCodeB//获取哈希值并赋值给TypeInformation中的HashCodeB
        //获取根据Andon类别分类统计Andon数量(用于Andon看板)
        this.$axios.post('/JLDPWebApi/Api/Andon/GetAndonCountGroupbyType',{
          MonitoryPointGuid: this.$route.params.watchPoint//监控点Guid
        }).then(resCountGroupbyType=>{
          // // //console.log('获取安灯数量',resCountGroupbyType)
          //获取的安灯数量
          this.oldCountGroupbyType = resCountGroupbyType.data
          // console.log('oldCountGroupbyType',this.oldCountGroupbyType)
          var CountGroupbyType = resCountGroupbyType.data
          this.TypeInformation.forEach((item, index) => {
            var a = 0
            if(CountGroupbyType.length==0){
              this.TypeInformation[index].数量=0
            }else{
              CountGroupbyType.forEach((em, i) => {
                if(item.Andon类别Guid == em.GUID) {
                  this.TypeInformation[index].数量 = CountGroupbyType[i].数量//当Guid相等时，将CountGroupbyType的数量赋值给TypeInformation
                }else{
                  a++//当不相等时就标记a=a+1
                }
                if(a == CountGroupbyType.length) {//当遍历完所有数组，仍然没有找到相等的，则可以判定这个安灯类别没有出现，将数量设为0
                  this.TypeInformation[index].数量 = 0
                }
              })
            }
          })
          this.oldTypeInformation=JSON.stringify(this.TypeInformation)
          this.andonBigList = this.TypeInformation
          // //console.log(this.andonBigList)
          // //console.log('andonBigList',this.andonBigList)
          this.$forceUpdate()
          this.$nextTick(() => {//滚动效果
            if(this.swiperA) {
              if(this.andonpages.length>=2){
                 this.swiperA.update(false)
              }else {
                 this.swiperA.destroy()
                 this.$forceUpdate()
                 this.swiperA = ''
              }
            }else if(this.andonpages.length>=2){
              var myswiper = new Swiper('.swiper-container',{
                  loop: false,
                  autoplay: {
                    delay: 15000,
                    reverseDirection: false,
                    disableOnInteraction:false
                  },
                  // direction: 'vertical',
                  observer:true,
                  observeParents:true,
                  onSlideChangeEnd: function(swiper){ 
              　　　swiper.update();  
              　　　myswiper.startAutoplay();
              　　  myswiper.reLoop();
                  }
                })
              this.swiperA = myswiper
            }
          })
          
        })
        //得到Andon列表(用于Andon看板)
        this.$axios.post('/JLDPWebApi/Api/Andon/GetAndon',{
          MonitoryPointGuid: this.$route.params.watchPoint//监控点Guid
        }).then(resAndon=>{ 
          // // //console.log('resandon',resAndon)
          // // //console.log('获取Andon列表:',resAndon.data)
          var andon = resAndon.data
          this.$axios.post('/JLDPWebApi/Api/Andon/GetAndonMonitoryPointLocation',{
            MonitoryPointGuid: this.$route.params.watchPoint//监控点Guid
          }).then(resPointLocation => {
            var PointLocation = JSON.parse(resPointLocation.data)
            // //console.log('resPointLocation',JSON.parse(resPointLocation.data))
            this.bgWidth=PointLocation.Width
            this.bgHeight=PointLocation.Height
            // //console.log(this.bgWidth,this.bgHeight)
            // // //console.log(data)
            // //console.log('获取监控点分布图',PointLocation)
            //安灯列表遍历
            andon.forEach((item, index) => {
              //安灯类别信息遍历
              this.TypeInformation.forEach((it, de) => {
                if(item.Andon类别GUID == it.Andon类别Guid) {
                  item.Andon看板闪烁图片 = it.Andon看板闪烁图片
                  // item.工位GUID = it.工位GUID
                }
              })
              //监控点分布遍历
              PointLocation.Data.forEach((te, nd) => {
                if(item.工位GUID == te.工位GUID) {
                  item.X坐标 = te.X坐标
                  item.Y坐标 = te.Y坐标
                  item.控件宽 = te.控件宽
                  item.控件高 = te.控件高
                }
              })
            })
            // // //console.log('typeinformation',this.TypeInformation)
            this.leftAndonList = andon
            // //console.log('左侧安灯列表',this.leftAndonList)
            var j=-1//总共有几个小数组
            var arr=[]//大数组
            var [ ...arr2 ] = andon
            andon.forEach((item,index)=>{
              if(arr2.length != 0) {
                j++
                arr[j]=[]
                var q = []
                arr2.forEach((it,ind)=>{
                  if(item.工位GUID==it.工位GUID){
                    arr[j].push(it)
                    // arr2.splice(ind,1)
                    q.push(ind)
                  }
                })
                if(q.length != 0) {
                  for(var nd=q.length-1;nd>=0;nd--) {
                    arr2.splice(q[nd],1)
                  }
                } 
              }
            })
            for(var i=arr.length-1;i>=0;i--){
              if(arr[i].length==0){
                arr.splice(i,1)
              }
            }
            // //console.log('arr',arr)
            // //console.log('arr的长度',arr[0])
            this.getSwiper=arr
            //console.log('初始',this.getSwiper)
            // clearInterval(timer)
            // //console.log('timer',timer)
            this.timer = setInterval(() =>{
              this.getSwiper.forEach((item, index) => {
                // item.forEach(() => {
                  // var andengfirst = item.shift()
                  item.push(item.shift())
                // })
              })
              //console.log('30后',this.getSwiper)
            }, 3000)
            //console.log('左侧灯',this.getSwiper)
            var that=this
            // arr.forEach((item,index)=>{
            //   // this.getSwiper=arr
            //   // if(this.swiper2) {
            //   //   this.swiper2.update(false)
            //   // }else {
            //     this.$nextTick(() => {
            //         if(that.myswiper[index]){//这里改过
            //           // //console.log(22)
            //           that.myswiper[index].autoplay.stop()//这两句是为了防止多个定时器出现轮播混乱的问题
            //           that.myswiper[index].autoplay.start()
            //         }else{
            //           // //console.log(11)
            //           var mySwiper=new Swiper('.swiper-container'+index,{
            //             loop: true,//防止出现重复页面，因为如果为true，swiper会将收尾复制一份，如果轮播速度出错，就会有重复页，如果是滑动就会一下子滑到第一面，但因为是fade就看不出来
            //             // virtual:true,
            //             // speed:800,
            //             setWrapperSize :true,//兼容对flexbox兼容性不好的浏览器
            //             // slidesPerView: "auto",
            //             autoplay: {
            //               delay: 2700,//这里改过
            //               reverseDirection: false,//是否允许反向滑动
            //               disableOnInteraction:false//当用户手动滑动轮播时，是否允许重新开始轮播，false为允许
            //             },
            //             // on:{
            //             //   slideChangeTransitionStart: function(){
            //             //     that.isA=false
            //             //     //console.log('end')
            //             //     // that.isA=true
            //             //     // //console.log('start')
            //             //   },
            //             //   slideChangeTransitionEnd: function(){
            //             //     // //console.log('end')
            //             //     // that.isA=false
            //             //     //console.log('start')
            //             //     that.isA=true
            //             //   },
                          
            //             // },
            //             // direction: 'vertical',
            //             observer:true,//这两句与更新有关
            //             observeParents:true,
            //             effect:'fade',//淡入
            //             fadeEffect:{
            //               crossFade:true
            //             }
            //           })
            //           that.myswiper[index]=mySwiper
            //         }
            //   // // //console.log('轮播速度',a)
            //     })
                
            //   //   this.swiper2 = myswiper2
            //   // }
            // })
            // //console.log('myswiper',this.myswiper)
            // //console.log('闪烁图标轮播',this.getSwiper)
          })
        })
      })
    },  
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
    .swiper-container
      .swiper-wrapper
        .swiper-slide
          .icon
            // opacity 0
          .iconPosition
            @keyframes mymove{
              from { opacity: 0; } /* 动画开始时的不透明度 */
              30%  { opacity: 1; } /* 动画30% 时的不透明度 */
              50%  { opacity: 1; }
              70%  { opacity: 1; }
              to   { opacity: 0; }
            }
            animation mymove ease 3s infinite
            // animation-delay 0.1s
            // display block
  .right
    width 4.65rem
    height 100%
    float right
    .logoDiv
      width 2.48rem
      height .95rem
      position absolute
      left 15.61rem
      top .41rem
      .logo
        width 2.48rem
        height .95rem
    .swiper-container
      width 100%
      // float right
      margin-top 1.4rem
      height 9.2rem
      .swiper-wrapper
        width 100%
        height 9.2rem
        .swiper-slide
          width 100%
          height 9.2rem
          .technology
            width 3.79rem
            height 1.37rem
            margin-top .44rem
            margin-left .45rem
            background url('../../assets/images/bgSmall.png')
            background-size contain
            background-size 3.79rem 1.37rem
            position relative
            .icon_g
              width .7rem
              height .86rem
              // float left
              // margin-top .27rem
              // margin-left .14rem
              position absolute
              left .14rem
              top .27rem
            .tecText
              font-size .41rem
              font-family 'PingFang-SC-Medium'
              font-weight 500
              // width .85rem
              // float left
              // margin-top .48rem
              // margin-left .08rem
              position absolute
              left .92rem
              top .48rem
              color #fff
            .tecEnglish
              font-size .21rem
              font-family 'PingFang-SC-Medium'
              font-weight 500
              // float left
              // margin-top -.25rem
              // margin-left 1.82rem
              position absolute
              left 1.82rem
              top .73rem
              color #fff
            .tecNum
              font-size .65rem
              font-family 'PingFang-SC-Medium'
              font-weight 500
              float right
              margin-right .15rem
              margin-top .42rem
              color #fff
    // .quality
    //   width 3.79rem
    //   height 1.37rem
    //   position absolute
    //   left 14.94rem
    //   top 3.66rem
    //   background url('../../assets/images/bgSmall.png')
    //   background-size contain
    //   background-size 3.79rem 1.37rem
    //   .icon_z
    //     width .7rem
    //     height .86rem
    //     position absolute
    //     left .14rem
    //     top .27rem
    //   .tecText
    //     font-size .41rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left .92rem
    //     top .48rem
    //     color #fff
    //   .tecEnglish
    //     font-size .21rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 1.82rem
    //     top .73rem
    //     color #fff
    //   .tecNum
    //     font-size .65rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 3.15rem
    //     top .42rem
    //     color #fff
    // .equipment
    //   width 3.79rem
    //   height 1.37rem
    //   position absolute
    //   left 14.94rem
    //   top 5.52rem
    //   background url('../../assets/images/bgSmall.png')
    //   background-size contain
    //   background-size 3.79rem 1.37rem
    //   .icon_s
    //     width .7rem
    //     height .86rem
    //     position absolute
    //     left .14rem
    //     top .27rem
    //   .tecText
    //     font-size .41rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left .92rem
    //     top .48rem
    //     color #fff
    //   .tecEnglish
    //     font-size .21rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 1.82rem
    //     top .73rem
    //     color #fff
    //   .tecNum
    //     font-size .65rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 3.15rem
    //     top .42rem
    //     color #fff
    // .production
    //   width 3.79rem
    //   height 1.37rem
    //   position absolute
    //   left 14.94rem
    //   top 7.3rem
    //   background url('../../assets/images/bgSmall.png')
    //   background-size contain
    //   background-size 3.79rem 1.37rem
    //   .icon_c
    //     width .7rem
    //     height .86rem
    //     position absolute
    //     left .14rem
    //     top .27rem
    //   .tecText
    //     font-size .41rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left .92rem
    //     top .48rem
    //     color #fff
    //   .tecEnglish
    //     font-size .21rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 1.82rem
    //     top .73rem
    //     color #fff
    //   .tecNum
    //     font-size .65rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 3.15rem
    //     top .42rem
    //     color #fff
    // .materiel
    //   width 3.79rem
    //   height 1.37rem
    //   position absolute
    //   left 14.94rem
    //   top 9.09rem
    //   background url('../../assets/images/bgSmall.png')
    //   background-size contain
    //   background-size 3.79rem 1.37rem
    //   .icon_l
    //     width .7rem
    //     height .86rem
    //     position absolute
    //     left .14rem
    //     top .27rem
    //   .tecText
    //     font-size .41rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left .92rem
    //     top .48rem
    //     color #fff
    //   .tecEnglish
    //     font-size .21rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 1.82rem
    //     top .73rem
    //     color #fff
    //   .tecNum
    //     font-size .65rem
    //     font-family 'PingFang-SC-Medium'
    //     font-weight 500
    //     position absolute
    //     left 3.15rem
    //     top .42rem
    //     color #fff
</style>