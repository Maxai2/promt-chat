import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from "primevue/button"
import Input from "primevue/inputtext"

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.component('ButtonPrime', Button)
app.component('InputText', Input)

app.mount('#app')
