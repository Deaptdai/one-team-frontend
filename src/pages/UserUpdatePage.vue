<template>
    <template v-if="user">
        <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username', '昵称', user.username)" />
        <van-cell title="账号" :value="user.userAccount" />
        <van-cell title="头像" is-link @click="toEdit('avatarUrl', '头像', user.avatarUrl)">
            <img style=" height: 50px;" :src=user.avatarUrl />
        </van-cell>
        <van-cell title="性别" is-link :value="user.gender == 0 ? '男' : user.gender == 1 ? '女': user.gender"
            @click="toEdit('gender', '性别', user.gender)" />
        <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone', '电话', user.phone)" />
        <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email', '邮箱', user.email)" />
        <van-cell title="个人简介" is-link :value="user.userProfile"
            @click="toEdit('userProfile', '个人简介', user.userProfile)" />
        <van-cell title="用户编号" :value="user.userCode" />
        <van-cell title="注册时间" :value="user.createTime" />
    </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import router from '../config/router';
import { getCurrentUser } from '../services/user';

const user = ref();

onMounted(async () => {
    user.value = await getCurrentUser();
});

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
