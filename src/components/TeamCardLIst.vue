<template>
    <div id="teamCardList">
        <van-card v-for="team in props.teamList" :desc="team.description" :title="team.name" :thumb="cs">
            <template #tags>
                <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px;">{{ teamStatusEnum[team.status]
                    }}</van-tag>
            </template>

            <template #bottom>
                <div>
                    最大人数: {{ team.maxNum }}人
                </div>

                <div v-if="team.expireTime">
                    过期时间: {{ team.expireTime }}
                </div>

                <div>
                    创建时间: {{ team.createTime }}
                </div>
            </template>

            <template #footer>
                <van-button size="small" type="primary" plain @click="doJoinTeam(team.id,team.status)">加入队伍</van-button>
            </template>

            <van-password-input :value="value" :length="6" :focused="showKeyboard" @focus="showKeyboard = true" v-if="showInput"/>
        </van-card>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { TeamType } from '../models/team';
import { teamStatusEnum } from '../constants/team';
import cs  from '../assets/cs.png';
import myAxios from '../plugins/myAxios';
import { showFailToast, showSuccessToast } from 'vant';
import { ref } from 'vue';

interface TeamCardListProps {
    teamList: TeamType[];
}

const value = ref('');
const showKeyboard = ref(false);
const showInput = ref(false);

const props = withDefaults(defineProps<TeamCardListProps>(), {
    teamList: () => [],
})

/**
 * 加入队伍
 * @param id 队伍ID 
 */
const doJoinTeam = async (id: number,status: number) => {
    if (teamStatusEnum[status] === '加密') {
        showInput.value = true;
        return;
    }
    
    const res = await myAxios.post('/team/join', { teamId: id })
    if (res.data?.code === 200) {
        // 成功加入队伍
        showSuccessToast('加入队伍成功');
    } else {
        // 加入队伍失败
        showFailToast(res.data?.description || '加入队伍失败');
    }
}
</script>

<style scoped>
#teamCardList :deep(.van-card__thumb) {
    height: 120px;
}

</style>