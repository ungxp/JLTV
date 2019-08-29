<template>
    <!-- <div class="swiper-container swiper-containerZ">
        <div class="swiper-wrapper">
            <ChassisPage class="swiper-slide" v-if="this.$route.params.choosedTVboardList.includes(0)" ></ChassisPage>
            <DetailsPage class="swiper-slide"  v-if="this.$route.params.choosedTVboardList.includes(3)"></DetailsPage>
            <orderManagementPage class="swiper-slide"  v-if="this.$route.params.choosedTVboardList.includes(2)"></orderManagementPage>
            <realTimeStatusPage class="swiper-slide"  v-if="this.$route.params.choosedTVboardList.includes(1)"></realTimeStatusPage>
        </div>
    </div> -->
    <div class="swiper">
        <el-carousel :interval="switchTime"  ref="carousel" indicator-position="none" :autoplay='autoplayFlag'>
            <el-carousel-item v-if="this.$route.params.choosedTVboardList.includes(0)" name="ChassisPage">
                <ChassisPage class="swiper-slide" @getAndonData = 'getAndonData'></ChassisPage>  
            </el-carousel-item>
            <el-carousel-item  v-if="this.$route.params.choosedTVboardList.includes(3)">
                <DetailsPage class="swiper-slide"></DetailsPage>            
            </el-carousel-item>
            <el-carousel-item  v-if="this.$route.params.choosedTVboardList.includes(2)">
                <orderManagementPage class="swiper-slide"></orderManagementPage>              
            </el-carousel-item>
            <el-carousel-item  v-if="this.$route.params.choosedTVboardList.includes(1)">
                <realTimeStatusPage class="swiper-slide" @canceltimer = canceltimer></realTimeStatusPage>             
            </el-carousel-item>
        </el-carousel>
        <a href="" @click.prevent="gotohomePage" @focus="addborder" :class="1== index?'active':''"><img src="./images/back.png" alt=""></a>
    </div> 
</template>
 
<script>
import Swiper from 'swiper'
import ChassisPage from '../ChassisPage/ChassisPage'
import DetailsPage from '../DetailsPage/DetailsPage'
import orderManagementPage from '../orderManagementPage/orderManagementPage'
import realTimeStatusPage from '../realTimeStatusPage/realTimeStatusPage'
import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                Andon:'',
                autoplayFlag:true,
                index:-1,
                timer: '',
                switchTime:0,//页面切换时间间隔
            }
        },
        components: {
            ChassisPage,
            DetailsPage,
            orderManagementPage,
            realTimeStatusPage
        },
        methods: {
            //清除定时器
            canceltimer(data) {
                this.timer = data
            },
            //安灯页数据变化传值
            getAndonData(data) {
                this.Andon = data
            },
            addborder() {
                this.index = 1
            },
            //跳转到首页
            gotohomePage() {
                this.$router.push({name:'homePage'})
                this.index = -1
            }
        },
        watch:{
           'Andon':function(newval,oldval) {
                this.$refs.carousel.setActiveItem('ChassisPage')
                this.autoplayFlag = false
                console.log('前',this.autoplayFlag)
                clearTimeout(timer)
                var timer = setTimeout(() => {
                    this.autoplayFlag = true
                    console.log('后',this.autoplayFlag)
                },0)
                this.$forceUpdate()
                console.log('新值',newval)
           } 
        },
        activated() {
            localStorage.setItem('NowPage',this.$route.path)
            console.log('路径',this.$route.path)
            // this.$nextTick(() => {
            //     new Swiper('.swiper-containerZ',{
            //         loop: true,
            //         autoplay: true,
            //         autoplay: {
            //             delay: 5000
            //         },
            //         observer:true,
            //         observeParents:true
            //     })
            // })
            //获取看板切换时间
            this.$axios.post('/JLDPWebApi/api/MCorder/GetKANBANSWITCHTIME').then(res => {
                console.log('切换时间',res)
                this.switchTime = res.data*1000
                this.$forceUpdate() //必须要加这个话，不然重新获取时间后轮播间隔并没改变
                console.log('切换时间毫秒',this.switchTime)

            })
        },
        beforeRouteLeave (to, from, next) {
            if(this.timer) {
                window.clearInterval(this.timer)
            }
            next()
        }
    }
</script>
<style lang="stylus" scoped>
    .swiper
        position relative
        a 
            display inline-block
            width .6rem
            height .6rem
            background rgba(19,185,200,0)
            border-radius 50% 50%
            position absolute
            z-index 2000
            right .1rem
            bottom .1rem
            color #fff
            font-size .30rem
            text-align center
            
            img 
                width .5rem
                height .5rem
        .active
            border .03rem solid #0090ff
</style>

<style>
    .el-carousel__container {
        height: 10.8rem 
    }
            
</style>
