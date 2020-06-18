import store from 'app/src/store/poll/index'
import { boot } from 'quasar/wrappers'

export default boot(({ Vue }) => {
  Vue.prototype.$store = store
})
