<template>
  <div class="vcomp-carousel">
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
          :style="trackStyle"
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
    size: {
      type: Number,
      default: 1
    },
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
    speed: {
      type: Number,
      default: 300
    },
    loop: {
      type: Boolean,
      default: true
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
      listHeight: 0
    }
  },
  computed: {
    arrowDisplay() {
      return this.arrow !== 'never' && this.direction !== 'vertical'
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
      const { itemWidth, itemHeight, size } = this

      return {
        width: `${itemWidth * size}px`,
        height: `auto`
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
        speed
      } = this

      return {
        width: `${itemWidth * counts}px`,
        height: 'auto',
        transform: `${translateDirection}(${-activeItem * this[`item${translateProp}`]}px)`,
        transition: `transform ${speed}ms`
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
        speed
      } = this

      return {
        width: `${itemWidth * counts}px`,
        height: 'auto',
        transform: `${translateDirection}(
            ${-activeItem * this[`item${translateProp}`] + itemWidth * counts}
          px)`,
        transition: `transform ${speed}ms`
      }
    }
  },
  watch: {
    items() {
      this.itemWidth = this.items[0].$el.offsetWidth
    }
  },
  mounted() {
    this.updateItems()
  },
  methods: {
    handleMouseEnter() {
      this.hover = true
    },
    handleMouseLeave() {
      this.hover = false
    },
    handlePrevClick() {
      this.activeItem--
    },
    handleNextClick() {
      this.activeItem++
    },
    afterTransition() {},
    updateItems() {
      this.items = this.$children.filter(child => child.$options.name === CarouselItem.name)
    },
    updateListSize() {
      if (this.direction === 'horizontal') {
        
        this.listWidth = this.$el.offsetWidth
      } else {
        this.listWidth = 'auto'
      }
    },
    updateItemSize() {
      let width
      // let height

      if (this.direction === 'horizontal') {
        width = this.listWidth / this.size
      }

      this.itemWidth = width
    },
    refresh() {
      this.updateListSize()
      this.updateItemSize()
    }
  }
}
</script>