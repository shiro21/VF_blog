import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/js/routes'
import store from '@/js/store'

const app = createApp(App)

app.config.globalProperties.$store = store

app.use(router).use(store).mount('#app')
