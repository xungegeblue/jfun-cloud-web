<template>
    <el-dialog :visible.sync="dialog" :title="isAdd ? '新增角色' : '编辑角色'" append-to-body width="500px">
        <el-form ref="form" :model="form" :rules="rules" size="small" label-width="66px">
            <el-form-item label="角色名" prop="name">
                <el-input v-model="form.name" style="width: 370px;"/>
            </el-form-item>
            <el-form-item label="描述" prop="email">
                <el-input v-model="form.remark" style="width: 370px;" type="textarea" :row="3"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="cancel">取消</el-button>
            <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {add,edit} from '@/api/role'
    export default {
        name: 'Form',
        components: {},
        created(){
        },
        props:{
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
                dialog: false, loading: false, form: { name: '', remark:'', permissions: [] },
                rules: {
                    name: [
                        { required: true, message: '请输入角色', trigger: 'blur' },
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
                }).catch(() => {
                    this.loading = false
                })
            },
            cancel() {
                this.resetForm()
            },
            resetForm() {
                this.dialog = false
                this.roleIds = []
                this.$refs['form'].resetFields()
                this.form = { name: '', remark: '', permissions : [] }
            }

        }
    }
</script>
