<template>
    <form action="/">
        <van-search v-model="searchText" show-action placeholder="请输入需要搜索的标签" @search="onSearch" @cancel="onCancel" />
    </form>

    <van-divider content-position="left">已选标签</van-divider>
    <van-row gutter="15" style="padding: 0 16px;">
        <van-col v-for="tag in activeIds">
            <van-tag :key="index" closeable size="small" type="primary" @close="doClose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>
    <van-divider content-position="left">选择标签</van-divider>

    <van-tree-select v-model:active-id="activeIds" v-model:main-active-index="activeIndex" :items="tagList" />

    <div style="padding: 20px;">
        <van-button block type="primary" @click="doSearchResult">搜索</van-button>
    </div>


</template>

<script setup>
import { ref } from 'vue';
import router from '../config/router';

const searchText = ref('');

const originalTagList = [
    {
        text: '性别',
        children: [
            { text: '男', id: '男' },
            { text: '女', id: '女' },
        ]
    },
    {
        text: '身份',
        children: [
            { text: '大一', id: '大1' },
            { text: '大二', id: '大2' },
            { text: '大三', id: '大3' },
            { text: '大一', id: '大4' },
            { text: '大二', id: '大5' },
            { text: '大三', id: '大6' },
            { text: '大一', id: '大7' },
            { text: '大二', id: '大8' },
            { text: '大三', id: '大9' },
        ],
    }
];

let tagList = ref(originalTagList);

/**
 * 搜索过滤标签
 * @param val 
 */
const onSearch = (val) => {
    tagList.value = originalTagList.map(parentTag => {
        const tempChildren = [...parentTag.children];
        const tempParentTag = {...parentTag};
        tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
        return tempParentTag;
    });
};

const onCancel = (val) => {
    searchText.value = '';
    tagList.value = originalTagList;
};


const activeIds = ref([]);
const activeIndex = ref(0);


//移除标签
const doClose = (tag) => {
    activeIds.value = activeIds.value.filter((item) => item !== tag);
};

const doSearchResult = () => {
    router.push({
        path: '/user/list',
        query: {
            tags: activeIds.value,
        }
    });
};

</script>

<style scoped></style>