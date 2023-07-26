import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router/index";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import 'dotenv'
import store from "@/store";

createApp(App)
    .use(router)
    .component("font-awesome-icon", FontAwesomeIcon)
    .mount("#app")
