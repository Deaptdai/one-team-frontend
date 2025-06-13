<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import BasicLayout from './layouts/BasicLayout.vue'

const route = useRoute()
const isLoginPage = computed(() => route.meta.layout === 'none')
</script>

<template>
    <BasicLayout v-if="!isLoginPage">
        <router-view />
    </BasicLayout>
    <router-view v-else />
</template>

<style scoped>

</style>
