import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './styles/tailwind.css'
import './styles/shared.scss'
import './styles/theme/index.scss'

import './hooks/router'
import './icons'

console.debug('NODE_ENV', process.env.NODE_ENV)

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .mount('#app')
