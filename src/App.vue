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
    <Curtain
      direction="bottom"
    ></Curtain>
    <!-- <DragBox
      box-class="drag-text"
      header="title"
      @on-close="text"
    ></DragBox> -->
  </div>
</template>

<script>
import Curtain from './components/Curtain'
// import DragBox from './components/DragBox'

export default {
  name: "App",
  components: {
    Curtain,
    // DragBox
  },
  methods: {
    text() {
      console.log('111')
    }
  }
}
</script>

<style>

html, body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
