import { createRouter, createWebHashHistory } from "vue-router";
import Home from './Home'
import About from './About'
import Movie from "./Movie";

export default createRouter({
    // Hash, History
    // https://google.com/#/search
    history: createWebHashHistory(),
    // pages
    // https://google.com 여기 다음에 오는 경로(path)에 대해서, 어떤 vue js의 component를 연결해서 사용할거냐?
    // page 에 연결할, 여러 컴포넌트를 만들어 놓으면 됨
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/about',
            component: About
        },
        {
            path: '/movie',
            component : Movie
        }
    ]
})