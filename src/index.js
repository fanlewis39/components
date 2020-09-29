import Carousel from './packages/carousel'
import CarouselItem from './packages/carousel-item'
import Curtain from './packages/curtain'
import DragBox from './packages/drag-box'
import Icon from './packages/icon'

const components = [
  Carousel,
  CarouselItem,
  Curtain,
  DragBox,
  Icon
]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })}

if (window && window.Vue) {
  install(window.Vue)
}

export {
  Carousel,
  CarouselItem,
  Curtain,
  DragBox,
  Icon
}

export default {
  version: '1.0.0',
  install,
  ...components
}
