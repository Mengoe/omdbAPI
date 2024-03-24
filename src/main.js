import {createApp} from 'vue'
import App from './App'
import router from './routes' // index.js는 생략가능. default로 사용되는 js 파일
import store from './store/index.js'

createApp(App)
    .use(router) // 플러그인 연결
    .use(store)
    .mount('#app')