<template>
    <div class="homeBigBox">
        <div class="smallPictures">
            <img src="./images/01.png" alt="" @click="chooseChassisPage">
            <img src="./images/02.png" alt="" @click="chooserealTimeStatusPage">
            <img src="./images/03.png" alt="" @click="gotoorderManagementPage">
            <img src="./images/04.png" alt="" @click="gotoDetailsPage">
        </div>
        <div class="chooseUrl">
            <div class="url" v-if="showPoint">
                <label for="ip">请输入服务网址：
                    <input name='ip' type="text" v-model="URL">
                </label>
                <select name="" id="" @change="getvalue" ref="watchPoint">
                    <option value="0">请选择监控点</option>
                    <option v-for="(item, index) in watchPoint" :key="item.GUID" :value="item.GUID">{{item.监控点名称}}</option>
                </select>
                <button @click="gotoChassisPage">确定</button>
            </div>
            <div class="url" v-if="showWorkSpace">
                <label for="ip">请输入服务网址：
                    <input name='ip' type="text" v-model="URL">
                </label>
                <select name="" id="" @change="getworkshop" ref="WorkShop">
                    <option value="">请选择车间</option>
                    <option v-for="(item, index) in watchWorks" :key="item.GUID" :value="item.GUID">{{item.车间名称}}</option>
                </select>
                <button @click="gotorealTimeStatusPage">确定</button>
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
                //监控点数组
                watchPoint:[],
                //监控车间数组
                watchWorks:[],
                //选择的监控点GUID
                WatchPointGUID:'',
                //选择的车间GUID
                WorkShopGUID:'',
                //输入的服务地址
                URL:''
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
                this.$router.push({name:'ChassisPage',params:{url: this.URL, watchPoint: this.WatchPointGUID}})
            },
            //点击确定跳转综合看板
            gotorealTimeStatusPage() {
                this.$router.push({name:'realTimeStatusPage',params:{url: this.URL, WorkShopGUID: this.WorkShopGUID}})
            },
            gotoorderManagementPage() {
                this.$router.push({name:'orderManagementPage'})
            },
            //选择服务地址和监控点
            chooseChassisPage() {
                // this.$router.push({name:'ChassisPage'})
                this.showPoint = true
                this.showWorkSpace = false
            },
            //选择服务地址和车间
            chooserealTimeStatusPage() {
                // this.$router.push({name:'realTimeStatusPage'})
                this.showWorkSpace = true
                this.showPoint = false
            },
            gotoDetailsPage() {
                this.$router.push({name:'DetailsPage'})
                
            }
        },
        created() {
            this.URL = this.$axios.defaults.baseURL
        },
        mounted() {
            //获取监控点
            this.$axios.post('/Andon/GetAndonMonitory').then(res => {
                this.watchPoint = res.data
                console.log(this.watchPoint)
            })
            //获取车间
            this.$axios.post('/Bsworkshop/GetWorkshop').then(res => {
                this.watchWorks = JSON.parse(res.data)
                console.log(this.watchWorks)
            })
        }
    }
</script>
 
<style lang='stylus' scoped>
    .homeBigBox 
        width 19.2rem
        height 10.8rem
        background url('../../assets/images/bg.png') no-repeat
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
            width 12rem
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
                    width 2rem
                    height .4rem
                button
                    width 1.5rem
</style>