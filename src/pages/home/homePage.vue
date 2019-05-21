<template>
    <div class="homeBigBox">
        <div class="smallPictures">
            <img src="./images/01.png" alt="" @click="chooseChassisPage">
            <img src="./images/02.png" alt="" @click="chooserealTimeStatusPage">
            <img src="./images/03.png" alt="" @click="chooseorderManagementPage">
            <img src="./images/04.png" alt="" @click="chooseDetailsPage">
        </div>
        <div class="chooseUrl">
            <div class="url" v-if="showPoint">
                <label for="ip">请选择监控点：
                    <input type="text" v-model="URL">
                </label>
                <select name="" id="" @change="getvalue" ref="watchPoint">
                    <option value="0" hidden>监控点</option>
                    <option v-for="(item, index) in watchPoint" :key="item.GUID" :value="item.GUID">{{item.监控点名称}}</option>
                </select>
                <button @click="gotoChassisPage">确定</button>
            </div>
            <div class="url" v-if="showWorkSpace">
                <label for="ip">请选择车间：
                    <input type="text" v-model="URL">  
                </label>
                <select name="" id="" @change="getworkshop" ref="WorkShop">
                    <option value="0" hidden>车间</option>
                    <option v-for="(item, index) in watchWorks" :key="item.GUID" :value="item.GUID">{{item.车间名称}}</option>
                </select>
                <button @click="gotorealTimeStatusPage">确定</button>
            </div>
            <div class="url" v-if="showDD">
                <label for="ip">请选择地址：
                    <input type="text" v-model="URL">  
                </label>
                <button @click="gotoorderManagementPage">确定</button>
            </div>
            <div class="url" v-if="showEE">
                <label for="ip">请选择地址：
                    <input type="text" v-model="URL">  
                </label>
                <button @click="gotoDetailsPage">确定</button>
            </div>
        </div>
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
                WatchPointGUID:'',
                //选择的车间GUID
                WorkShopGUID:'',
                //输入的服务地址
                URL:'http://192.168.100.17'
            }
        },
        methods: {
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
                this.$router.push({name:'ChassisPage',params:{watchPoint: this.WatchPointGUID}})
            },
            //点击确定跳转综合看板
            gotorealTimeStatusPage() {
                this.$router.push({name:'realTimeStatusPage',params:{WorkShopGUID: this.WorkShopGUID}})
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
                this.$router.push({name:'orderManagementPage'})
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
                this.$router.push({name:'DetailsPage'})
            }
        },
        // created() {
        //     this.URL = this.$axios.defaults.baseURL
        // },
        activated() {
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
                this.watchPoint = res.data
                console.log(this.watchPoint)
            })
            //获取车间
            this.$axios.post('/JLDPWebApi/Api/Bsworkshop/GetWorkshop').then(res => {
                this.watchWorks = JSON.parse(res.data)
                console.log(this.watchWorks)
            })
        },
        watch: {
            'URL'() {
                this.$axios.defaults.baseURL = this.URL
                console.log(this.$axios.defaults.baseURL)
                 //获取监控点
                this.$axios.post('/JLDPWebApi/Api/Andon/GetAndonMonitory').then(res => {
                    this.watchPoint = res.data
                    console.log(this.watchPoint)
                })
                //获取车间
                this.$axios.post('/JLDPWebApi/Api/Bsworkshop/GetWorkshop').then(res => {
                    this.watchWorks = JSON.parse(res.data)
                    console.log(this.watchWorks)
                })
            }
        }
    }
</script>
 
<style lang='stylus' scoped>
    .homeBigBox 
        width 19.2rem
        height 10.8rem
        background url("../../assets/images/bg.png") no-repeat
        background-size cover
        .smallPictures
            width 100%
            display flex
            justify-content space-around
            padding-top 1.5rem
            img 
                width 3.84rem
                height 2.16rem
        .chooseUrl
            width 13rem
            margin 2rem auto
            .url
                color #fff
                padding-top 6px
                label 
                    margin-right 6px
                    input 
                        width 5rem
                        height .4rem
                select 
                    width 4rem
                    height .4rem
                button
                    width 1.5rem
   
</style>
<style lang="stylus">
    .el-message--error
        width 6rem
        .el-message__content
            font-size .3rem
</style>
