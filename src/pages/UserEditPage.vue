<template>
    <van-form @submit="onSubmit">
        <van-field 
            v-model="editUser.currentValue" 
            :name="editUser.editKey" 
            :label="editUser.editName" 
            :placeholder="`请输入${editUser.editName}`" 
        />    

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>

    </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import myAxios from '../plugins/myAxios';
import router from '../config/router';
import { showFailToast, showSuccessToast } from 'vant';
import { getCurrentUser } from '../services/user';
import { setCurrentUserState } from '../states/user';

const route = useRoute();
const editUser = ref({
    editKey: route.query.editKey as string || '',
    currentValue: route.query.currentValue as string || '',
    editName: route.query.editName as string || ''
})

const onSubmit = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        showFailToast('用户未登录');
        return ;
    }

    const res = await myAxios.post('/user/update', {
        'id': currentUser.id, 
        [editUser.value.editKey]: editUser.value.currentValue,
    })

    if (res.data.code === 200) {
        // 提交成功
        showSuccessToast('提交成功');
        
        // TODO 跳转到用户详情页
        const { editKey, currentValue } = editUser.value;
        (currentUser as any)[editKey] = currentValue;
        setCurrentUserState(currentUser);
        router.back();
    } else { 
        // 提交失败
        showFailToast('提交失败');
    }
};

</script>

<style scoped></style>
