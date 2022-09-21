import App from '../App'
import Router from 'vue-router';

import home from '@/page/home/home';
// const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

// Vue.use(Router);

export default [
    {
        path: '/',
        component: App, //顶层路由，对应index.html
        children: [
            {
                path: '',
                redirect: '/home'
            },
            {
                path: '/home',
                component: home
            }
        ]
    }
]