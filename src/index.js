import Button from '../components/button'
import ButtonGroup from '../components/button-group'
import Carousel from '../components/carousel'
import CarouselItem from '../components/carousel-item'
import Checkbox from '../components/checkbox'
import CheckboxGroup from '../components/checkbox-group'
import Curtain from '../components/curtain'
import Dragbox from '../components/dragbox'
import Icon from '../components/icon'
import Input from '../components/input'
import Radio from '../components/radio'
import RadioGroup from '../components/radio-group'
import Select from '../components/select'

const components = [
  Button,
  ButtonGroup,
  Carousel,
  CarouselItem,
  Checkbox,
  CheckboxGroup,
  Curtain,
  Dragbox,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select
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
  Checkbox,
  CheckboxGroup,
  Curtain,
  Dragbox,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select
}

export default {
  version: '1.0.0',
  install,
  ...components
}
