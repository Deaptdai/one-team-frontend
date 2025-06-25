<template>
    <div id="teamPage">
        <van-button type="primary" @click="doCreateTeam">创建队伍</van-button>
        <team-card-list :teamList="teamList" />
        <van-empty v-if="!teamList || teamList.length < 1" description="数据为空" />
    </div>

</template>

<script setup>
import { onMounted,ref } from 'vue';
import router from '../config/router';
import myAxios from '../plugins/myAxios';
import { showFailToast,Toast } from 'vant';
import TeamCardList from '../components/TeamCardLIst.vue';

const doCreateTeam = () => {
    router.push('/team/add');
};

const teamList = ref([]);

//页面加载时只触发一次
onMounted(async () => {
    const res = await myAxios.get("/team/list");
    if(res.data?.code === 200) {
        teamList.value = res.data?.data;
    } else {
        showFailToast(res.data?.description || '获取队伍列表失败');
    }
});
</script>

<style scoped>

</style>
