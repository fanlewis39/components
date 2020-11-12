import Button from '../components/button'
import ButtonGroup from '../components/button-group'
import Carousel from '../components/carousel'
import CarouselItem from '../components/carousel-item'
import CheckBox from '../components/checkbox'
import Curtain from '../components/curtain'
import DragBox from '../components/drag-box'
import Icon from '../components/icon'
import Radio from '../components/radio'

const components = [
  Button,
  ButtonGroup,
  Carousel,
  CarouselItem,
  CheckBox,
  Curtain,
  DragBox,
  Icon,
  Radio
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
  ButtonGroup,
  Carousel,
  CarouselItem,
  CheckBox,
  Curtain,
  DragBox,
  Icon,
  Radio
}

export default {
  version: '1.0.0',
  install,
  ...components
}
