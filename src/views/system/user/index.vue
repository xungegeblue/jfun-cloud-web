<template>
    <div class="app-container">
        <e-header :query="query" :roles="roles"/>
        <el-table v-loading="loading" :data="data" size="small" border style="width: 100%;" :empty-text="emptyText">
            <el-table-column prop="name" label="用户名"/>
            <el-table-column label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="el-avatar">
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱"/>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span>{{ scope.row.state == 1 ? '激活':'锁定' }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="createTime" label="注册日期">
                <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200px" align="center">
                <template slot-scope="scope">
                    <e-edit v-if="checkPermission(['USER_EDIT','USER_ALL'])" :data="scope.row" :roles="roles"  :sup_this="sup_this"/>
                    <el-popover
                            v-if="checkPermission(['USER_DEL','USER_ALL'])"
                            :ref="scope.row.id"
                            placement="top"
                            width="150">
                        <p>确定删除本条数据吗？</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini"  @click="subDelete(scope.row.id)">确定
                            </el-button>
                        </div>
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popover>
                </template>

            </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
                :total="total"
                style="margin-top: 8px;"
                layout="total, prev, pager, next, sizes"
                @size-change="sizeChange"
                @current-change="pageChange"/>
    </div>
</template>
<script>
    import checkPermission from '@/utils/permission'
    import initData from '@/mixins/initData'
    import {parseTime} from '@/utils/index'
    import eHeader from './module/header'
    import {getRoleList} from "@/api/role";
    import eEdit from './module/edit'
    import { del } from '@/api/user'
    export default {
        components: {eHeader, eEdit},
        mixins: [initData],
        data() {
            return {
                roles: [], delLoading: false, sup_this: this
            }
        },
        created() {
            this.getRoles();
            //设置列表权限
            this.$nextTick(() => {
                this.init();
            })
        },
        methods: {
            checkPermission,
            parseTime,
            beforeInit() {
                const query = this.query
                const type = query.type
                const value = query.value
                const state = query.state
                this.params = {page: this.page, size: this.size}
                if (type && value) {
                    this.params[type] = value
                }
                if (state !== '' && state !== null) {
                    this.params['state'] = state
                }

                this.url = 'api-user/user'
                return true
            },
            subDelete(id) {
                this.delLoading = true
                del(id).then(res => {
                    this.delLoading = false
                    this.$refs[id].doClose()
                    this.init()
                    this.$notify({
                        title: '删除成功',
                        type: 'success',
                        duration: 2500
                    })
                }).catch(err => {
                    this.delLoading = false
                    this.$refs[id].doClose()

                })
            },
            getRoles() {
                getRoleList().then(res => {
                    this.roles = res;

                })
            }
        }

    }
</script>
