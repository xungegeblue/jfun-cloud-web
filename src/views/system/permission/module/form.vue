<template>
    <el-dialog :visible.sync="dialog" :title="isAdd ? '新增权限' : '编辑权限'" append-to-body width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name" style="width: 370px;"/>
            </el-form-item>
            <el-form-item label="别名" prop="alias">
                <el-input v-model="form.alias" style="width: 370px;"/>
            </el-form-item>
            <el-form-item style="margin-bottom: 0px;" label="上级类目">
                <treeselect v-model="form.pid" :options="permissions" style="width: 360px;" placeholder="选择上级类目" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {add,edit} from '@/api/permission'
    import Treeselect from '@riophae/vue-treeselect'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    export default {
        name: 'Form',
        components: {Treeselect},
        created(){

        },
        props:{
            //传递进来而不是去请求
            permissions: {
                type: Array,
                required: true
            },
            isAdd: {
                type: Boolean,
                required: true
            },
            sup_this: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                dialog: false, loading: false, form: { name: '', alias:'', pid: 0 },

                rules: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            doSubmit(){
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        if (this.isAdd) {
                            this.doAdd()
                        } else this.doEdit()
                    } else {
                        return false
                    }
                })
            },
            doAdd(){
                add(this.form).then(() => {
                    this.resetForm()
                    this.$notify({
                        title: '添加成功',
                        type: 'success',
                        duration: 2500
                    })
                    this.loading = false
                    this.$parent.$parent.init()
                    this.$parent.$parent.getPermissions()
                }).catch(() => {
                    this.loading = false
                })
            },
            doEdit(){
                edit(this.form).then(() => {
                    this.resetForm()
                    this.$notify({
                        title: '修改成功',
                        type: 'success',
                        duration: 2500
                    })
                    this.loading = false
                    this.sup_this.init()
                    this.sup_this.getPermissions()
                }).catch(() => {
                    this.loading = false
                })
            },
            cancel() {
                this.resetForm()
            },
            resetForm() {
                this.dialog = false
                this.$refs['form'].resetFields()
                this.form = { name: '', alias: '', pid:0}
            }

        }
    }
</script>
