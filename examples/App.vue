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
    <DragBox
      v-model="active"
      :box-class="['drag-text', 'a']"
      title="title"
    >
      aaa
    </DragBox>
    <!-- <Carousel
      :auto-play="false"
      :loop="true"
      height="200"
      @change="handleChange"
      @select="handleSelect"
    >
      <CarouselItem item-class="aa">
        <div class="carousel-demo">
          1
        </div>
      </CarouselItem>
      <CarouselItem item-class="aa">
        <div class="carousel-demo">
          2
        </div>
      </CarouselItem>
      <CarouselItem item-class="aa">
        <div class="carousel-demo">
          3
        </div>
      </CarouselItem>
      <CarouselItem item-class="aa">
        <div class="carousel-demo">
          4
        </div>
      </CarouselItem>
    </Carousel> -->
    <Button
      type="danger"
      plain
      @click="handleClick"
    >
      默认按钮
    </Button>
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
      active: false,
      index: 0
    }
  },
  methods: {
    text() {
      console.log('111')
    },
    handleClick() {
      this.active = !this.active
    },
    handleChange(val) {
      // console.log(val)
    },
    handleSelect(val) {
      // console.log(val)
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

.carousel-image-demo {
  width: 800px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel-image-demo > img {
  width: 100%;
  height: 100%;
}
</style>
