<template>
    <template v-if="user">
        <div class="avatar-center">
            <van-image round width="10rem" height="10rem" :src="user.avatarUrl"/>
        </div>
        <van-cell title="当前用户" :value="user?.username" />
        <van-cell title="修改个人信息" is-link to="/user/update" />
        <van-cell title="我创建的队伍" is-link to="/user/team/create" />
        <van-cell title="我加入的队伍" is-link to="/user/team/join" />
        <van-cell title="注册时间" :value="user?.createTime" />
    </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getCurrentUser } from '../services/user';

const user = ref();

onMounted(async () => {
    user.value = await getCurrentUser();
});

</script>

<style scoped>
.avatar-center {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
}
</style>
