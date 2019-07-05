<template>
    <div>
        <el-button size="mini" type="success" @click="to">编辑</el-button>
        <eform ref="form" :sup_this="sup_this" :is-add="false"/>
    </div>
</template>
<script>
    import eform from './form'

    export default {
        props: {
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
                _this.form = {id: this.data.id, name: this.data.name, remark: this.data.remark}
                _this.dialog = true;
            }
        }
    }
</script>
<style scoped>
    div{display: inline-block;margin-right: 3px;}
</style>
