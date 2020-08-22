<template>
  <div id="app">
    <!-- <Curtain
      direction="right"
      curtain-class="curtain-test"
      style="z-index: 10"
    >
      <div>
        <div @click="text">
          <span>This is a box</span>
        </div>
      </div>
    </Curtain> -->
    <div id="test2">
      <Curtain
        direction="bottom"
      ></Curtain>
    </div>
    <Dragbox></Dragbox>
  </div>
</template>

<script>
import Curtain from './components/Curtain'
import Dragbox from './components/Dragbox'

export default {
  name: "App",
  components: {
    Curtain,
    Dragbox
  },
  methods: {
    text() {
      console.log('111')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
