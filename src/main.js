import './assets/main.css'

import { createApp } from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from "@/router/index";
import store from './store';
import 'dotenv'

const app = createApp(App)

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BASEURL;

app.use(router)
app.use(store);
app.mount('#app')