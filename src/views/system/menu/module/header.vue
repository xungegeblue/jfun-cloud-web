<template>
    <div class="head-container">
        <el-input v-model="query.value" clearable placeholder="输入关键字搜索" style="width: 200px;margin-right: 10px"
                  class="filter-item" @keyup.enter.native="toQuery"/>
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-search" @click="toQuery">搜索</el-button>
        <div style="display: inline-block;margin: 0px 2px;">
            <el-button
                    v-if="checkPermission(['PERMISSION_ADD','PERMISSION_ALL'])"
                    class="filter-item"
                    size="mini"
                    type="primary"
                    icon="el-icon-plus"
                    @click="$refs.form.dialog = true">新增
            </el-button>
            <eForm ref="form" :is-add="true" :sup_this="sup_this" :menus="menus"/>
        </div>
    </div>
</template>
<script>
    import eForm from './form'
    import checkPermission from '@/utils/permission'

    export default {
        components: {eForm},
        props: {
            sup_this: {
                type: Object,
                required: true
            },
            menus: {
                type: Array,
                required: true
            },
            query: {
                type: Object,
                required: true
            }

        },
        data() {
            return {}
        },
        methods: {
            checkPermission,
            toQuery() {
                this.$parent.page = 0
                this.$parent.init()
            }
        }
    }
</script>
