<template>
    <van-cell center title="心动模式">
        <template #right-icon>
            <van-switch v-model="isMatchMode" />
        </template>
    </van-cell>
    <user-card-list :userList="userList" />

    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import myAxios from '../plugins/myAxios';
import UserCardList from '../components/UserCardList.vue';
import { showFailToast, showLoadingToast, showSuccessToast } from 'vant';

const userList = ref([]);

const isMatchMode = ref<boolean>(false);

const loadData = async () => {
    let userListData;
    showLoadingToast({
        message: '加载中...',
        forbidClick: true, duration: 0 
    });
    //心动模式根据标签匹配用户
    if (isMatchMode.value) {
        const num = 10;
        userListData = await myAxios.get('/user/match', {
            params: {
                num,
            }
        })
            .then(function (response) {
                // 处理成功情况
                showSuccessToast('请求成功');
                return response.data?.data;
            })
            .catch(function () {
                // 处理错误情况
                showFailToast('请求失败');
            })
    } else {
        //普通模式默认分页查询用户
        userListData = await myAxios.get('/user/recommend', {
            params: {
                pageSize: 10,
                pageNum: 1,
            }
        })
            .then(function (response) {
                // 处理成功情况
                showSuccessToast('请求成功');
                return response.data?.data?.records;
            })
            .catch(function () {
                // 处理错误情况
                showFailToast('请求失败');
            })
    }


    if (userList) {
        userListData.forEach((user: { tags: string; }) => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        });
        userList.value = userListData;
    }
};

//监听变量变化  
watchEffect(() => {
    loadData();
});
</script>

<style scoped></style>