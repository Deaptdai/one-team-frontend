<template>
    <div id="teamPage">
        <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" @search="onSearch" />
        <team-card-list :teamList="teamList" mode="all" />
        <van-empty v-if="!teamList || teamList.length < 1" description="数据为空" />
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import router from '../config/router';
import myAxios from '../plugins/myAxios';
import { showFailToast,showSuccessToast,Toast } from 'vant';
import TeamCardList from '../components/TeamCardLIst.vue';

const teamList = ref([]);
const value = ref(''); // 用于搜索框的双向绑定

const listTeam = async (val = '') => {
    const res = await myAxios.get("/team/list", {
        params: {
            searchText: val
        }
    });
    if (res.data?.code === 200) {
        teamList.value = res.data?.data;
    } else {
        showFailToast(res.data?.description || '获取队伍列表失败');
    }
}

const onSearch = async (val) => {
    listTeam(val);
}

//页面加载时只触发一次
onMounted(async () => {
    listTeam();
});
</script>

<style scoped>

</style>
