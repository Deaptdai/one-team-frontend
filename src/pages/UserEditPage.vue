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

const route = useRoute();
const editUser = ref({
    editKey: route.query.editKey as string || '',
    currentValue: route.query.currentValue as string || '',
    editName: route.query.editName as string || ''
})

const onSubmit = (values :any) => {
    // TODO 把 editKey，currentValue, editName 提交到给后端
    console.log('提交的值', values);
};

</script>

<style scoped></style>
