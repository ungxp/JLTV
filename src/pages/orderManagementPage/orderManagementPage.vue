<template>
    <div class="orderManagementBox">
        <div class="orderManagementBox-left">
            <div class="left-header">
                <div class="orderTrack">
                    <p>今日排产任务单跟踪</p>
                    <p>Today's scheduling</p>
                </div>
                <div class="orderStatus">
                   <div><span></span>未开始</div>
                   <div><span></span>进行中</div>
                   <div><span></span>已完成</div>
                </div>
            </div>
            <div class="left-body swiper-container swiper-container0">
                <div class="swiper-wrapper">
                    <ul class="swiper-slide" v-for="(orderTrackListPage, index) in orderTrackListPages" :key="index">
                        <li v-for="(item, index) in orderTrackListPage" :key="index">
                            <div class="order-left">
                                <span class="status1" v-show="item.状态 == '未开始'"></span>
                                <span class="status2" v-show="item.状态 == '进行中'"></span>
                                <span class="status3" v-show="item.状态 == '已完成'"></span>
                                <div>
                                    <div>订单编号：<span>{{item.订单编号}}</span></div>
                                    <div>排产单号：<span>{{item.排产单号}}</span></div>
                                    <div>产品编号：<span>{{item.产品编号}}</span></div>
                                </div>
                            </div>
                            <div class="order-middle"></div>
                            <div class="order-right">
                                <div class="order-right-top">
                                    <div :style="{'width':`${item.完成率 <= 1?item.完成率*5.23:5.23}rem`}">
                                        <div class="percent"><span>{{item.完成数量}}</span><span>({{parseInt(item.完成率*100)}}%)</span></div>
                                    </div>
                                </div>
                                <div class="order-right-bottom">
                                    <span>0</span>
                                    <span>{{item.计划数量}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="orderManagementBox-right">
            <div class="right-header">
                <div class="unfinishedOrder">
                    <p>未完成订单</p>
                    <p>Unfinished Orders</p>
                </div>
                <div class="days">前7天</div>
            </div>
            <div class="right-body">
                <div class="title">
                    <span>订单号</span>
                    <span>产品编号</span>
                    <span>订单数量</span>
                    <span>实际完成</span>
                    <span>差距</span>
                    <span>计划完成日期</span>
                </div>
                <div class="swiper-container swiper-container1">
                    <div class="swiper-wrapper">
                        <ul class="swiper-slide" v-for="(UnfinishedOrdersPage, index) in UnfinishedOrdersPages" :key="index">
                            <li v-for="(item, index) in UnfinishedOrdersPage" :key="index">
                                <!-- <span>{{item.订单号}}</span>
                                <span>{{item.产品编号}}</span>
                                <span>{{item.订单数量}}</span>
                                <span>{{item.实际完成}}</span>
                                <span>{{item.差距}}</span>
                                <span>{{item.计划结束日期}}</span> -->
                                <span>{{item.订单号}}</span>
                                <span>{{item.产品编号}}</span>
                                <span>{{item.订单数量}}</span>
                                <span>{{item.实际完成 == null? '0': item.实际完成}}</span>
                                <span>{{item.差距 == null? '0': item.差距}}</span>
                                <span>{{item.计划结束日期.substring(0,10)}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import Swiper from 'swiper'
    export default {
        data() {
            return {
                //今日排产任务单跟踪列表
                orderTrackList: [],
                //未完成订单列表
                UnfinishedOrders:[],
                //swiper0
                swiper0: '',
                //swiper1
                swiper1: ''
            }
        },
        methods: {
        },
        computed: {
            //今日排产任务单跟踪列表页数
            orderTrackListPages () {
                const orderTrackListPages = []
                this.orderTrackList.forEach((item, index) => {
                    const page = Math.floor(index / 10)
                    if(!orderTrackListPages[page]) {
                        orderTrackListPages[page] = []
                    }
                    orderTrackListPages[page].push(item)
                })
                return orderTrackListPages
            },
            //未完成订单列表页数
            UnfinishedOrdersPages () {
                const UnfinishedOrdersPages = []
                this.UnfinishedOrders.forEach((item, index) => {
                    const page = Math.floor(index / 14)
                    if(!UnfinishedOrdersPages[page]) {
                        UnfinishedOrdersPages[page] = []
                    }
                    UnfinishedOrdersPages[page].push(item)
                })
                return UnfinishedOrdersPages
            },
        },
        mounted() { 
            //获取今日排产任务单数据
            this.$axios.post('/Mcproductionschedule/GetTodayScheduling').then(res => {
                    this.orderTrackList = JSON.parse(res.data)
                    this.$nextTick(() => {
                        if(this.swiper0) {
                            this.swiper0.update(false)
                            
                        }else {
                            var swiper0 = new Swiper('.swiper-container0',{
                                loop: true,
                                autoplay: true,
                                delay: 3000,
                                observer:true,
                                observeParents:true
                            })
                            this.swiper0 = swiper0
                        }
                    })   
                })
            //获取未完成订单数据
            this.$axios.post('/Mcorder/GetUnfinishedOrders').then(res => {
                this.UnfinishedOrders = res.data
                this.$nextTick(() => {
                    if(this.swiper1) {
                        this.swiper1.update(false)
                    }else {
                        var swiper1 = new Swiper('.swiper-container1',{
                            loop: true,
                            autoplay: true,
                            delay: 3000,
                            direction: 'vertical',
                            observer:true,
                            observeParents:true
                        })
                        this.swiper1 = swiper1
                    }
                })
            })
            setInterval(() => {
                this.$axios.post('/Mcproductionschedule/GetTodayScheduling').then(res => {
                    this.orderTrackList = JSON.parse(res.data)
                    this.$nextTick(() => {
                        if(this.swiper0) {
                            this.swiper0.update(false) 
                        }else {
                            var swiper0 = new Swiper('.swiper-container0',{
                                loop: true,
                                autoplay: true,
                                delay: 3000,
                                observer:true,
                                observeParents:true
                            })
                            this.swiper0 = swiper0
                        }
                    })
                })
                this.$axios.post('/Mcorder/GetUnfinishedOrders').then(res => {
                    this.UnfinishedOrders = res.data
                    this.$nextTick(() => {
                        if(this.swiper1) {
                            this.swiper1.update(false)
                        }else {
                            var swiper1 = new Swiper('.swiper-container1',{
                                loop: true,
                                autoplay: true,
                                delay: 3000,
                                direction: 'vertical',
                                observer:true,
                                observeParents:true
                            })
                            this.swiper1 = swiper1
                        }
                    })
                })
            },60000)
        }
    }
</script>
 
<style lang='stylus' scoped>
    .orderManagementBox
        width 19.2rem
        height 10.8rem
        background url('../../assets/images/bg.png') no-repeat 
        background-size 100% 100%
        .orderManagementBox-left
            float left
            width 50%
            height 100%
            border-right .01rem solid rgba(255, 255, 255, 0.4)
            padding-top .37rem
            padding-left .42rem
            padding-right .49rem
            .left-header
                width 100%
                .orderTrack
                    float left
                    p 
                        display inline-block
                        color #fff
                        &:first-child 
                            font-size .31rem
                            padding-right .12rem
                        &:last-child 
                            font-size .2rem                        
                .orderStatus
                    float right
                    div
                        display inline-block
                        font-size .2rem
                        color #fff
                        margin-right .28rem
                        span                            
                            display inline-block
                            width .15rem
                            height .15rem
                            margin-right .1rem
                            background linear-gradient(-28deg,rgba(192,192,170,1),rgba(55,241,255,1))
                            border-radius 50%
                        &:nth-child(2)
                            span
                                background linear-gradient(-28deg,rgba(253,200,48,1),rgba(243,115,53,1))
                        &:nth-child(3)
                            margin-right 0
                            span 
                                background linear-gradient(-28deg,rgba(86,204,242,1),rgba(47,128,237,1))
            .swiper-container
                padding-top .66rem
                width 100%
                height 9.50rem
                .swiper-wrapper
                    .swiper-slide
                        li 
                            width 8.64rem
                            height .8rem
                            background rgba(5,53,153,0.18) 
                            border-radius .1rem
                            padding .12rem .23rem 0 .13rem
                            margin-bottom .17rem
                            .order-left
                                width 2.71rem
                                float left
                                .status1 
                                    float left
                                    display inline-block
                                    width .15rem
                                    height .15rem
                                    background linear-gradient(-28deg,rgba(192,192,170,1),rgba(55,241,255,1))
                                    border-radius 50%
                                .status2 
                                    float left
                                    display inline-block
                                    width .15rem
                                    height .15rem
                                    background linear-gradient(-28deg,rgba(253,200,48,1),rgba(243,115,53,1))
                                    border-radius 50%
                                .status3 
                                    float left
                                    display inline-block
                                    width .15rem
                                    height .15rem
                                    background linear-gradient(-28deg,rgba(86,204,242,1),rgba(47,128,237,1))
                                    border-radius 50%
                                div
                                    float right
                                    width 2.42rem
                                    div
                                        display inline-block
                                        font-size .15rem
                                        color rgba(198, 213, 253, 1)
                                        margin-bottom .08rem
                                        span 
                                            color #ffffff
                                            font-size .15rem
                            .order-middle
                                float left
                                width .01rem
                                height .56rem
                                background rgba(255, 255, 255, .29)
                            .order-right
                                float right 
                                width 5.23rem
                                height .58rem
                                .order-right-top
                                    width 100%
                                    height .32rem
                                    background rgba(226,231,238,.2)
                                    border-radius .02rem .04rem .04rem .02rem
                                    position relative
                                    div
                                        height 100%
                                        background linear-gradient(0deg,rgba(25,145,235,1) 0%,rgba(46,161,248,1) 100%)
                                        border-radius .02rem .04rem .04rem .02rem
                                        // position absolute
                                        .percent 
                                            background rgba(255, 255, 255, 0) 
                                            height .17rem
                                            position absolute 
                                            left 50%
                                            transform translateX(-50%) 
                                            top 50%
                                            transform translateY(-90%) 
                                            span 
                                                color #ffffff
                                                &:first-child
                                                    font-size .2rem
                                                    padding-right .1rem
                                                &:last-child
                                                    font-size .15rem
                                .order-right-bottom
                                    width 100%
                                    padding-top .1rem
                                    span 
                                        color #fff
                                        font-size .18rem
                                        &:first-child
                                            float left 
                                        &:last-child
                                            float right
        .orderManagementBox-right
            width 50%
            height 100%
            float right
            padding-top .37rem
            padding-left .45rem
            padding-right .46rem
            .right-header
                width 100%
                .unfinishedOrder
                    float left
                    p 
                        display inline-block
                        color #fff
                        &:first-child 
                            font-size .31rem
                            padding-right .12rem
                        &:last-child 
                            font-size .2rem 
                .days
                    float right
                    font-size .2rem
                    color #fff
            .right-body
                padding-top .66rem
                .title
                    width 100%
                    border-bottom .02rem solid #0576D2
                    padding-bottom .18rem
                    font-size 0
                    span  
                        display inline-block  
                        font-size .21rem
                        color #fff
                        text-align center
                        &:nth-child(1)
                            width 1.54rem
                            text-align left
                            padding-left .14rem
                        &:nth-child(2)
                            width 1.54rem
                        &:nth-child(3)
                            width 1.5rem
                        &:nth-child(4)  
                            width 1.46rem
                        &:nth-child(5)
                            width 1.1rem
                        &:nth-child(6)
                            width 1.5rem
                .swiper-container
                    width 100%
                    height 9.06rem
                    .swiper-wrapper
                        .swiper-slide
                            li 
                                width 100%
                                height .71rem
                                font-size 0
                                span 
                                    display inline-block  
                                    height 100%
                                    line-height .71rem
                                    color #ffffff
                                    font-size .18rem
                                    text-align center
                                    &:nth-child(1)
                                        width 1.54rem
                                        text-align left
                                        padding-left .14rem
                                    &:nth-child(2)
                                        width 1.54rem
                                    &:nth-child(3)
                                        width 1.5rem
                                    &:nth-child(4)  
                                        width 1.46rem
                                    &:nth-child(5)
                                        width 1.1rem
                                    &:nth-child(6)
                                        width 1.5rem
                                &:nth-child(even)
                                    height .56rem
                                    background rgba(32, 45, 108, 1)
                                    span    
                                        line-height .56rem
</style>