import Button from './components/button'
import Carousel from './components/carousel'
import CarouselItem from './components/carousel-item'
import Curtain from './components/curtain'
import DragBox from './components/drag-box'
import Icon from './components/icon'

const components = [
  Button,
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
  Button,
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
