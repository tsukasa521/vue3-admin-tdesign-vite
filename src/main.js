import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import TDesign from 'tdesign-vue-next'

console.debug('NODE_ENV', process.env.NODE_ENV)

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

app.use(TDesign)

app.mount('#app')
