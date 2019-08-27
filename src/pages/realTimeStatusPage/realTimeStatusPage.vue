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
                    <li><span class="statuslogo"></span><div><span>生产中</span><span>Normal</span></div><span class="number">{{this.EquipmentNormalNum}}</span></li>
                    <li><span class="statuslogo"></span><div><span>未生产</span><span>No Start</span></div><span class="number">{{this.EquipmentNoNum}}</span></li>
                    <li><span class="statuslogo"></span><div><span>故障中</span><span>Failure</span></div><span class="number">{{this.EquipmentFailureNum}}</span></li>
                </ul>   
            </div>
            <div class="realTimeStatu">
                <div class="title">岗位实时状态<span>Position Status</span></div>
                <div class="jobStatus swiper-container swiper-containerB">
                    <div class="swiper-wrapper">
                        <ul class="swiper-slide" v-for="(page, index) in PositionStatusPages" :key="index">
                            <li v-for="(item, index) in page" :key="index">
                                <p>{{item.产线名称}}</p>
                                <div class="bd"></div>
                                <div class="bd"></div>
                                <div class="shouldUp">
                                    <span>应上岗工位</span>
                                    <div class="totalMember" :style="[item.应上岗工位数==0?{'width':0}:item.应上岗工位数<item.已上岗工位数?{'width': `${item.应上岗工位数 / item.已上岗工位数 * 3.04}rem`}:{'width':'3.04rem'}]"></div>
                                    <span>{{item.应上岗工位数}}个</span>
                                </div>
                                <div class="haveUp">
                                    <span>已上岗工位</span>
                                    <div class="comeMember" :style="[item.已上岗工位数==0?{'width':0}:item.应上岗工位数>=item.已上岗工位数?{'width': `${item.已上岗工位数 / item.应上岗工位数 * 3.04}rem`}:{'width':'3.04rem'}]"></div>
                                    <span>{{item.已上岗工位数}}个</span>
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
            <!-- <div class="paramsWatch">
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
                    <div class="swiper-container swiper-containerC">
                        <div class="swiper-wrapper">
                            <ul class="swiper-slide" v-for="(page, index) in ProcessParametersPages" :key="index"> 
                                <li v-for="(item, index) in page" :key="index">
                                    <span>{{item.Code}}</span>
                                    <span>{{item.Name}}</span>
                                    <span>{{item.Parameter}}</span>
                                    <span>{{item.Standard}}</span>
                                    <span>{{item.Value}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import Swiper from 'swiper'
import { setTimeout, setInterval } from 'timers';
    export default {
        data() {
            return {
                //模拟生产线岗位实时状态数据
                positionStatus: [],
                //模拟监控工艺参数
                ProcessParameters:[],
                //质量柏拉图名称数组
                PlatoName:[],
                //质量柏拉图Y轴最大值：
                Max:0,
                //质量柏拉图数量
                PlatoQuantity: [],
                //计算后的柏拉图百分比
                computedPlato:[],
                //质量柏拉图百分比
                PlatoPercent: [],
                //质量柏拉图百分比number型
                PlatoPercentN:[],
                //设备状态未生产
                EquipmentNo:'',
                //设备状态生产中
                EquipmentNormal:'',
                //设备状态故障中
                EquipmentFailure: '',
                //设备状态未生产数量
                EquipmentNoNum:'',
                //设备状态生产中数量
                EquipmentNormalNum:'',
                //设备状态故障中数量
                EquipmentFailureNum: '',
                //设备效率OEE&产能利用率TEEP过去一个月
                History:[],
                //设备效率OEE&产能利用率TEEP目标
                Target:[],
                //设备效率OEE&产能利用率TEEP实际
                Reality:[],
                //swiperB
                swiperB: '',
                //swiperC
                swiperC: '',
                //定时器
                timer: '',
                a:1
            }
        },
        // props:['timer'],
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
            initChart1(History, Target, Reality) {    
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
                                fontSize: '74%',
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
                            fontSize: '56%'
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
                            data: History,
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
                                    formatter: '{c}%',
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
                            data: Target,
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
                                    formatter: '{c}%', //c代表数值
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
                            data: Reality,
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
                                    formatter: '{c}%',
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
            },
            initChart2(EquipmentNo, EquipmentNormal, EquipmentFailure){
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
                                {value:EquipmentNormal, name:'生产中'},
                                {value:EquipmentNo, name:'未生产'},
                                {value:EquipmentFailure, name:'故障中'},
                            ],
                            label: {
                                normal: {
                                    formatter: '{c}%',
                                    textStyle : {
			                                    fontWeight : 500 ,
			                                    fontSize : '60%'    //文字的字体大小
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
            },
            initChart3(PlatoName, PlatoQuantity, computedPlato, Max){
                //初始化图表三
                this.echartThree = echarts.init(this.$refs.echartThree)
                this.echartThree.setOption({
                    color: ['#228FFE'],
                    grid: {
                        left: '8%',
                        right: '8%'
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: PlatoName,
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
                            max: Max,
                            interval: parseInt(Max/5),
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
                            data:PlatoQuantity,
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
                                    color: '#ffffff',
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
                            data:computedPlato
                        }
                    ]
                })
            },
        },
        activated() {
            localStorage.setItem('NowPage',this.$route.path)
            // console.log(this.$route.path)
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
            // const URL = this.$route.params.url
            const WORKSHOP = this.$route.params.WorkShopGUID
            //为了刷新页面的时候echarts图形不变小
            // window.requestAnimationFrame(() => {
            //     this.initChart1()                
            //     this.initChart2()                
            //     this.initChart3()                
            // })
            window.onresize = function() {
                that.echartOne.resize();
                that.echartTwo.resize();
                that.echartThree.resize();
            }
            //获取设备异常工艺参数列表(用于综合看板--工艺参数监控)
            if(this.$route.params.WorkShopGUID != '') {
                this.$axios.post('/JLDPWebApi/Api/Ecinfo/GetMachineErrorParameter').then(res => {
                    this.$message.closeAll()
                    // console.log(JSON.parse(res.data))
                    this.ProcessParameters = JSON.parse(res.data)
                    this.$nextTick(() => {
                        // if(this.swiperC) {
                        //     this.swiperC.update(false)  
                        // }else {
                            if(this.ProcessParametersPages.length>=2) {
                                var swiperC = new Swiper('.swiper-containerC',{
                                    loop: false,
                                    autoplay: true,
                                    delay: 15000,
                                    observer:true,
                                    observeParents:true
                                })
                                this.swiperC = swiperC
                            }
                            this.$forceUpdate()
                        // }
                    })
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
            }
            //获取不良品评审单中最近30天的状态等于已复核的缺陷数据（top10）(用于综合看板--质量柏拉图)
            if(this.$route.params.WorkShopGUID != '') {
                this.$axios.post('/JLDPWebApi/Api/Qcrejectsorder/GetDefectDetail').then(res => {
                    this.$message.closeAll()
                    this.PlatoName = []
                    this.PlatoQuantity = []
                    this.PlatoPercent = []
                    this.computedPlato = []
                    this.PlatoPercentN = []
                    // console.log('质量柏拉图', res.data)
                    res.data.forEach((item, index) => {
                        this.PlatoName.push(item.缺陷定义名称)
                        this.PlatoQuantity.push(item.数量)
                        this.PlatoPercent.push(item.百分比.toFixed(1))
                        this.PlatoPercentN.push(item.百分比)
                    })
                    var max = this.PlatoQuantity.reduce(function(a,b) {
                        return b>a?b:a
                    })
                    this.Max = max % 5 == 0?max:max+(5 - max % 5)
                    // console.log('百分比',this.Max)
                    var sum = 0
                    for(var i = 0; i<this.PlatoPercentN.length; i++) {
                        sum = sum + parseFloat(this.PlatoPercent[i])
                        this.computedPlato.push(Math.round(sum))
                    }
                    // console.log('dasdsadsada',this.computedPlato)
                    this.initChart3(this.PlatoName, this.PlatoQuantity, this.computedPlato, this.Max)
                     this.$forceUpdate()
                    // console.log(this.PlatoName, this.PlatoQuantity, this.PlatoPercent)
                })
            }
            
            //获取指定车间下生产中、未生产、故障中的工作中心数量及比例(用于综合看板--设备状态)
            this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkcenterState',{
                WorshopGuid:WORKSHOP
            }).then(res => {
                this.$message.closeAll()
                // console.log('设备状态',res.data)
                this.EquipmentNo = []
                this.EquipmentNormal = []
                this.EquipmentFailure = []
                this.EquipmentNoNum = 0
                this.EquipmentNormalNum = 0
                this.EquipmentFailureNum = 0
                this.EquipmentNoNum = res.data[0].数量
                this.EquipmentNormalNum = res.data[1].数量
                this.EquipmentFailureNum = res.data[2].数量
                this.EquipmentNo = Math.round(res.data[0].百分比)+Math.round(res.data[1].百分比) >100 ?Math.round(res.data[0].百分比)-1:Math.round(res.data[0].百分比)
                this.EquipmentNormal = Math.round(res.data[1].百分比)
                this.EquipmentFailure = res.data[0].百分比 ==0 && res.data[1].百分比 ==0 && res.data[2].百分比 ==0 ? 0:100-this.EquipmentNormal-this.EquipmentNo
                // console.log('百分比大萨达',this.EquipmentNo,this.EquipmentNormal,this.EquipmentFailure,Math.round(14.285714),Math.round(28.57),Math.round(57.14))
                this.initChart2(this.EquipmentNo, this.EquipmentNormal, this.EquipmentFailure)
                this.$forceUpdate()
            })
            //获取指定车间下产线的应上岗工位数和已上岗工位数(用于综合看板--岗位实时状态)
            this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkcenterPostRealtimeState',{
                WorshopGuid:WORKSHOP 
            }).then(res => {
                this.$message.closeAll()
                console.log('岗位实时状态',res.data)
                this.positionStatus = res.data
                this.$nextTick(() => {
                    // if(this.swiperB) {
                    //     this.swiperB.update(true)  
                    // }else {
                        if(this.PositionStatusPages.length>=2) {
                            var swiperB = new Swiper('.swiper-containerB',{
                                loop: false,
                                autoplay: true,
                                delay: 15000,
                                observer:true,
                                observeParents:true
                            })
                            this.swiperB = swiperB
                            this.$forceUpdate()
                        }
                })
            })
            //获取指定车间目标oee平均值和目标teep平均值(用于综合看板--设备效率OEE&产能利用率TEEP)
            //获取指定车间实际oee平均值和实际teep平均值(用于综合看板--设备效率OEE&产能利用率TEEP)
            this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkshopTargetOeeAndTeep',{
                WorshopGuid:WORKSHOP 
            }).then(res => {
                // console.log(res.data[0].目标TEEP)
                this.$message.closeAll()
                this.Target = []
                this.Target.push(res.data[0].目标OEE != null?res.data[0].目标OEE.toFixed(1):0.0.toFixed(1))
                this.Target.push(res.data[0].目标TEEP != null?res.data[0].目标TEEP.toFixed(1):0.0.toFixed(1))
                console.log('目标',this.Target)
                this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkshopRealtimeOeeAndTeep',{
                    WorshopGuid:WORKSHOP 
                }).then(res => {
                    console.log('实际',res)
                    this.$message.closeAll()
                    // console.log('OEE',res.data)
                    this.History = []
                    this.Reality = []
                    this.History.push(res.data[0].历史Oee != null?res.data[0].历史Oee.toFixed(1):0.0.toFixed(1))
                    this.History.push(res.data[0].历史Teep != null?res.data[0].历史Teep.toFixed(1):0.0.toFixed(1))
                    this.Reality.push(res.data[0].当日Oee != null?res.data[0].当日Oee.toFixed(1):0.0.toFixed(1))
                    this.Reality.push(res.data[0].当日Teep != null?res.data[0].当日Teep.toFixed(1):0.0.toFixed(1))
                    this.initChart1(this.History, this.Target, this.Reality)
                     this.$forceUpdate()
                })
                // this.initChart1(this.History, this.Target, this.Reality)
            })
            
            // this.$forceUpdate()
            this.timer = window.setInterval(() => {
                //获取设备异常工艺参数列表(用于综合看板--工艺参数监控)
                if(this.$route.params.WorkShopGUID != 0) {
                    this.$axios.post('/JLDPWebApi/Api/Ecinfo/GetMachineErrorParameter').then(res => {
                        this.$message.closeAll()
                        // console.log(JSON.parse(res.data))
                        this.ProcessParameters = JSON.parse(res.data)
                        if(this.ProcessParametersPages.length>=2){
                            this.$nextTick(() => {
                                
                                    if(this.swiperC) {
                                        this.swiperC.update(false)  
                                        this.$forceUpdate() 
                                    }else {
                                        var swiperC = new Swiper('.swiper-containerC',{
                                            loop: false,
                                            autoplay: true,
                                            delay: 15000,
                                            observer:true,
                                            observeParents:true
                                        })
                                        this.swiperC = swiperC
                                    }
                                this.$forceUpdate()
                                
                            })
                        }else if(this.swiperC != ''){
                           this.swiperC.destroy() 
                        }
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
                }
                //获取不良品评审单中最近30天的状态等于已复核的缺陷数据（top10）(用于综合看板--质量柏拉图)
                if(this.$route.params.WorkShopGUID != '') {
                    this.$axios.post('/JLDPWebApi/Api/Qcrejectsorder/GetDefectDetail').then(res => {
                        this.$message.closeAll()
                        this.PlatoName = []
                        this.PlatoQuantity = []
                        this.PlatoPercent = []
                        this.computedPlato = []
                        this.PlatoPercentN = []
                        // console.log('质量柏拉图', res.data)
                        res.data.forEach((item, index) => {
                            this.PlatoName.push(item.缺陷定义名称)
                            this.PlatoQuantity.push(item.数量)
                            this.PlatoPercent.push(item.百分比.toFixed(1))
                            this.PlatoPercentN.push(item.百分比)
                        })
                        var max = this.PlatoQuantity.reduce(function(a,b) {
                            return b>a?b:a
                        })
                        this.Max = max % 5 == 0?max:max+(5 - max % 5)
                        console.log('百分比',this.Max)
                        var sum = 0
                        for(var i = 0; i<this.PlatoPercentN.length; i++) {
                            sum = sum + parseFloat(this.PlatoPercent[i])
                            this.computedPlato.push(Math.round(sum))
                        }
                        // console.log('dasdsadsada',this.computedPlato)
                        this.initChart3(this.PlatoName, this.PlatoQuantity, this.computedPlato, this.Max)
                        this.$forceUpdate()
                        // console.log(this.PlatoName, this.PlatoQuantity, this.PlatoPercent)
                    })
                }
                //获取指定车间下生产中、未生产、故障中的工作中心数量及比例(用于综合看板--设备状态)
                this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkcenterState',{
                    WorshopGuid:WORKSHOP
                }).then(res => {
                    this.$message.closeAll()
                    // console.log(res.data)
                    this.EquipmentNo = []
                    this.EquipmentNormal = []
                    this.EquipmentFailure = []
                    this.EquipmentNoNum = 0
                    this.EquipmentNormalNum = 0
                    this.EquipmentFailureNum = 0
                    this.EquipmentNoNum = res.data[0].数量
                    this.EquipmentNormalNum = res.data[1].数量
                    this.EquipmentFailureNum = res.data[2].数量
                    this.EquipmentNo = Math.round(res.data[0].百分比)+Math.round(res.data[1].百分比) >100 ?Math.round(res.data[0].百分比)-1:Math.round(res.data[0].百分比)
                    this.EquipmentNormal = Math.round(res.data[1].百分比)
                    this.EquipmentFailure = res.data[0].百分比 ==0 && res.data[1].百分比 ==0 && res.data[2].百分比 ==0 ? 0:100-this.EquipmentNormal-this.EquipmentNo
                    this.initChart2(this.EquipmentNo, this.EquipmentNormal, this.EquipmentFailure)
                     this.$forceUpdate()
                })
                //获取指定车间下产线的应上岗工位数和已上岗工位数(用于综合看板--岗位实时状态)
                this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkcenterPostRealtimeState',{
                    WorshopGuid:WORKSHOP 
                }).then(res => {
                    this.$message.closeAll()
                    // console.log(res.data)
                    this.positionStatus = res.data
                    this.$nextTick(() => {
                        if(this.swiperB) {
                            this.swiperB.update(false)
                            this.$forceUpdate()  
                        }else if(this.PositionStatusPages.length>=2) {
                            var swiperB = new Swiper('.swiper-containerB',{
                                loop: false,
                                autoplay: true,
                                delay: 15000,
                                observer:true,
                                observeParents:true
                            })
                            this.swiperB = swiperB
                            this.$forceUpdate()
                        }
                    })
                })
                //获取指定车间目标oee平均值和目标teep平均值(用于综合看板--设备效率OEE&产能利用率TEEP)
                //获取指定车间实际oee平均值和实际teep平均值(用于综合看板--设备效率OEE&产能利用率TEEP)
                this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkshopTargetOeeAndTeep',{
                    WorshopGuid:WORKSHOP 
                }).then(res => {
                    // console.log(res.data[0].目标TEEP)
                    this.$message.closeAll()
                    this.Target = []
                    this.Target.push(res.data[0].目标OEE != null?res.data[0].目标OEE.toFixed(1):0.0.toFixed(1))
                    this.Target.push(res.data[0].目标TEEP != null?res.data[0].目标TEEP.toFixed(1):0.0.toFixed(1))
                    console.log('目标',this.Target)
                    this.$axios.post('/JLDPWebApi/Api/Bsworkcenter/GetWorkshopRealtimeOeeAndTeep',{
                        WorshopGuid:WORKSHOP 
                    }).then(res => {
                        console.log('实际',res)
                        this.$message.closeAll()
                        // console.log('OEE',res.data)
                        this.History = []
                        this.Reality = []
                        this.History.push(res.data[0].历史Oee != null?res.data[0].历史Oee.toFixed(1):0.0.toFixed(1))
                        this.History.push(res.data[0].历史Teep != null?res.data[0].历史Teep.toFixed(1):0.0.toFixed(1))
                        this.Reality.push(res.data[0].当日Oee != null?res.data[0].当日Oee.toFixed(1):0.0.toFixed(1))
                        this.Reality.push(res.data[0].当日Teep != null?res.data[0].当日Teep.toFixed(1):0.0.toFixed(1))
                        this.initChart1(this.History, this.Target, this.Reality)
                        this.$forceUpdate()
                    })
                    // this.initChart1(this.History, this.Target, this.Reality)
                })
            }, 60000)
            this.$emit('canceltimer',this.timer)
        },
        beforeRouteLeave (to, from, next) {
            if(this.timer) {
                window.clearInterval(this.timer)
            }
            next()
        },
    }
    
