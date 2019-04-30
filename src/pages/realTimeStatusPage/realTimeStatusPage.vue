<template>
    <div class="realTimeStatusPageBox">
        <div class="realTimeStatus-Top">
            <div class="realTimeStatu">
                <div class="title">设备效率OEE&产能利用率TEEP</div>
                <div class="cutline">
                    <div><span></span>过去一个月</div>
                    <div><span></span>目标</div>
                    <div><span></span>实际</div>
                </div>
                <div class="echartOne" ref="echartOne" ></div>
            </div>
            <div class="realTimeStatu">
                <div class="title">设备状态<span>Equipment Status</span></div> 
                <div class="echartTwo" ref="echartTwo"></div>
                <ul class="status">
                    <li><span class="statuslogo"></span><div><span>生产中</span><span>Normal</span></div><span class="number">60</span></li>
                    <li><span class="statuslogo"></span><div><span>未生产</span><span>No Start</span></div><span class="number">32</span></li>
                    <li><span class="statuslogo"></span><div><span>故障中</span><span>Failure</span></div><span class="number">08</span></li>
                </ul>   
            </div>
            <div class="realTimeStatu">
                <div class="title">岗位实时状态<span>Position Status</span></div>
                <div class="jobStatus swiper-container swiper-container0">
                    <div class="swiper-wrapper">
                        <ul class="swiper-slide" v-for="(page, index) in PositionStatusPages" :key="index">
                            <li v-for="(item, index) in page" :key="index">
                                <p>{{item.cx}}</p>
                                <div class="bd"></div>
                                <div class="bd"></div>
                                <div class="shouldUp">
                                    <span>应上岗工位</span>
                                    <div class="totalMember"></div>
                                    <span>{{item.su}}个</span>
                                </div>
                                <div class="haveUp">
                                    <span>已上岗工位</span>
                                    <div class="comeMember" :style="{'width': `${item.hu / item.su * 3.04}rem`}"></div>
                                    <span>{{item.hu}}个</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="realTimeStatus-Bottom">
            <div class="qualityPlato">
                <div class="title">
                    质量柏拉图<span>Quality Plato</span>
                </div>
                <div class="echartThree" ref="echartThree">
                </div>
            </div>
            <div class="paramsWatch">
                <div class="title">
                    工艺参数监控<span>Process Parameters</span>
                </div>
                <div class="processParameters">
                    <div class="ptitle">
                        <span>工作中心编号</span>
                        <span>工作中心名称</span>
                        <span>参数</span>
                        <span>理论</span>
                        <span>实际</span>
                    </div>
                    <div class="swiper-container swiper-container1">
                        <div class="swiper-wrapper">
                            <ul class="swiper-slide" v-for="(page, index) in ProcessParametersPages" :key="index"> 
                                <li v-for="(item, index) in page" :key="index">
                                    <span>{{item.nb}}</span>
                                    <span>{{item.nm}}</span>
                                    <span>{{item.param}}</span>
                                    <span>{{item.ll}}</span>
                                    <span>{{item.sj}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import echarts from 'echarts'
import Swiper from 'swiper'
import { setTimeout } from 'timers';
    export default {
        data() {
            return {
                //模拟生产线岗位实时状态数据
                positionStatus: [
                    {cx:'产线A', su:300, hu: 90},
                    {cx:'产线B', su:200, hu: 100},
                    {cx:'产线c', su:500, hu: 200},
                    {cx:'产线D', su:150, hu: 120},
                    {cx:'产线E', su:300, hu: 110},
                    {cx:'产线F', su:300, hu: 100},
                    {cx:'产线G', su:400, hu: 180},
                    {cx:'产线H', su:600, hu: 120},
                    ],
                //模拟监控工艺参数
                ProcessParameters:[
                    {nb:'001-33', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-33', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-33', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-33', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-33', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-33', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-44', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-44', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-44', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-44', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-44', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-44', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-55', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-55', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-55', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    {nb:'001-55', nm:'后桥通过式超声波喷淋清洗机', param:'倍率', ll:'50%', sj:'100%'},
                    ]
            }
        },
        computed: {
            //工艺参数监控数据页数
            ProcessParametersPages() {
                const ProcessParametersPages = []
                this.ProcessParameters.forEach((item, index) => {
                    const page = Math.floor(index/6)
                    if(!ProcessParametersPages[page]) {
                        ProcessParametersPages[page] = []
                    }
                    ProcessParametersPages[page].push(item)
                })
                return ProcessParametersPages
            },
            //岗位实时状态页数
            PositionStatusPages() {
                const PositionStatusPages = []
                this.positionStatus.forEach((item, index) => {
                    const page = Math.floor(index/3)
                    if(!PositionStatusPages[page]) {
                        PositionStatusPages[page] = []
                    }
                    PositionStatusPages[page].push(item)
                })
                return PositionStatusPages
            }
        },
        methods: {
            //初始化图表
            initChart() {    
                //初始化图表一
                this.echartOne = echarts.init(this.$refs.echartOne)
                this.echartOne.setOption({
                    // dataset: {
                    //     source: [
                    //         ['product', '过去一个月', '目标', '实际'],
                    //         ['设备综合效率OEE', 43.3, 85.8, 93.7],
                    //         ['产能利用效率TEEP', 83.1, 73.4, 55.1],
                    //     ]
                    // },
                    grid: {
                        left: '15%',
                
                    },
                    xAxis: {
                            type: 'category',
                            nameGap: 60,
                             data: ['设备综合效率OEE', '产能利用效率TEEP'],
                            axisTick : {show: false},
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#294a88',
                                    width: 2,
                                    opacity: 0.2
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                },
                                fontSize: '72%',
                                margin:17, //控制X轴文字与轴线之间的距离
                            }
                        },
                    yAxis: {
                        type: 'value',
                        position: 'left',
                        axisLabel: {
                            formatter: '{value}.0%',
                            textStyle: {
                                color: '#fff'
                            },
                            fontSize: '54%'
                        },
                        min: 0.0,
                        max: 100.0,
                        interval: 25.0,
                        axisTick : {show: false},
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#294a88',
                                width: 2,
                                opacity: 0.2
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#294a88',
                                width: 2,
                                opacity: 0.2
                            }
                        },
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth : '12.5%',
                            data: [78, 46],
                            barGap: '100%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#228FFE" // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#52C5FF" // 100% 处的颜色
                                    }], false)
                                }
                            },
                            label: {  
                                normal: {
                                    formatter: '{c}.0%',
                                    show: true,
                                    fontSize: '68%',
                                    position: 'top',
                                    color: '#fff',
                                    position: 'top',
                                    distance: 17 //条状图上方文字距离条状图顶部的距离，前提是必须要有上方position
                                }
                            },
                        },
                        {
                            type: 'bar',
                            barWidth : '12.5%',
                            data: [67, 51],
                            barGap: '100%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#F77919" // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#F9AB69" // 100% 处的颜色
                                    }], false)
                                }
                            },
                            label: {
                                
                                normal: {
                                    formatter: '{c}.0%', //c代表数值
                                    show: true,
                                    fontSize: '68%',
                                    position: 'top',
                                    color: '#fff',
                                    position: 'top',
                                    distance: 17
                                }
                            },
                        },
                        {
                            type: 'bar',
                            barWidth : '12.5%',
                            data: [48, 32],
                            barGap: '100%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#00D98B" // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#3FC8AA" // 100% 处的颜色
                                    }], false)
                                }
                            },
                            label: {
                                
                                normal: {
                                    formatter: '{c}.0%',
                                    show: true,
                                    fontSize: '68%',
                                    position: 'top',
                                    color: '#fff',
                                    position: 'top',
                                    distance: 17
                                }
                            },
                        },
                        
                    ]
                })
                //初始化图表二
                this.echartTwo = echarts.init(this.$refs.echartTwo)
                this.echartTwo.setOption({
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['40%', '60%'],
                            center: ['50%', '55%'],
                            avoidLabelOverlap: false,
                            data:[
                                {value:60, name:'生产中'},
                                {value:32, name:'未生产'},
                                {value:8, name:'故障中'},
                            ],
                            label: {
                                normal: {
                                    formatter: '{c}%',
                                    textStyle : {
			                                    fontWeight : 500 ,
			                                    fontSize : '79%'    //文字的字体大小
			                                },
                                },
                            },
                            labelLine: {
                                show: true
                            },
                            itemStyle: {
                                normal: { 
                                    color: function(params) { 
                                    　//首先定义一个数组 
                                        var colorList = [ 
                                        '#0091F1','#FDB628','#EE2F2F'
                                        ]; 
                                        return colorList[params.dataIndex] 
                                    }, 
                                } 
                            },
                        }
                    ]
                })
                //初始化图表三
                this.echartThree = echarts.init(this.$refs.echartThree)
                this.echartThree.setOption({
                    color: ['#228FFE'],
                    xAxis: [
                        {
                            type: 'category',
                            data: ['油封油封油封油封大萨达','气室','U型螺','气室支','U型','U型螺','U型','U型','U型螺','U型螺'],
                            axisTick : {
                                show: false,
                                alignWithLabel: true 
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#294a88'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                },
                                fontSize: '54%',
                                interval:0,  //强制设置坐标轴分割间隔
                                rotate:20  //X轴文字旋转角度
                            },
                        }
                    ],
                    yAxis: [
                        {
                           type: 'value',
                            axisLabel: {
                                textStyle: {
                                    color: '#fff'
                                },
                                fontSize: '54%',
                            },
                            min: 0,
                            max: 100,
                            interval: 20,
                            axisTick : {show: false},
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: '#294a88',
                                    width: 2,
                                    opacity: 0.2
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#294a88',
                                    width: 2,
                                    opacity: 0.2
                                }
                            },
                        },
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value}%',
                                textStyle: {
                                    color: '#fff'
                                },
                                fontSize: '54%',
                            },
                            min: 0,
                            max: 100,
                            interval: 20,
                            axisTick : {show: false},
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#294a88',
                                    width: 2,
                                    opacity: 0.2
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#294a88',
                                    width: 2,
                                    opacity: 0.2
                                }
                            },
                        }
                    ],
                    series: [
                        {
                            type:'bar',
                            data:[49, 37, 36, 35, 28, 18, 15, 10, 8, 7],
                            barWidth: '80%',
                            barCategoryGap:'31.4%',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                        offset: 0,
                                        color: "#52C5FF" // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: "#228FFE" // 100% 处的颜色
                                    }], false)
                                }
                            },
                            label: {  
                                normal: {
                                    formatter: '{c}',
                                    show: true,
                                    fontSize: '68%',
                                    position: 'top',
                                    color: '#fff',
                                    position: 'top',
                                    distance: 7 //条状图上方文字距离条状图顶部的距离，前提是必须要有上方position
                                }
                            },
                        },
                        {
                            type:'line',
                            yAxisIndex: 1,
                            symbol: 'square',
                            symbolSize: 8,
                            itemStyle: {
                                normal: {
                                    color: '#FFC110'
                                }
                            },
                            label: {  
                                normal: {
                                    formatter: '{c}%',
                                    show: true,
                                    fontSize: '61%',
                                    position: 'top',
                                    color: '#0866BB',
                                    position: 'top',
                                    distance: 12 //条状图上方文字距离条状图顶部的距离，前提是必须要有上方position
                                }
                            },
                            lineStyle: {
                                normal: {
                                    color: '#0866BB',
                                    width: 2,
                                    type: 'solid'
                                }
                            },
                            data:[60.5, 63.4, 64.5, 70.1, 76.5, 80.1, 81.3, 84.3, 89.6, 100]
                        }
                    ]
                })
            }
        },
        mounted() {
            // setTimeout(() => {
            //     console.log(this.$refs.echartOne.style.webkitTapHighlightColor)
            // },500)
            //为了刷新页面的时候echarts图形不变小
            window.requestAnimationFrame(() => {
                this.initChart()                
            })
            new Swiper('.swiper-container0',{
                loop: true,
                autoplay: true,
                delay: 3000,                
                observer:true,
                observeParents:true
            })
            new Swiper('.swiper-container1',{
                loop: true,
                autoplay: true,
                delay: 3000,
                observer:true,
                observeParents:true
            })
            const that = this
            window.onresize = function() {
                that.echartOne.resize();
                that.echartTwo.resize();
                that.echartThree.resize();
            }
        }
    }
