<template>
    <div class="homeBigBox">
        <div class="smallPictures">
            <a ref="lj" href="" @click.prevent="chooseChassisPage" @focus="addborder(0)" :class="0== index?'active':''"><img src="./images/01.png" alt=""><span class="iconfont icon-gou1" v-if="this.choosedTVboard.includes(0)"></span></a>
            <a  href="" @click.prevent="chooserealTimeStatusPage" @focus="addborder(1)" :class="1== index?'active':''"><img src="./images/02.png" alt=""><span class="iconfont icon-gou1" v-if="this.choosedTVboard.includes(1)"></span></a>
            <a  href="" @click.prevent="chooseorderManagementPage" @focus="addborder(2)" :class="2== index?'active':''"><img src="./images/03.png" alt="" ><span class="iconfont icon-gou1" v-if="this.choosedTVboard.includes(2)"></span></a>
            <a  href="" @click.prevent="chooseDetailsPage" @focus="addborder(3)" :class="3== index?'active':''"><img src="./images/04.png" alt=""><span class="iconfont icon-gou1" v-if="this.choosedTVboard.includes(3)"></span></a>
        </div>
        <div class="chooseUrl">
            <div class="url" v-if="showPoint">
                <label for="ip">请选择监控点：
                    <input type="text" v-model="URL" @focus="addstyle(0)" :class="{'active':activateFlag0}" @blur="removestyle(0)">
                </label>
                <select name="" id="" @change="getvalue" ref="watchPoint" @focus="addstyle(1)" :class="{'active':activateFlag1}" @blur="removestyle(1)">
                    <option value="0" hidden>监控点</option>
                    <option v-for="(item, index) in watchPoint" :key="item.GUID" :value="item.GUID">{{item.监控点名称}}</option>
                </select>
                <button @click="gotoChassisPage" @focus="addstyle(2)" :class="{'active':activateFlag2}" @blur="removestyle(2)">确定</button>
                <button @click="cancelTV(0)" @focus="addstyle(3)" :class="{'active':activateFlag3}" @blur="removestyle(3)">取消</button>
            </div>
            <div class="url" v-if="showWorkSpace">
                <label for="ip">请选择车间：
                    <input type="text" v-model="URL" @focus="addstyle(0)" :class="{'active':activateFlag0}" @blur="removestyle(0)">  
                </label>
                <select name="" id="" @change="getworkshop" ref="WorkShop" @focus="addstyle(1)" :class="{'active':activateFlag1}" @blur="removestyle(1)">
                    <option value="0" hidden>车间</option>
                    <option v-for="(item, index) in watchWorks" :key="item.GUID" :value="item.GUID">{{item.车间名称}}</option>
                </select>
                <button @click="gotorealTimeStatusPage" @focus="addstyle(2)" :class="{'active':activateFlag2}" @blur="removestyle(2)">确定</button>
                <button @click="cancelTV(1)" @focus="addstyle(3)" :class="{'active':activateFlag3}" @blur="removestyle(3)">取消</button>
            </div>
            <div class="url" v-if="showDD">
                <label for="ip">请选择地址：
                    <input type="text" v-model="URL" @focus="addstyle(1)" :class="{'active':activateFlag1}" @blur="removestyle(1)">  
                </label>
                <button @click="gotoorderManagementPage" @focus="addstyle(2)" :class="{'active':activateFlag2}" @blur="removestyle(2)">确定</button>
                <button @click="cancelTV(2)" @focus="addstyle(3)" :class="{'active':activateFlag3}" @blur="removestyle(3)">取消</button>
            </div>
            <div class="url" v-if="showEE">
                <label for="ip">请选择地址：
                    <input type="text" v-model="URL" @focus="addstyle(1)" :class="{'active':activateFlag1}" @blur="removestyle(1)">  
                </label>
                <button @click="gotoDetailsPage" @focus="addstyle(2)" :class="{'active':activateFlag2}" @blur="removestyle(2)">确定</button>
                <button @click="cancelTV(3)" @focus="addstyle(3)" :class="{'active':activateFlag3}" @blur="removestyle(3)">取消</button>
            </div>
        </div>
        <button class="gotoSwiperPages" @click.prevent="gotoSwiperPages" @focus="addstyle(4)" :class="{'active':activateFlag4}" @blur="removestyle(4)">确定</button>
    </div>
</template>
 
