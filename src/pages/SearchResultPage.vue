<template>
    <user-card-list :userList="userList" />
    <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import myAxios from '../plugins/myAxios';
import qs from 'qs';

const route = useRoute();

const userList = ref([]);

onMounted(async () => {
    // 向给定ID的用户发起请求
    const userListData = await myAxios.get('/user/search/tags', {
        params: {
            tagNameList: tags,
        },
        paramsSerializer: function (params) {
            return qs.stringify(params, { arrayFormat: "repeat" });
        },
    })
        .then(function (response) {
            // 处理成功情况
            console.log('/user/search/tags请求响应值', response);
            showSuccessToast('搜索成功');
            return response.data?.data;
        })
        .catch(function (error) {
            // 处理错误情况
            console.log('/user/search/tags', error);
            showFailToast('搜索失败');
        })
        .finally(function () {
            // 总是会执行
        });
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

// 测试数据
// const mockUser = {
//     id: 1,
//     username: "deapt",
//     userAccount: "deapt",
//     avatarUrl: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.7GLMYPqMlt2LgkbPsOnDIAAAAA?cb=iwc2&rs=1&pid=ImgDetMain',
//     gender: 0,
//     phone: '181241241124',
//     email: '123125412512@qq.com',
//     userProfile: '这是一个个人简介',
//     userRole: 0,
//     userCode: 5,
//     tags: ["java", "python", "javascript", "vue", "react", "node", "golang", "c++", "c#"],
//     createTime: new Date(),
// }

</script>

<style scoped></style>