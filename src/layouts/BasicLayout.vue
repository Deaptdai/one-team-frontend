<template>
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>

    <div id="content">
        <router-view />
    </div>

    <van-tabbar @change="onChange" route>
        <van-tabbar-item icon="home-o" name="index" to="/">主页</van-tabbar-item>
        <van-tabbar-item icon="friends-o" name="team" to="/team">队伍</van-tabbar-item>
        <van-tabbar-item icon="setting-o" name="user" to="/user">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import router from '../config/router';


const onClickLeft = () => {
    router.back();
};;
const onClickRight = () => {
    router.push('/search');
};


</script>

<style scoped></style>