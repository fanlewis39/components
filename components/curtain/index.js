import Curtain from './src/curtain'

Curtain.install = Vue => {
  Vue.component(Curtain.name, Curtain)
}

export default Curtain
