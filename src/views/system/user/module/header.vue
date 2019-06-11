<template>
    <div class="head-container">
        <el-input v-model="query.value" clearable placeholder="输入关键字搜索" style="width: 200px;margin-right: 10px" class="filter-item" @keyup.enter.native="toQuery"/>

        <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px;margin-right: 10px">
            <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>
        <el-select v-model="query.state" clearable placeholder="状态" class="filter-item" style="width: 90px;margin-right: 10px" @change="toQuery">
            <el-option v-for="item in enabledTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
        </el-select>


        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
        <div style="display: inline-block;margin: 0px 2px;">
            <el-button
                    v-if="checkPermission(['USER_ADD','USER_ALL'])"
                    class="filter-item"
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="$refs.form.dialog = true">新增</el-button>
            <eForm ref="form" :roles="roles" :is-add="true"/>
        </div>
    </div>
</template>
<script>
    import eForm from './form'
    import checkPermission from '@/utils/permission'
    export default {
        components:{eForm},
        props: {
            roles:{
                type: Array,
                required: true
            },
            query: {
                type: Object,
                required: true
            }
        },
        data() {
            return{
                queryTypeOptions: [
                    { key: 'name', display_name: '用户名' },
                    { key: 'email', display_name: '邮箱' }
                ],
                enabledTypeOptions: [
                    { key: 1, display_name: '激活' },
                    { key: 2, display_name: '锁定' }
                ]
            }
        },
        methods:{
            checkPermission,
            toQuery(){
                this.$parent.page = 0
                this.$parent.init()
            }
        }
    }
</script>
