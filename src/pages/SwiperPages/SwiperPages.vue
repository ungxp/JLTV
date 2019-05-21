<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <ChassisPage class="swiper-slide"></ChassisPage>
            <DetailsPage class="swiper-slide"></DetailsPage>
            <orderManagementPage class="swiper-slide"></orderManagementPage>
            <realTimeStatusPage class="swiper-slide"></realTimeStatusPage>
        </div>
    </div>
</template>
 
<script>
import Swiper from 'swiper'
import ChassisPage from '../ChassisPage/ChassisPage'
import DetailsPage from '../DetailsPage/DetailsPage'
import orderManagementPage from '../orderManagementPage/orderManagementPage'
import realTimeStatusPage from '../realTimeStatusPage/realTimeStatusPage'
    export default {
        components: {
            ChassisPage,
            DetailsPage,
            orderManagementPage,
            realTimeStatusPage
        },
        mounted() {
            new Swiper('.swiper-container',{
                loop: true,
                autoplay: true,
                delay: 15000,
                observer:true,
                observeParents:true
            })
        }
    }
</script>
 
<style lang='stylus' scoped>
    .swiper-container
        width 19.20rem
        height 10.8rem

</style>