import { createRouter, createWebHashHistory } from 'vue-router'

import IndexVue from '../pages/Index.vue'
import TeamVue from '../pages/Team.vue'
import UserVue from '../pages/User.vue'
import SearchVue from '../pages/Search.vue'

const routes = [
    {
        path: '/',
        component: IndexVue
    },
    {
        path: '/team',
        component: TeamVue
    },
    {
        path: '/user',
        component: UserVue
    },
    {
        path: '/search',
        component: SearchVue
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router