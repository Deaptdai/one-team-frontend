import { createRouter, createWebHashHistory } from 'vue-router'

import IndexVue from '../pages/Index.vue'
import TeamVue from '../pages/TeamPage.vue'
import UserVue from '../pages/UserPage.vue'
import SearchVue from '../pages/SearchPage.vue'
import UserEditVue from '../pages/UserEditPage.vue'
import SearchResultVue from '../pages/SearchResultPage.vue'
import LoginVue from '../pages/LoginPage.vue'
import myAxios from '../plugins/myAxios'
import TeamAddPage from '../pages/TeamAddPage.vue'

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
    {
        path: '/user/list',
        component: SearchResultVue
    },
    {
        path: '/user/login',
        component: LoginVue,
        meta: { layout: 'none' }
    }, 
    {
        path: '/team/add',
        component: TeamAddPage
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// 路由守卫：未登录跳转到登录页
router.beforeEach(async (to, from, next) => {
    // 不需要登录的页面
    const whiteList = ['/user/login']
    if (whiteList.includes(to.path)) {
        return next()
    }
    // 检查登录状态
    const res = await myAxios.get('/user/current');
    if (res.data.code !== 200) { 
        return next('/user/login')
    }
    next()
})

export default router