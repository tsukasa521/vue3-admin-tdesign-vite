import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './styles/tailwind.css'

import 'tdesign-vue-next/es/style/index.css'

import './styles/shared.scss'
import './styles/theme/index.scss'

import TDesign from 'tdesign-vue-next'

console.debug('NODE_ENV', process.env.NODE_ENV)

const app = createApp(App)

const pinia = createPinia()

app.use(pinia)
  .use(router)
  .use(TDesign)
  .mount('#app')
