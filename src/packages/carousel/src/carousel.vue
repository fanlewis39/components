<template>
  <div :class="['vcomp-carousel', `vcomp-carousel--${direction}`]">
    <div
      class="vcomp-carousel__wrapper"
      @mouseenter.stop="handleMouseEnter"
      @mouseleave.stop="handleMouseLeave"
    >
      <transition
        v-if="arrowDisplay"
        name="vcomp-fade"
      >
        <button 
          type="button"
          v-show="arrow === 'always' || hover"
          class="vcomp-carousel__arrow vcomp-carousel__arrow--left"
          @click="handlePrevClick"
        >
          <Icon name="angle-left"></Icon>
        </button>
      </transition>
      <transition
        v-if="arrowDisplay"
        name="vcomp-fade"
      >
        <button 
          type="button"
          v-show="arrow === 'always' || hover"
          class="vcomp-carousel__arrow vcomp-carousel__arrow--right"
          @click="handleNextClick"
        >
          <Icon name="angle-right"></Icon>
        </button>
      </transition>
      <div
        :style="listStyle"
        class="vcomp-carousel__list"
      >
        <div
          :style="trackStyle"
          class="vcomp-carousel__track"
          @transitionend.self="afterTransition"
        >
          <slot></slot>
        </div>
        <div
          v-if="loop"
          :style="subTrackStyle"
          class="vcomp-carousel__track--sub"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CarouselItem from './carousel-item'
import Icon from '../../icon'

/* eslint-disable */
export default {
  name: 'Carousel',
  components: {
    Icon
  },
  props: {
    arrow: {
      type: String,
      default: 'hover',
      validator(value) {
        return ['hover', 'always', 'never'].indexOf(value) !== -1
      }
    },
    activeIndex: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      items: [],
      activeItem: 0,
      hover: false,
      itemWidth: 0,
      itemHeight: 0,
      listWidth: 0,
      listHeight: 0,
      transition: true,
      timer: null
    }
  },
  computed: {
    arrowDisplay() {
      return this.arrow !== 'never'
    },
    counts() {
      return this.loop ? this.items.length / 2 : this.items.length
    },
    translateDirection() {
      return this.direction === 'horizontal' ? 'translateX' : 'translateY'
    },
    translateProp() {
      return this.direction === 'horizontal' ? 'Width' : 'Height'
    },
    listStyle() {
      const { itemWidth, itemHeight } = this

      return {
        width: this.direction === 'horizontal' ? `${itemWidth}px` : 'auto',
        height: this.direction === 'horizontal' ? 'auto' : `${itemHeight}px`
      }
    },
    trackStyle() {
      const {
        itemWidth,
        itemHeight,
        counts,
        translateDirection,
        activeItem,
        translateProp,
        transition
      } = this

      return {
        width: this.direction === 'horizontal' ? `${itemWidth * counts}px` : 'auto',
        height: this.direction === 'horizontal' ? 'auto' : `${itemHeight * counts}px`,
        transform: `${translateDirection}(${-activeItem * this[`item${translateProp}`]}px)`,
        transition: transition ? `transform 300ms` : 'none',
        display: this.direction === 'horizontal'? 'flex' : 'block'
      }
    },
    subTrackStyle() {
      const {
        itemWidth,
        itemHeight,
        counts,
        translateDirection,
        activeItem,
        translateProp,
        transition
      } = this

      return {
        width: this.direction === 'horizontal' ? `${itemWidth * counts}px` : 'auto',
        height: this.direction === 'horizontal' ? 'auto' : `${itemHeight * counts}px`,
        transform: `${translateDirection}(${-activeItem * this[`item${translateProp}`] + this[`item${translateProp}`] * counts}px)`,
        transition: transition ? `transform 300ms` : 'none',
        display: this.direction === 'horizontal'? 'flex' : 'block'
      }
    }
  },
  watch: {
    items() {
      this.itemWidth = this.items[0].$el.offsetWidth
      this.itemHeight = this.items[0].$el.offsetHeigth
    },
    autoPlay(value) {
      value ? this.startTimer() : this.parseTimer()
    },
    activeItem(value) {
      this.$emit('change', value)
    }
  },
  mounted() {
    this.updateItems()

    this.$nextTick(() => {
      this.refresh()
      this.startTimer()
    })
  },
  methods: {
    handleMouseEnter() {
      this.hover = true
      this.parseTimer()
    },
    handleMouseLeave() {
      this.hover = false
      this.startTimer()
    },
    handlePrevClick() {
      if (this.activeItem === 0) {
        this.activeItem = this.counts
        this.transition = false

        setTimeout(() => {
          this.moveActiveItem(-1)
        }, 20)
      } else {
        this.moveActiveItem(-1)
      }
    },
    handleNextClick() {
      this.moveActiveItem(1)
    },
    moveActiveItem(value) {
      switch(value) {
        case -1: {
          this.activeItem--
          break
        }
        case 1: {
          this.activeItem++
        }
      }

      this.transition = true
    },
    afterTransition() {
      if (this.activeItem === this.counts) {
        this.transition = false
        this.activeItem = 0
      }
    },
    startTimer() {
      if (this.autoPlay && !this.timer && this.speed >= 3000) {
        this.timer = setInterval(this.playSlides, this.speed)
      }
    },
    parseTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    playSlides() {
      if (this.activeItem === this.counts) {
        this.transition = false
        this.activeItem = 0
      } else {
        this.activeItem++
        this.transition = true
      }
    },
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === CarouselItem.name)
    },
    updateListSize() {
      if (this.direction === 'horizontal') {
        this.listWidth = this.$el.offsetWidth
      } else {
        this.listHeight = this.items[0].$el.offsetHeight
      }
    },
    updateItemSize() {
      let width = 'auto'
      let height = 'auto'

      if (this.direction === 'horizontal') {
        width = this.listWidth
      } else {
        height = this.listHeight
      }

      this.itemWidth = width
      this.itemHeight = height
    },
    refresh() {
      this.updateListSize()
      this.updateItemSize()
    }
  }
}
</script>