<template>
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="search" size="18" />
        </template>
    </van-nav-bar>

    <div id="content">
        <template v-if="active === 'index'">
            <index />
        </template>

        <template v-if="active === 'team'">
            <team />
        </template>
    </div>

    <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o" name="index">主页</van-tabbar-item>
        <van-tabbar-item icon="friends-o" name="team">队伍</van-tabbar-item>
        <van-tabbar-item icon="setting-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import Index from '../pages/index.vue';
import Team from '../pages/team.vue';


const onClickLeft = () => alert('返回');
const onClickRight = () => alert('搜索');
const active = ref("index");//默认标签为index值的item高亮
const onChange = (index) => showToast(`标签 ${index}`);

</script>

<style scoped></style>