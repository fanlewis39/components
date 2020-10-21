import carouselItem from '../carousel/src/carousel-item.vue'

carouselItem.install = Vue => {
  Vue.component(carouselItem.name, carouselItem)
}

export default carouselItem
