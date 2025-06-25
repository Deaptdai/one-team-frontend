<template>
    <div id="teamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="teamData.name" name="name" label="队伍名" placeholder="请输入队伍名"
                    :rules="[{ required: true, message: '请输入队伍名' }]" />
                <van-field v-model="teamData.description" rows="4" autosize label="队伍描述" type="textarea"
                    placeholder="请输入队伍描述" />

                <van-field is-link readonly label="过期时间" :placeholder="expireTimeText || '请选择过期时间'"
                    @click="showDatePicker = true" />

                <van-popup v-model:show="showDatePicker" position="bottom">
                    <van-date-picker v-model="date" title="选择日期" @confirm="onDateConfirm" :min-date="new Date()"
                        @cancel="showDatePicker = false" />
                </van-popup>

                <van-popup v-model:show="showTimePicker" position="bottom">
                    <van-time-picker v-model="time" title="选择时间" @confirm="onTimeConfirm"
                        @cancel="showTimePicker = false" />
                </van-popup>

                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="teamData.status" direction="horizontal">
                            <van-radio :name="0">公开</van-radio>
                            <van-radio :name="1">私有</van-radio>
                            <van-radio :name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field v-if="Number(teamData.status) === 2" v-model="teamData.password" type="password"
                    name="password" label="密码" placeholder="请输入队伍密码" length="3"
                    :rules="[{ required: true, message: '请输入队伍密码(必须为5位)' }]" />

            </van-cell-group>

            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import myAxios from '../plugins/myAxios';
import router from '../config/router';
import { showFailToast } from 'vant';
import { useRoute } from 'vue-router';


const teamData = ref({});
const route = useRoute();

//获取队伍信息
onMounted(async () => {
    const teamId = route.query.id; // 从路由参数获取队伍ID
    if (teamId <= 0) {
        showFailToast('队伍不存在或已被删除');
        return;
    }
    
    const res = await myAxios.get("/team/get", {
        params: {
            id: teamId, 
        }
    });

    if (res.data?.code === 200) {
        teamData.value = res.data?.data;
        // console.log('获取到的队伍数据:', teamData.value);
        // 回填时间
        if (teamData.value.expireTime) {
            // 假设格式为 "2025-07-16T20:20:20Z" 或 "2025-07-16 20:20:20"
            let t = teamData.value.expireTime.replace('T', ' ').replace('Z', '');
            let [dateStr, timeStr] = t.split(' ');
            if (dateStr && timeStr) {
                const [year, month, day] = dateStr.split('-');
                const [hour, minute] = timeStr.split(':');
                date.value = [year, month, day];
                time.value = [hour, minute];
                expireTimeText.value = `${year}-${month}-${day} ${hour}:${minute}`;
            }
        }
    } else {
        showFailToast(res.data?.description || '获取队伍列表失败');
    }
});

const date = ref(['2025', '01', '01']);
const time = ref(['00', '00']);
const showDatePicker = ref(false);
const showTimePicker = ref(false);
const expireTimeText = ref(teamData.value.expireTime || '请选择过期时间'); // 初始化为队伍的过期时间或默认文本

const onDateConfirm = (val) => {
    date.value = val.selectedValues;
    showDatePicker.value = false;
    showTimePicker.value = true; // 选完日期后弹出时间选择
};

const onTimeConfirm = (val) => {
    time.value = val.selectedValues;
    showTimePicker.value = false;
    // 拼接成 yyyy-MM-dd HH:mm:ss
    expireTimeText.value = `${date.value[0]}-${date.value[1]}-${date.value[2]}T${time.value[0]}:${time.value[1]}:00Z`;
    teamData.value.expireTime = expireTimeText.value; // 更新到表单数据中
};

const onSubmit = async () => {
    // 密码校验：加密队伍时必须为5位
    if (Number(teamData.value.status) === 2) {
        if (!teamData.value.password || teamData.value.password.length !== 5) {
            showFailToast('密码必须为5位');
            return;
        }
    }

    const postData = {
        ...teamData.value,
        status: Number(teamData.value.status), // 确保状态是数字
    };
    const res = await myAxios.post("/team/update", postData)
    if (res.data?.code === 200) {
        showSuccessToast('更新成功');
        router.push({
            path: '/team',
            replace: true, // 替换当前路由
        });
    } else {
        showFailToast('更新失败: ' + res.data?.description ?? '未知错误');
        return; // 如果提交失败，直接返回
    }
};
</script>

<style scoped></style>