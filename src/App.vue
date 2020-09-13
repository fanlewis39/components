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
    <!-- <Curtain v-model="curtainActive"></Curtain> -->
    <button @click="handleClick">
      test
    </button>
    <DragBox
      v-model="curtainActive"
      box-class="drag-text"
      header="title"
    ></DragBox>
  </div>
</template>

<script>
/* eslint-disable */
import Curtain from './components/Curtain'
import DragBox from './components/DragBox'

export default {
  name: "App",
  components: {
    Curtain,
    DragBox
  },
  data() {
    return {
      curtainActive: false
    }
  },
  methods: {
    text() {
      console.log('111')
    },
    handleClick() {
      this.curtainActive = !this.curtainActive
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

button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
