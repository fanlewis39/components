<!--eslint-disable -->
<template>
  <div id="app">
    <!-- <Select v-model="value"></Select> -->
    <v-input
      placeholder="请输入内容"
      v-model="value"
      clearable
      prefix-icon="search"
      size="small"
      style="margin-left: 5px"
    >
    </v-input>
    <!-- <v-input
      placeholder="请输入内容"
      v-model="value"
      style="margin-left: 5px"
    >
      <Icon slot="prefix" name="search" color="red"></Icon>
    </v-input> -->
    <!-- <v-checkbox
      v-model="checkbox1"
      border
      :true-value="111"
      :false-value="222"
    >
      多选框1
    </v-checkbox>
    <v-checkbox
      v-model="checkbox2"
      border
    >
      多选框2
    </v-checkbox> -->
    <!-- <v-checkbox-group v-model="checkList" disabled>
      <v-checkbox
        label="多选框1"
        v-button
        size="small"
      ></v-checkbox>
      <v-checkbox
        label="多选框2"
        v-button
        size="small"
      ></v-checkbox>
      <v-checkbox
        label="多选框3"
        v-button
        size="small"
      ></v-checkbox>
    </v-checkbox-group> -->
    <!-- <v-radio-group
      disabled
      v-model="radio"
      size="small"
    >
      <v-radio
        v-for="item in radioItems"
        :key="item"
        :label="item"
        v-button
      >
        {{ item }}
      </v-radio>
    </v-radio-group> -->
    <!-- <v-radio
      label="选项1"
      v-model="radio"
      size="mini"
      border
    >
      选项1
    </v-radio>
    <v-radio label="选项2" v-model="radio">
      选项2
    </v-radio> -->
    <!-- <v-radio label='1' v-model="radio">
      选项1
    </v-radio> -->
    <!-- <v-checkbox v-model="checked">
      aa
    </v-checkbox>
    <v-checkbox :label="11"></v-checkbox> -->
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
    <!-- <v-button @click="handleClick">
      test
    </v-button> -->
    <!-- <v-dragbox
      v-model="active"
      :box-class="['drag-text', 'a']"
      title="title"
    >
      aaa
    </v-dragbox> -->
    <!-- <v-carousel
      :auto-play="false"
      :loop="true"
      height="200"
      @change="handleChange"
      @select="handleSelect"
    >
      <v-carousel-item item-class="aa">
        <div class="carousel-demo">
          1
        </div>
      </v-carousel-item>
      <v-carousel-item item-class="aa">
        <div class="carousel-demo">
          2
        </div>
      </v-carousel-item>
      <v-carousel-item item-class="aa">
        <div class="carousel-demo">
          3
        </div>
      </v-carousel-item>
    </v-carousel> -->
    <!-- <v-button-group>
      <v-button
        plain
        size="mini"
        icon="arrow-left"
      >
      </v-button>
      <v-button
        size="mini"
        icon="arrow-left"
      >
      </v-button>
      <v-button
        type="primary"
        size="mini"
        icon="arrow-right"
      >
      </v-button>
      <v-button
        type="info"
        size="mini"
        icon="arrow-right"
      >
      </v-button>
    </v-button-group>
    <v-button-group style="margin-left: 10px">
      <v-button
        plain
        size="mini"
        icon="arrow-left"
        disabled
      >
      </v-button>
    </v-button-group> -->
    <!-- <v-button
      disabled
      type="text"
      size="mini"
      icon="arrow-left"
    >
    </v-button> -->
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
      index: 0,
      checked: true,
      radio: '选项1',
      radioItems: ['选项1', '选项2', '选项3'],
      checkbox1: 111,
      checkbox2: true,
      checkList: ['多选框1', '多选框2'],
      value: ''
    }
  },
  methods: {
    text() {
      console.log('111')
    },
    handleClick() {
      // this.active = !this.active
    },
    handleChange(val) {
      // console.log(val)
    },
    handleSelect(val) {
      console.log(val)
    }
  }
}
</script>

<style>

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
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