</script>
 
<style lang='stylus' scoped>
    .realTimeStatusPageBox
        width 19.2rem
        height 10.8rem
        background url('../../assets/images/bg.png') no-repeat
        background-size 100% 100%
        .realTimeStatus-Top
            width 100%
            height 50%
            .realTimeStatu
                float left
                display inline-block
                width 6.4rem
                height 100%
                &:nth-child(1), &:nth-child(2)
                    border-right .01rem solid rgba(125, 170,  255, .4)
                &:nth-child(1) 
                    position relative
                    .title
                        font-size .32rem
                        color #fff
                        padding-left .41rem
                        padding-top .45rem
                    .cutline
                        padding-left .5rem
                        padding-top .34rem
                        div
                            display inline-block
                            font-size .2rem
                            color #fff
                            margin-right .35rem
                            span                            
                                display inline-block
                                width .15rem
                                height .15rem
                                margin-right .19rem
                                background linear-gradient(0deg,rgba(34,143,254,1),rgba(82,197,255,1))
                                border-radius 50%
                            &:nth-child(2)
                                span
                                    background linear-gradient(0deg,rgba(247,121,25,1),rgba(249,171,105,1))
                            &:nth-child(3)
                                margin-right 0
                                span 
                                    background linear-gradient(0deg,rgba(0,217,139,1),rgba(63,200,170,1))
                    .echartOne
                        position absolute 
                        left 0
                        bottom 0
                        width 6.4rem
                        height 3.4rem
                &:nth-child(2)
                    position relative
                    .title
                        font-size .32rem
                        color #fff
                        padding-left .41rem
                        padding-top .45rem
                        span 
                            font-size .2rem
                            padding-left .16rem
                    .echartTwo
                        width 4.4rem
                        height 4.5rem
                        position absolute 
                        bottom 0
                        left 0
                    .status
                        position absolute
                        bottom 1rem
                        right .3rem
                        li 
                            color #fff
                            padding-top .47rem
                            .statuslogo 
                                display inline-block
                                width .15rem
                                height .15rem
                                border .02rem solid #0091F1
                                border-radius 50%
                                margin-bottom .2rem
                            &:nth-child(2)
                                .statuslogo 
                                    border .02rem solid #FDB628
                            &:nth-child(3)
                                .statuslogo 
                                    border .02rem solid #EE2F2F
                            div 
                                display inline-block
                                padding-left .1rem
                                span 
                                    display block
                                    &:first-child
                                        font-size .24rem
                                    &:last-child
                                        font-size .16rem
                            .number 
                                font-size .48rem
                                padding-left .22rem
                &:nth-child(3)
                    .title
                        font-size .32rem
                        color #fff
                        padding-left .41rem
                        padding-top .45rem
                        span 
                            font-size .2rem
                            padding-left .16rem  
                    .jobStatus
                        width 100%
                        height 4.64rem
                        .swiper-wrapper
                            height 100%
                            ul 
                                height 100%
                                li
                                    height 30%
                                    padding-top .32rem
                                    padding-left .41rem
                                    position relative
                                    p
                                        font-size .24rem
                                        color #fff 
                                    .bd
                                        width .14rem
                                        height .46rem
                                        border .01rem solid rgba(217, 239, 255, .3)
                                        &:first-of-type
                                            border-top 0
                                            border-right 0
                                            position absolute
                                            top .63rem
                                            left .7rem
                                        &:nth-child(3)
                                            height .53rem
                                            border-right 0
                                            position absolute
                                            top .83rem
                                            left .84rem
                                    .shouldUp, .haveUp
                                        color #fff
                                        font-size .2rem
                                        position absolute
                                        .totalMember, .comeMember
                                            display inline-block
                                            height .14rem
                                    .shouldUp
                                        top .75rem
                                        left 1.07rem
                                        .totalMember
                                            width 3.04rem
                                            background linear-gradient(270deg,rgba(34,143,254,1),rgba(82,197,255,1))
                                            border-radius .07rem
                                    .haveUp
                                        top 1.19rem
                                        left 1.07rem
                                        .comeMember
                                            width 1.98rem
                                            background linear-gradient(270deg,rgba(247,121,25,1),rgba(249,171,105,1));
                                            border-radius .07rem          
        .realTimeStatus-Bottom
            width 100%
            height 50%
            border-top .01rem solid rgba(125, 170,  255, .4)
            .qualityPlato
                float left
                width 11rem
                height 100%
                border-right .01rem solid rgba(125, 170,  255, .4)
                position relative
                .title
                    font-size .32rem
                    color #fff
                    padding-left .41rem
                    padding-top .45rem
                    span 
                        font-size .2rem
                        padding-left .16rem
                .echartThree
                    position absolute 
                    left 0
                    bottom 0
                    width 10.99rem
                    height 4.6rem
            .paramsWatch
                float left
                width 8.2rem
                height 100%
                .title
                    font-size .32rem
                    color #fff
                    padding-left .41rem
                    padding-top .45rem
                    span 
                        font-size .2rem
                        padding-left .16rem   
                .processParameters
                    padding .4rem .56rem 0 .4rem
                    .ptitle
                        width 100%
                        border-bottom .02rem solid #0576D2
                        padding-bottom .23rem
                        font-size 0
                        span  
                            display inline-block  
                            font-size .2rem
                            color #fff
                            text-align center
                            &:nth-child(1)
                                width 1.72rem
                                text-align left
                            &:nth-child(2)
                                width 2.72rem
                                text-align left
                            &:nth-child(3)
                                width 1.08rem
                                text-align center
                            &:nth-child(4)  
                                text-align center
                                width 1.02rem
                            &:nth-child(5)
                                width .7rem
                                text-align right
                    .swiper-container
                        width 100%
                        height 3.48rem
                        .swiper-wrapper
                            .swiper-slide
                                li 
                                    width 100%
                                    height .5rem
                                    font-size 0
                                    padding-top .28rem
                                    span 
                                        display inline-block  
                                        line-height .5rem
                                        color #ffffff
                                        font-size .18rem
                                        text-align center
                                        &:nth-child(1)
                                            width 1.72rem
                                            text-align left
                                        &:nth-child(2)
                                            width 2.72rem
                                            text-align left
                                        &:nth-child(3)
                                            width 1.08rem
                                        &:nth-child(4)  
                                            width 1.02rem
                                        &:nth-child(5)
                                            width .7rem
                                            text-align right
</style>