<template>
    <van-card v-for="user in props.userList" :desc="user.userProfile" :title="user.username" :thumb="user.avatarUrl">
        <template #tags>
            <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px;">{{ tag
            }}</van-tag>
        </template>
        <template #footer>
            <van-button size="mini">联系</van-button>
        </template>
    </van-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { UserType } from '../models/user';

interface UserCardListProps {
    userList: UserType[];
}

const props = withDefaults(defineProps<UserCardListProps>(), {
    userList: () => [],
})
</script>

<style scoped>

</style>