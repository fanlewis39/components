import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

Icon.name = 'Icon'

Icon.install = Vue => {
  Vue.component(Icon.name, Icon)
}

export default Icon
