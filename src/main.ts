const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class extends _ResizeObserver {
  // @ts-ignore
  constructor(cb) {
    super(entries => {
      requestAnimationFrame(() => {
        cb(entries);
      });
    });
  }
}
import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
// svgs
import 'virtual:svg-icons-register'

// mock数据
// import '@/mock/'

if (import.meta.env.PROD) {
  // console.log = console.error = console.warn = () => { }
}

const app = createApp(App)

app.use(createPinia())
  .use(ElementPlus, { locale: zhCn })
  .use(router)

app.mount('#app')
