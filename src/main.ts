import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import i18n from './utils/i18n'

const app = createApp(App).use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(ConfirmationService)
app.use(ToastService)
app.directive('tooltip', Tooltip)

app.mount('#app')
