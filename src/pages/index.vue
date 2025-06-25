<template>
    <user-card-list :userList="userList" />
    <van-empty v-if="!userList || userList.length < 1" description="数据为空" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import myAxios from '../plugins/myAxios';
import qs from 'qs';
import UserCardList from '../components/UserCardList.vue';

const route = useRoute();

const userList = ref([]);

onMounted(async () => {
    // 向给定ID的用户发起请求
    const userListData = await myAxios.get('/user/recommend', {
        params: {
            pageSize: 10,
            pageNum: 1,
        }
    })
        .then(function (response) {
            // 处理成功情况
            return response.data?.data?.records;
        })
        .catch(function (error) {
            // 处理错误情况
            console.log('/user/recommend', error);
        })

    if (userList) {
        userListData.forEach(user => {
            if (user.tags) {
                user.tags = JSON.parse(user.tags);
            }
        });
        userList.value = userListData;
    }
});

const { tags } = route.query;

</script>

<style scoped></style>