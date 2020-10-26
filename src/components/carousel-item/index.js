import CarouselItem from '../carousel/src/carousel-item.vue'

CarouselItem.install = Vue => {
  Vue.component(CarouselItem.name, CarouselItem)
}

export default CarouselItem