</script>
 
<style lang='stylus' scoped>
    .realTimeStatusPageBox
        width 19.2rem
        height 10.8rem
        background url("../../assets/images/bg.png") no-repeat
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
                        font-size .34rem
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
                        height 4rem
                &:nth-child(2)
                    position relative
                    width 6.6rem
                    border-right 0
                    .title
                        font-size .32rem
                        color #fff
                        padding-left .41rem
                        padding-top .45rem
                        span 
                            font-size .2rem
                            padding-left .16rem
                    .echartTwo
                        width 4.8rem
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
                                        font-size .26rem
                                    &:last-child
                                        font-size .18rem
                            .number 
                                font-size .5rem
                                padding-left .22rem
                &:nth-child(3)
                    width 6.2rem
                    height 200%
                    border-left .01rem solid rgba(125, 170,  255, .4)
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
                        height 9.5rem
                        .swiper-wrapper
                            height 100%
                            ul 
                                height 100%
                                li
                                    height 17%
                                    padding-top .32rem
                                    padding-left .41rem
                                    position relative
                                    p
                                        font-size .26rem
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
                                        font-size .22rem
                                        position absolute
                                        .totalMember, .comeMember
                                            display inline-block
                                            height .14rem
                                    .shouldUp
                                        top .75rem
                                        left 1.07rem
                                        .totalMember
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
            width 50%
            height 50%
            position relative
            // border-top .01rem solid rgba(125, 170,  255, .4)
            .qualityPlato
                float left
                width 13rem
                height 100%
                // border-right .01rem solid rgba(125, 170,  255, .4)
                border-top .01rem solid rgba(125, 170,  255, .4)
                position absolute
                left 0
                top 0
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
                    width 100%
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
                    padding .4rem 0 0 .4rem
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
                        height 3.4rem
                        .swiper-wrapper
                            .swiper-slide
                                li 
                                    width 100%
                                    height .5rem
                                    font-size 0
                                    padding-top .28rem
                                    span 
                                        display inline-block  
                                        // line-height .5rem
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