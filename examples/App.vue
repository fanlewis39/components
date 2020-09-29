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
    <!-- <Curtain v-model="active"></Curtain> -->
    <!-- <button @click="handleClick">
      test
    </button> -->
    <!-- <DragBox
      v-model="active"
      :box-class="['drag-text', 'a']"
      title="title"
    >
      aaa
    </DragBox> -->
    <Carousel>
      <CarouselItem>
        <div class="carousel-demo">
          1
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="carousel-demo">
          2
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="carousel-demo">
          3
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: "App",
  watch: {
    active(value) {
      console.log(value)
    }
  },
  data() {
    return {
      active: true
    }
  },
  methods: {
    text() {
      console.log('111')
    },
    handleClick() {
      this.active = !this.active
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

.drag-text {
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  top: 0;
  left: 0;
}

.vcomp-carousel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.carousel-demo {
  width: 800px;
  height: 200px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
}
</style>
