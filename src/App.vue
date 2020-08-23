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
    <!-- <div id="test2">
      <Curtain
        direction="bottom"
      ></Curtain>
    </div> -->
    <DragBox
      box-class="drag-text"
      header="title"
      @on-close="text"
    ></DragBox>
  </div>
</template>

<script>
// import Curtain from './components/Curtain'
import DragBox from './components/DragBox'

export default {
  name: "App",
  components: {
    // Curtain,
    DragBox
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