<script>
    export default {
        data(){
            return {
                showPoint:false,
                showWorkSpace: false,
                showDD: false,//今日排产任务单跟踪页
                showEE: false,//订单分布，生产进度跟踪页
                //监控点数组
                watchPoint:[],
                //监控车间数组
                watchWorks:[],
                //选择的监控点GUID
                WatchPointGUID:'0',
                //选择的车间GUID
                WorkShopGUID:'0',
                //输入的服务地址
                URL:'192.168.80.249',
                //ip合法判断
                IPflag:0,
                //获得焦点的图片
                index:0,
                //被选中的TV看板index数组
                choosedTVboard:[],
                //聚焦时的标签样式
                activateFlag0:false,
                activateFlag1:false,
                activateFlag2:false,
                activateFlag3:false,
                activateFlag4:false,
            }
        },
        created() {
            // console.log('dasdasdasdsa')
            if(localStorage.getItem('IP')) {
                this.URL = localStorage.getItem('IP')
                console.log(localStorage.getItem('IP'))
                localStorage["host"] = "http://"+this.URL+""
                this.$axios.defaults.baseURL = "http://"+this.URL+""
            }else {
                localStorage["host"] = "http://192.168.80.249"
                this.$axios.defaults.baseURL = "http://192.168.80.249"
            }
        },
        methods: {
            //电视机遥控器选中标签时加边框使更明显
            addstyle(data) {
                switch(data) {
                    case 0:
                        this.activateFlag0 = true
                        break;
                    case 1:
                        this.activateFlag1 = true
                        break;
                    case 2:
                        this.activateFlag2 = true
                        break;
                    case 3:
                        this.activateFlag3 = true
                        break;
                    case 4:
                        this.activateFlag4 = true
                        break;
                }
            },
            //移除样式
            removestyle(data) {
                this.activateFlag0 = false
                this.activateFlag1 = false
                this.activateFlag2 = false
                this.activateFlag3 = false
                this.activateFlag4 = false
            },
            //取消选中的TV看板
            cancelTV(i) {
                if(this.choosedTVboard.includes(i)) {
                    this.choosedTVboard.splice(this.choosedTVboard.indexOf(i),1)
                }
            },
            //使图片获得焦点
            addborder(index) {
                this.index = index
            },
            //正则匹配IP
            isValidIP(ip)   
            {   
                var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/   
                return reg.test(ip) 
            },
            //得到监控点
            getvalue() {
                this.WatchPointGUID = this.$refs.watchPoint.value
            },
            //得到车间
            getworkshop() {
                this.WorkShopGUID = this.$refs.WorkShop.value
            },
            //点击确定跳转到安灯页
            gotoChassisPage() {
                // console.log(this.$refs.watchPoint.value)
                    if(this.$refs.watchPoint.value != '0') {
                        // this.$router.push({name:'ChassisPage',params:{watchPoint: this.WatchPointGUID}})
                        this.choosedTVboard.push(0)
                    }else {
                        this.$message.error('请选择监控点！')
                    }
              
            },
            //点击确定跳转综合看板
            gotorealTimeStatusPage() {
                // console.log(this.$refs.WorkShop.value)
                
               
                    if(this.$refs.WorkShop.value != '0') {
                        // this.$router.push({name:'realTimeStatusPage',params:{WorkShopGUID: this.WorkShopGUID}})
                        this.choosedTVboard.push(1)
                    }else {
                        this.$message.error('请选择车间！')
                    }
                  
            },
            chooseorderManagementPage() {
                // this.$router.push({name:'orderManagementPage'})
                this.showPoint = false
                this.showWorkSpace = false
                this.showDD = true
                this.showEE = false
            },
            //跳转到orderManagementPage
            gotoorderManagementPage() {
                
                    // this.$router.push({name:'orderManagementPage'})
                    this.choosedTVboard.push(2)
                  
            },
            //选择服务地址和监控点
            chooseChassisPage() {
                // this.$router.push({name:'SwiperPages'})
                this.showPoint = true
                this.showWorkSpace = false
                this.showDD = false
                this.showEE = false
            },
            //选择服务地址和车间
            chooserealTimeStatusPage() {
                // this.$router.push({name:'realTimeStatusPage'})
                this.showWorkSpace = true
                this.showPoint = false
                this.showDD = false
                this.showEE = false
            },
            chooseDetailsPage() {
                // this.$router.push({name:'DetailsPage'})
                this.showPoint = false
                this.showWorkSpace = false
                this.showDD = false
                this.showEE = true
            },
            gotoDetailsPage() {
                
                    // this.$router.push({name:'DetailsPage'})   
                    this.choosedTVboard.push(3)                 
                  
            },
            //跳转到多TV轮播页
            gotoSwiperPages() {
                if(this.choosedTVboard.length != 0) {
                    this.$router.push({name:'SwiperPages',params:{watchPoint:this.WatchPointGUID,WorkShopGUID:this.WorkShopGUID,choosedTVboardList:JSON.stringify(this.choosedTVboard)}})
                    this.choosedTVboard = []
                    this.showPoint =false
                    this.showWorkSpace = false
                    this.showDD = false
                    this.showEE = false
                }else {
                    this.$message.error('请选择看板')
                }
            }
        },
        activated() {
            this.$refs.lj.focus()
            // console.log(this.isValidIP('192.168.145.13l'))
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
            //获取监控点
            this.$axios.post('/JLDPWebApi/Api/Andon/GetAndonMonitory').then(res => {
                this.$message.closeAll()
                this.watchPoint = res.data
                console.log(this.watchPoint)
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
            //获取车间
            this.$axios.post('/JLDPWebApi/Api/Bsworkshop/GetWorkshop').then(res => {
                this.$message.closeAll()
                this.watchWorks = JSON.parse(res.data)
                console.log(this.watchWorks)
            })
        },
        watch: {
            'URL'() {
                this.watchPoint = []
                this.watchWorks = []
                this.$axios.defaults.baseURL = 'http://'+this.URL
                localStorage.setItem('IP',this.URL)
                localStorage["host"] = "http://"+this.URL
                if(!this.isValidIP(this.URL)) {
                    this.$message.error('IP地址不合法')
                    // console.log(this.isValidIP(this.URL))
                }
                 //获取监控点
                this.$axios.post('/JLDPWebApi/Api/Andon/GetAndonMonitory').then(res => {
                    this.IPflag = 0
                    this.watchPoint = res.data
                    console.log(this.watchPoint)
                }).catch((error) => {
                    // console.log(error.message)
                    if(error.message && error.message == 'Network Error') {
                        this.$message.error('请求已超时')             
                    }else if (error.response && error.response.data == '网络已断开' && error.response.status == 502) {
                        this.$message.error('服务已断开')     
                    }
                    // if(this.watchPoint.length==0 && this.watchWorks.length==0){
                        // this.watchPoint = []
                        // this.watchWorks = []
                    // }
                     
                })
                //获取车间
                this.$axios.post('/JLDPWebApi/Api/Bsworkshop/GetWorkshop').then(res => {
                     this.IPflag = 0
                    this.watchWorks = JSON.parse(res.data)
                    console.log(this.watchWorks)
                })
            }
        }
    }
</script>
 
<style lang='stylus' scoped>
    .homeBigBox 
        position relative
        width 19.2rem
        height 10.8rem
        background url("../../assets/images/bg.png") no-repeat
        background-size cover
        .smallPictures
            width 100%
            display flex
            justify-content space-around
            padding-top 1.5rem
            a 
                display inline-block
                position relative
                img 
                    width 3.84rem
                    height 2.16rem
                span 
                    display inline-block
                    width .4rem 
                    height .4rem 
                    position absolute
                    top 0
                    left 0
                    border .02rem solid #eee
                    font-size .4rem
            .active
                border .03rem solid #0090ff
        .chooseUrl
            width 15rem
            margin 2rem auto
            .url
                color #fff
                padding-top 6px
                label 
                    margin-right 6px
                    input 
                        width 5rem
                        height .4rem
                    .active
                        border .03rem solid #0090ff
                select 
                    width 4rem
                    height .4rem
                .active
                    border .03rem solid #0090ff
                button
                    width 1.5rem
                .active
                    border .03rem solid #0090ff
        .gotoSwiperPages
            display inline-block
            width 5rem
            height 1rem
            background-color #15447c
            position absolute
            left 50%
            transform translateX(-50%)
            color #fff
            font-size .6rem
            text-align center
        .active
            border .03rem solid #0090ff
</style>
<style lang="stylus">
    .el-message--error
        width 6rem
        .el-message__content
            font-size .3rem
</style>
