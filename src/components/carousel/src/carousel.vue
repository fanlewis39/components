<template>
  <div
    class="vcomp-carousel"
    :class="`vcomp-carousel--${direction}`"
  >
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
          class="vcomp-carousel__arrow"
          v-show="arrow === 'always' || hover"
          :class="`vcomp-carousel__arrow--${arrowList[0]}`"
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
          class="vcomp-carousel__arrow"
          v-show="arrow === 'always' || hover"
          :class="`vcomp-carousel__arrow--${arrowList[1]}`"
          @click="handleNextClick"
        >
          <Icon :name="`angle-${arrowList[1]}`"></Icon>
        </button>
      </transition>
      <div
        class="vcomp-carousel__list"
        :style="listStyle"
      >
        <div
          class="vcomp-carousel__track"
          :style="trackStyle"
          @transitionend.self="afterTransition"
        >
          <slot></slot>
        </div>
        <div
          v-if="loop"
          class="vcomp-carousel__track--sub"
          :style="subTrackStyle"
        >
          <slot></slot>
        </div>
      </div>
    </div>
    <ul
      class="vcomp-carousel__dots"
      :class="`vcomp-carousel__dots--${direction}`"
    >
      <li
        v-for="index in counts"
        :key="index"
      >
        <div
          class="vcomp-carousel__dot"
          :class="[
            `vcomp-carousel__dot--${direction}`,
            { 'active': index - 1 === activeIndex }]"
          @click="handleDotClick(index - 1)"
          @mouseenter="handleDotHover(index - 1)"
        >
        </div>
      </li>
    </ul>
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
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) !== -1
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
      activeItem: this.initialIndex, /* 控制当前显示的item */
      activeIndex: +this.initialIndex, /* 当前显示item的索引 */
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
      const { direction, counts, transition } = this

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
    activeIndex(value) {
      this.$emit('change', value)
    },
    initialIndex(value) {
      this.activeItem = value
      this.activeIndex = value
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
    setActiveItem(index) {
      this.activeItem = index
      this.activeIndex = index

      this.transition = true
      this.isAnimating = true
    },
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
          this.moveActiveItem(0)
        }, 0)
      } else {
        this.moveActiveItem(0)
      }

      this.changeActiveIndex(0)
    },
    handleNextClick() {
      if ((this.activeItem === this.counts - 1 && !this.loop) || this.isAnimating)
        return

      this.moveActiveItem(1)
      this.changeActiveIndex(1)
    },
    handleDotClick(value) {
      if (this.trigger === 'click') {
        this.setActiveItem(value)
      }
    },
    handleDotHover(value) {
      if (this.trigger === 'hover') {
        this.setActiveItem(value)
      }
    },
    moveActiveItem(value) {
      value ? this.activeItem++ : this.activeItem--

      this.transition = true
      this.isAnimating = true
    },
    changeActiveIndex(value) {
      const { counts } = this

      if (value) {
        if (this.activeIndex === counts - 1) {
          this.activeIndex = 0
        } else {
          this.activeIndex++
        }
      } else {
        if (this.activeIndex === 0) {
          this.activeIndex = counts - 1
        } else {
          this.activeIndex--
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
      const { counts } = this

      if (this.loop) {
        if (this.activeItem === counts) {
          this.activeItem = 0
          this.transition = false
        } else {
          this.activeItem++
          this.transition = true
        }

        this.activeIndex === counts - 1 ? this.activeIndex = 0 : this.activeIndex++
      } else {
        if (this.activeItem < counts - 1) {
          this.activeItem++
          this.activeIndex++
          this.transition = true
        } else {
          this.parseTimer()
        }
      }
    },
    updateItems() {
      this.items = this.$children.filter(
        child => child.$options.name === CarouselItem.name
      )
    },
    updateListSize() {
      const { direction } = this

      this.listWidth = direction === 'horizontal' ? this.$el.offsetWidth : 'auto'
      this.listHeight = direction === 'horizontal'
        ? this.items[0].$el.offsetHeight
        : 'auto'
    },
    updateItemSize() {
      this.itemWidth = this.direction === 'horizontal' ? this.listWidth : 'auto'
      this.itemHeight = this.direction === 'horizontal' ? 'auto' : this.listHeight
    },
    refresh() {
      this.updateListSize()
      this.updateItemSize()
    }
  }
}
</script>