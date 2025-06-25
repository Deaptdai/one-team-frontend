import { createRouter, createWebHashHistory } from 'vue-router'

import Index from '../pages/Index.vue'
import TeamPage from '../pages/TeamPage.vue'
import UserPage from '../pages/UserPage.vue'
import UserUpdatePage from '../pages/UserUpdatePage.vue'
import UserTeamJoinPage from '../pages/UserTeamJoinPage.vue'
import UserTeamCreatePage from '../pages/UserTeamCreatePage.vue'
import SearchPage from '../pages/SearchPage.vue'
import UserEditPage from '../pages/UserEditPage.vue'
import SearchResultPage from '../pages/SearchResultPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import TeamAddPage from '../pages/TeamAddPage.vue'
import TeamUpdatePage from '../pages/TeamUpdatePage.vue'
import myAxios from '../plugins/myAxios'



const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/team',
        component: TeamPage
    },
    {
        path: '/user',
        component: UserPage
    },
    {
        path: '/search',
        component: SearchPage
    },
    {
        path: '/user/edit',
        component: UserEditPage
    },
    {
        path: '/user/list',
        component: SearchResultPage
    },
    {
        path: '/user/login',
        component: LoginPage,
        meta: { layout: 'none' }
    },
    {
        path: '/team/add',
        component: TeamAddPage
    },
    {
        path: '/team/update',
        component: TeamUpdatePage,
    },
    {
        path: '/user/update',
        component: UserUpdatePage,
    },
    {
        path: '/user/team/join',
        component: UserTeamJoinPage,
    },
    {
        path: '/user/team/create',
        component: UserTeamCreatePage,
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