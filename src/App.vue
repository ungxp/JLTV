<template>
  <div id="app">
    
      <router-view/>
  </div>
</template>

<script>
import * as server from "./server.js"
import { setInterval } from 'timers';
export default {
  name: 'App',
  mounted() {
    const that = this
    window.addEventListener('offline',  function() {
        that.$message.closeAll()
        that.$message({
            message: '与服务器连接中断，正在尝试重连中...',
            type: 'error',
            duration: 0
        })        
    })
    window.addEventListener('online',  function() {
        that.$message.closeAll()       
    })
    server.checkVersion()
    setInterval(() => {
      server.checkVersion()
    },60000)
  }
}
</script>

<style>

</style>
