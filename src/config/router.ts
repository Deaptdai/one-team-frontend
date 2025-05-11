import { createRouter, createWebHashHistory } from 'vue-router'

import IndexVue from '../pages/Index.vue'
import TeamVue from '../pages/TeamPage.vue'
import UserVue from '../pages/UserPage.vue'
import SearchVue from '../pages/SearchPage.vue'
import UserEditVue from '../pages/UserEditPage.vue'

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
    },
    {
        path: '/user/edit',
        component: UserEditVue
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router