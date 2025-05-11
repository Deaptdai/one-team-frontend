<template>
    <van-cell title="昵称" is-link :value="user.username"
        @click="toEdit('username', '昵称', user.username)" />
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
        <img style=" height: 50px;" :src=user.avatarUrl />
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别', user.gender)" />
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone', '电话', user.phone)" />
    <van-cell title=" 邮箱" :value="user.email" @click="toEdit('email', '邮箱', user.email)" />
    <van-cell title="用户编号" :value="user.userCode" />
    <van-cell title="注册时间" :value="user.createTime.toISOString()" />
</template>

<script setup lang="ts">
import router from '../config/router';

const user = {
    id: 1,
    username: "admin",
    userAccount: "admin",
    avatarUrl: "https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?cb=iwc2&rs=1&pid=ImgDetMain",
    gender: "男",
    phone: "12345678901",
    email: "1470290218@qq.com",
    userCode: 1745811509268,
    tags: ["后端开发", "前端开发", "算法设计"],
    createTime: new Date(),
}

const toEdit = (editKey: string, editName: string, currentValue: string) => {
    router.push({
        path: '/user/edit',
        query: {
            editKey: editKey,
            currentValue: currentValue,
            editName: editName
        }
    });
}

</script>

<style scoped></style>
