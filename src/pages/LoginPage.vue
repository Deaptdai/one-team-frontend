<template>
    <div class="login-form-wrapper">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="userAccount" name="userAccount" label="账号" placeholder="请输入账号"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="userPassword" type="password" name="userPassword" label="密码" placeholder="请输入密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px; text-align: center;">
                <van-button class="login-btn" round type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../config/router';
import myAxios from '../plugins/myAxios';
import { showFailToast, showSuccessToast } from 'vant';
import { setCurrentUserState } from '../states/user';

const userAccount = ref('');
const userPassword = ref('');
const onSubmit = async () => {
    const res = await myAxios.post('/user/login', {
        userAccount: userAccount.value,
        userPassword: userPassword.value,
    })
    if (res.data?.code === 200) {
        // 登录成功，跳转到主页
        showSuccessToast('登录成功');
        // 设置当前用户状态
        setCurrentUserState(res.data.data);
        router.replace('/');
    } else {
        // 登录失败，显示错误信息
        showFailToast('登录失败,'+ res.data?.description);
    }
};

</script>

<style scoped>
.login-form-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
.login-btn {
    width: 90px;
    height: 36px;
    font-size: 16px;
}

</style>
