import { VueElement } from '@vue/runtime-dom'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/pages/home.vue'
import Test from '/src/pages/test.vue'
import Login from '/src/pages/login.vue'
import Preference from '/src/pages/preference.vue'
import Settings from '/src/pages/settings.vue'
import Trade from '/src/pages/trade.vue'


const routes = [

    {
        path: '/',
        name: 'home',
        component: Home

    },

    {
        path: '/test',
        name: 'test',
        component: Test
    },

    {
        path: '/login',
        name: 'login',
        component: Login

    },

    {
        path: '/preference',
        name: 'preference',
        component: Preference

    },

    {
        path: '/settings',
        name: 'settings',
        component: Settings

    },

    {
        path: '/trade',
        name: 'trade',
        component: Trade
    }

]

const router = createRouter({

    history: createWebHistory(),

    routes,

})

export default router