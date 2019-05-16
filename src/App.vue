<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import * as server from "./server.js"
import { setInterval } from 'timers';
export default {
  name: 'App',
  mounted() {
    server.checkVersion()
    setInterval(() => {
      server.checkVersion()
    },60000)
  }
}
</script>

<style>

</style>
