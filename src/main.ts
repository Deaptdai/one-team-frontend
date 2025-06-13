import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import { Toast } from 'vant';

const app = createApp(App)
app.use(router)
app.use(Toast);
app.mount('#app')

