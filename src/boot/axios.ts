import axios, { AxiosInstance } from 'axios'
import { boot } from 'quasar/wrappers'
import { VueConstructor } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }
}

export default boot(({ Vue }: {Vue: VueConstructor }) => {
  Vue.prototype.$axios = axios
})
