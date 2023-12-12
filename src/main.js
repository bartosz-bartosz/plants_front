import './assets/main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircleCheck, faAngleLeft,
    faAngleRight, faDroplet, faStopwatch,
    faCalendarDay, faDna, faAddressCard} from '@fortawesome/free-solid-svg-icons'

import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/index";
import 'dotenv'

import {createPinia} from "pinia";

library.add(faCircleCheck, faAngleLeft, faAngleRight,
    faDroplet, faStopwatch, faCalendarDay, faDna, faAddressCard)

const pinia = createPinia()

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(pinia)
app.mount('#app')