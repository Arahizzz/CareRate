import store from 'app/src/store/poll/index'
import { boot } from 'quasar/wrappers'
import { VueConstructor } from 'vue'

export default boot(({ Vue }: {Vue: VueConstructor}) => {
  Vue.prototype.$store = store
})
