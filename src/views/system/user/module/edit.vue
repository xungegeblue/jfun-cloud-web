<template>
    <div>
        <el-button @click="edit" size="mini" type="success">编辑</el-button>
        <eform ref="form" :roles="roles" :is-add="false" :sup_this="sup_this"></eform>
    </div>
</template>
<script>
    import eform from './form'

    export default {
        props: {
            roles: {
                request: true,
                type: Array
            },
            sup_this: {
                request: true,
                type: Object
            },
            data: {
                request: true,
                type: Object
            }
        },
        name: 'Edit',
        components: {eform},
        data() {
            return {}
        },
        methods: {
            edit() {
                const _this = this.$refs.form
                _this.roleIds = []
                _this.form = {
                    id: this.data.id,
                    name: this.data.name,
                    email: this.data.email,
                    state: this.data.state,
                    roles: []
                }
                this.data.roles.forEach(function (data, index) {
                    _this.roleIds.push(data.id)
                })
                _this.dialog = true
            }
        }
    }
</script>
<style scoped>
    div{display: inline-block;margin-right: 3px;}
</style>
