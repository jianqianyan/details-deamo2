import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios';
const Axios = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 2000
})
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js';

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
// createApp(App).use(router).mount('#app')    
const app = createApp(App);
app.use(VMdPreview);
app.provide('$axios' , Axios);
app.use(router).mount('#app');