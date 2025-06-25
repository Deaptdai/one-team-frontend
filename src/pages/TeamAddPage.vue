<template>
    <div id="teamAddPage">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="addTeamData.name" name="name" label="队伍名" placeholder="请输入队伍名"
                    :rules="[{ required: true, message: '请输入队伍名' }]" />
                <van-field v-model="addTeamData.description" rows="4" autosize label="队伍描述" type="textarea"
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

                <van-field name="stepper" label="最大人数">
                    <template #input>
                        <van-stepper v-model="addTeamData.maxNum" theme="round" button-size="22" disable-input
                            max="10" min="2"/>
                    </template>
                </van-field>
            
                <van-field name="radio" label="队伍状态">
                    <template #input>
                        <van-radio-group v-model="addTeamData.status" direction="horizontal">
                            <van-radio name="0">公开</van-radio>
                            <van-radio name="1">私有</van-radio>
                            <van-radio name="2">加密</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>

                <van-field v-if="Number(addTeamData.status) === 2" v-model="addTeamData.password" type="password"
                    name="password" label="密码" placeholder="请输入队伍密码"
                    :rules="[{ required: true, message: '请输入队伍密码' }]" />

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
import { ref } from 'vue';
import myAxios from '../plugins/myAxios';
import router from '../config/router';
import { showFailToast } from 'vant';

const initFromData = {
    "name": "",
    "description": "",
    "expireTime": null,
    "maxNum": 3,
    "password": "",
    "status": 0
}
const addTeamData = ref({ ...initFromData });

const date = ref(['2025', '01', '01']);
const time = ref(['00', '00']);
const showDatePicker = ref(false);
const showTimePicker = ref(false);
const expireTimeText = ref('');

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
    addTeamData.value.expireTime = expireTimeText.value; // 更新到表单数据中
};

const onSubmit = async () => {
    // 参数校验

    const postData = {
        ...addTeamData.value,
        status: Number(addTeamData.value.status), // 确保状态是数字
    };
    const res = await myAxios.post("/team/add", postData)
    if (res.data?.code === 200) {
        showSuccessToast('添加成功');
        router.push({
            path: '/team',
            replace: true, // 替换当前路由
        });
    } else {
        console.error("提交失败:", res.data);
        showFailToast('添加失败: ' + res.data?.description || '未知错误');
        return; // 如果提交失败，直接返回
    }
};
</script>

<style scoped></style>