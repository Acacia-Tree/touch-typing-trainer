import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

createApp(App).use(VueAxios, axios).mount('#app');
