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
                <van-button size="small" type="primary" plain @click="doJoinTeam(team.id, team.status)"
                    v-if="props.mode === 'all'">加入队伍</van-button>
                <van-button v-if="(team.createUser?.id === currentUser?.id || currentUser?.userRole === 1)
                    && (props.mode === 'my-create' || props.mode === 'all')" size="small" plain
                    @click="doUpdateTeam(team.id)">更新队伍</van-button>
                <van-button v-if="props.mode === 'my-create' || props.mode === 'my-join'" size="small" plain
                    @click="doQuitTeam(team.id)">退出队伍</van-button>
                <van-button v-if="(team.createUser?.id === currentUser?.id || currentUser?.userRole === 1)
                    && (props.mode === 'my-create' || props.mode === 'all')" size="small" plain
                    @click="doDeleteTeam(team.id)">解散队伍</van-button>
            </template>
        </van-card>
    </div>
    <div>
        <van-popup v-model:show="show" closeable close-icon-position="top-left" position="bottom"
            :style="{ height: '55%' }" @close="onPopupClose">
            <div class="popup_title">
                <div class="popup_title_">请输入队伍密码</div>
            </div>
            <!-- 密码输入框 -->
            <div>
                <van-password-input :value="password" :mask="false" :focused="showKeyboard" length="5"
                    @focus="showKeyboard = true" />
                <!-- 键盘 -->
                <van-number-keyboard :show="show" theme="custom" extra-key="." close-button-text="完成"
                    @blur="show = false" @input="onInput" @delete="onDelete" @close="onSubmit" />
            </div>
        </van-popup>
    </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import type { TeamType } from '../models/team';
import { teamStatusEnum } from '../constants/team';
import cs from '../assets/cs.png';
import myAxios from '../plugins/myAxios';
import { showFailToast, showSuccessToast } from 'vant';
import { ref } from 'vue';
import { getCurrentUser } from '../services/user';
import type { UserType } from '../models/user';
import router from '../config/router';

const show = ref(false);
const password = ref('');
const showKeyboard = ref(false);
let currentJoinTeamId = ref(0);
const currentUser = ref<UserType | null>(null);

onMounted(async () => {
    await getCurrentUser().then(user => {
        currentUser.value = user;
    });
})

interface TeamCardListProps {
    teamList: TeamType[];
    mode?: string;
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
    teamList: () => [],
    mode: '',
})


const doJoinTeam = async (id: number, status: number) => {
    currentJoinTeamId.value = id;
    if (teamStatusEnum[status] === '加密') {
        show.value = true;
        showKeyboard.value = true;
        return;
    }
    // 非加密队伍直接加入
    await joinTeamRequest(id);
};

const joinTeamRequest = async (id: number, password?: string) => {
    const res = await myAxios.post('/team/join', { teamId: id, password });
    if (res.data?.code === 200) {
        showSuccessToast('加入队伍成功');
    } else {
        showFailToast(res.data?.description || '加入队伍失败');
    }
};

const onInput = (value: string) => {
    if (password.value.length >= 5) {
        return;
    }
    password.value += value;

}

const onDelete = () => {
    password.value = password.value.slice(0, -1);
};

const onSubmit = async () => {
    if (password.value.length < 5) {
        showFailToast('密码长度不足');
        return;
    }
    await joinTeamRequest(currentJoinTeamId.value, password.value);
    password.value = ''; // 清空密码
    show.value = false; // 关闭弹窗
};

const onPopupClose = () => {
    password.value = ''; // 清空密码
    show.value = false; // 关闭弹窗
};

const doUpdateTeam = (id: number) => {
    // 跳转到修改队伍页面
    router.push({
        path: '/team/update',
        query: {
            id
        }, // 将队伍ID作为查询参数
    });
};

const doQuitTeam = async (id: number) => {
    const res = await myAxios.post('/team/quit', { teamId: id });
    if (res.data?.code === 200) {
        showSuccessToast('退出队伍成功');
    } else {
        showFailToast(res.data?.description || '退出队伍失败');
    }
};

const doDeleteTeam = async (id: number) => {
    const res = await myAxios.post('/team/delete', { id });
    if (res.data?.code === 200) {
        showSuccessToast('解散队伍成功');
    } else {
        showFailToast(res.data?.description || '解散队伍失败');
    }
};
</script>

<style scoped>
#teamCardList :deep(.van-card__thumb) {
    height: 120px;
}

.popup_title {
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #666
}
</style>