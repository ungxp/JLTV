<template>
<div class="big">
    <div class="left">
      <!-- 左边背景图 -->
      <img :src="'data:image/png;base64,'+picBase64" alt="左边看板区" class="left_bg">
      <!-- 闪烁图标 -->
      <img :src="'data:image/png;base64,'+item.Andon看板闪烁图片" alt="闪烁" class="iconPosition"  v-for="(item,index) in leftAndonList" :key="index" :style="`left:${item.X坐标/100}rem;top:${item.Y坐标/100}rem;width:${item.控件宽/100}rem;height:${item.控件高/100}rem`">
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
import { resolve } from 'url';
import {Base64} from 'js-base64';
import Swiper from 'swiper'
import { setInterval } from 'timers';
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
      swiper0:'',
      TypeInformation: []
    }
  },
  
  mounted() {
    const URL = this.$route.params.url
    const WATCHPOINT = this.$route.params.watchPoint
    this.getAndonMonitoryPointBackgroundImage(URL, WATCHPOINT)//获取Andon监控点背景图(用于Andon看板)
    this.getAndonTypeInformation(this.AndonType, URL, WATCHPOINT)//处理后右边安灯大数组
    setInterval(() => {
      this.AndonType = [];
      this.TypeInformation.forEach((item, index) => {
          this.AndonType.push({GUID:item.Andon类别Guid, HashCodeB:item.Andon看板标识图片哈希码, HashCodeC:item.Andon看板闪烁图片哈希码})
      })
      this.getAndonMonitoryPointBackgroundImage(URL, WATCHPOINT)//获取Andon监控点背景图(用于Andon看板)
      this.getAndonTypeInformation(this.AndonType, URL, WATCHPOINT)//处理后右边安灯大数组
    }, 60000)
  },
  watch:{
      'leftAndonList': function (newValue,oldValue) {//当数据变化时播放提示音乐
        let audio = document.getElementById('myAudio')
        audio.load()//重新加载，从头播放
        audio.play()//开始播放
        // console.log(newValue,oldValue)
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
    getAndonMonitoryPointBackgroundImage(URL, WATCHPOINT){//获取Andon监控点背景图(用于Andon看板)
      this.$axios.post(URL+'/Andon/GetAndonMonitoryPointBackgroundImage',{
        MonitoryPointGuid: WATCHPOINT,//监控点Guid
        HashCode:this.HashCode//将data中的哈希赋值给HashCode参数
      }).then(res => {
        if(res.data!=0){//如果上一次返回0，即图片没有变化，或第一次申请，就将新获取到的哈希值赋值给this，防止出现背景图片时有时无的现象
          var data=JSON.parse(res.data)
          console.log('背景图片',data)
          this.HashCode=data.HashCode//获取哈希值并赋值给data中的HashCode
          this.picBase64=data.PicBase64//获取图片base64编码
        }
        // console.log('背景',res)
      })
    },
    getAndonTypeInformation(data, URL, WATCHPOINT){//获取Andon类别信息（包含Andon看板标识图片，Andon看板闪烁图片，Andon类别基本信息）(用于Andon看板)
      this.$axios.post(URL+'/AdType/GetAndonTypeInformation',{
        MonitoryPointGuid: WATCHPOINT,//监控点Guid
        Data:data
      }).then(resTypeInformation => {
        if(JSON.parse(resTypeInformation.data)[0].Result == 0)
          return

        console.log('获取Andon类别信息',JSON.parse(JSON.parse(resTypeInformation.data)[0].Data))
        //获取的安灯类别信息
        this.TypeInformation = JSON.parse(JSON.parse(resTypeInformation.data)[0].Data)

        console.log('获取Andon类别信息11111', this.TypeInformation)

        console.log(JSON.parse(resTypeInformation.data)[0])
        //如果上一次返回0，即图片没有变化，或第一次申请，就将新获取到的哈希值赋值给this，防止出现图片时有时无的现象

        // this.HashCodeC=this.TypeInformation.HashCodeC//获取哈希值并赋值给TypeInformation中的HashCodeC
        // this.typeGuid=this.TypeInformation.GUID//获取哈希值并赋值给TypeInformation中的GUID
        // this.HashCodeB=this.TypeInformation.HashCodeB//获取哈希值并赋值给TypeInformation中的HashCodeB
        //获取根据Andon类别分类统计Andon数量(用于Andon看板)
        this.$axios.post(URL+'/Andon/GetAndonCountGroupbyType',{
          MonitoryPointGuid: WATCHPOINT//监控点Guid
        }).then(resCountGroupbyType=>{
          console.log('获取安灯数量',resCountGroupbyType.data)
          //获取的安灯数量
          var CountGroupbyType = resCountGroupbyType.data
          this.TypeInformation.forEach((item, index) => {
            var a = 0
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
          })
          this.andonBigList = this.TypeInformation
          this.$nextTick(() => {//滚动效果
            if(this.swiper0) {
              this.swiper0.update(false)
            }else {
              var myswiper = new Swiper('.swiper-container',{
                  loop: true,
                  autoplay: {
                    delay: 2000,
                    reverseDirection: false,
                    disableOnInteraction:false
                  },
                  // direction: 'vertical',
                  observer:true,
                  observeParents:true
                })
              this.swiper0 = myswiper
            }   
          })
        })
        //得到Andon列表(用于Andon看板)
        this.$axios.post(URL+'/Andon/GetAndon',{
          MonitoryPointGuid: WATCHPOINT//监控点Guid
        }).then(resAndon=>{ 
          console.log('获取Andon列表:',resAndon.data)
          var andon = resAndon.data
          this.$axios.post(URL+'/Andon/GetAndonMonitoryPointLocation',{
            MonitoryPointGuid: WATCHPOINT//监控点Guid
          }).then(resPointLocation => {
            var PointLocation = JSON.parse(resPointLocation.data)
            // console.log(data)
            console.log('获取监控点分布图',PointLocation)
            //安灯列表遍历
            andon.forEach((item, index) => {
              //安灯类别信息遍历
              this.TypeInformation.forEach((it, de) => {
                if(item.Andon类别GUID == it.Andon类别Guid) {
                  item.Andon看板闪烁图片 = it.Andon看板闪烁图片
                }
              })
              //监控点分布遍历
              PointLocation.forEach((te, nd) => {
                if(item.工位GUID == te.工位GUID) {
                  item.X坐标 = te.X坐标
                  item.Y坐标 = te.Y坐标
                  item.控件宽 = te.控件宽
                  item.控件高 = te.控件高
                }
              })
            })
            this.leftAndonList = andon
            // console.log(this.leftAndonList)
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
    .iconPosition
      position absolute
      left 2rem
      top 1rem
      animation mymove ease-in-out 3s infinite
    @keyframes mymove{
      from { opacity: 0.1; } /* 动画开始时的不透明度 */
      50%  { opacity:   1; } /* 动画50% 时的不透明度 */
      to   { opacity: 0.1; }
    }
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