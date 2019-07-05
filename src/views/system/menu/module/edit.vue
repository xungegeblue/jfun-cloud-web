<template>
    <div>
        <el-button size="mini" type="success" @click="to">编辑</el-button>
        <eform ref="form" :sup_this="sup_this" :is-add="false" :menus="menus"/>
    </div>
</template>
<script>
    import eform from './form'

    export default {
        props: {
            menus: {
                type: Array,
                required: true
            },
            data: {
                type: Object,
                requestd: true
            },
            sup_this: {
                type: Object,
                request: true
            }
        },
        components: {eform},
        methods: {
            to() {
                const _this = this.$refs.form;
                _this.form = { id: this.data.id, component: this.data.component, name: this.data.name, sort: this.data.sort, pid: this.data.pid, path: this.data.path, iframe: this.data.iframe.toString(), roles: [], icon: this.data.icon }
                _this.dialog = true;
            }
        }
    }
</script>
<style scoped>
    div {
        display: inline-block;
        margin-right: 3px;
    }
</style>
