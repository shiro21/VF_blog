import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/js/routes'

const app = createApp(App)

app.use(router).mount('#app')
