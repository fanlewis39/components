<template>
  <div :class="['vcomp-carousel', `vcomp-carousel--${direction}`]">
    <div
      class="vcomp-carousel__wrapper"
      :style="{ height: height + 'px' }"
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
          :class="['vcomp-carousel__arrow', `vcomp-carousel__arrow--${arrowList[0]}`]"
          @click="handlePrevClick"
        >
          <Icon :name="`angle-${arrowList[0]}`"></Icon>
        </button>
      </transition>
      <transition
        v-if="arrowDisplay"
        name="vcomp-fade"
      >
        <button 
          type="button"
          v-show="arrow === 'always' || hover"
          :class="['vcomp-carousel__arrow', `vcomp-carousel__arrow--${arrowList[1]}`]"
          @click="handleNextClick"
        >
          <Icon :name="`angle-${arrowList[1]}`"></Icon>
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

export default {
  name: 'Carousel',
  components: {
    Icon
  },
  model: {
    prop: 'initialIndex',
    event: 'change'
  },
  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: {
      type: String,
      default: ''
    },
    arrow: {
      type: String,
      default: 'hover',
      validator(value) {
        return ['hover', 'always', 'never'].indexOf(value) !== -1
      }
    },
    dots: {
      type: String,
      default: 'inside',
      validator(value) {
        return ['inside', 'never'].indexOf(value) !== -1
      }
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
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      items: [],
      activeItem: this.initialIndex,
      hover: false,
      itemWidth: 0,
      itemHeight: 0,
      listWidth: 0,
      listHeight: 0,
      transition: true,
      timer: null,
      isAnimating: false,
      timeout: null
    }
  },
  computed: {
    arrowDisplay() {
      return this.arrow !== 'never'
    },
    arrowList() {
      return this.direction === 'horizontal' ? ['left', 'right'] : ['up', 'down']
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
    trackStyleBase() {
      const {
        direction,
        counts,
        transition
      } = this

      return {
        width: direction === 'horizontal' ? `${this.itemWidth * counts}px` : 'auto',
        height: direction === 'horizontal' ? 'auto' : `${this.itemHeight * counts}px`,
        transition: transition ? `transform 300ms` : 'none',
        display: direction === 'horizontal'? 'flex' : 'block'
      }
    },
    trackStyle() {
      return {
        ...this.trackStyleBase,
        ...{
          transform: `${this.translateDirection}(${
            -this.activeItem * this[`item${this.translateProp}`]
          }px)`
        }
      }
    },
    subTrackStyle() {
      return {
        ...this.trackStyleBase,
        ...{
          transform: `${this.translateDirection}(${
            -this.activeItem * this[`item${this.translateProp}`] +
            this[`item${this.translateProp}`] * this.counts
          }px)`,
        }
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
      if (value === this.counts) return

      this.$emit('change', value)
    },
    initialIndex(value) {
      this.activeItem = value
    }
  },
  mounted() {
    this.updateItems()

    this.$nextTick(() => {
      this.refresh()
      this.startTimer() 
    })
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
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
      if (this.isAnimating) return

      if (this.activeItem === 0) {
        if (this.loop) {
          this.activeItem = this.counts
          this.transition = false
        }

        this.timeout = setTimeout(() => {
          this.moveActiveItem(-1)
        }, 20)
      } else {
        this.moveActiveItem(-1)
      }
    },
    handleNextClick() {
      if ((this.activeItem === this.counts - 1 && !this.loop) || this.isAnimating) return

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
          break
        }
      }

      this.transition = true
      this.isAnimating = true
    },
    afterTransition() {
      if (this.activeItem === this.counts) {
        this.transition = false
        this.activeItem = 0
      }

      this.isAnimating = false
    },
    startTimer() {
      this.interval = this.interval < 3000 ? 3000 : this.interval

      if (this.autoPlay && !this.timer) {
        this.timer = setInterval(this.playSlides, this.interval)
      }
    },
    parseTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    playSlides() {
      if (this.loop) {
        if (this.activeItem === this.counts) {
          this.activeItem = 0
          this.transition = false
        } else {
          this.activeItem++
          this.transition = true
        }
      } else {
        if (this.activeItem < this.counts - 1) {
          this.activeItem++
          this.transition = true
        } else {
          this.parseTimer()
        }
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