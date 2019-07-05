<template>
    <div class="app-container">
        <eHeader :menus="menus" :query="query" :sup_this="sup_this"/>
      <el-table
        :data="data"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="icon" label="图标" align="center" width="80px">
                <template slot-scope="scope">
                    <svg-icon :icon-class="scope.row.icon" />
                </template>
            </el-table-column>
            <el-table-column prop="sort" align="center" width="100px" label="排序">
                <template slot-scope="scope">
                    <el-tag>{{ scope.row.sort }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="path" label="链接地址"/>
            <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径"/>
            <el-table-column prop="iframe" width="100px" label="内部菜单">
                <template slot-scope="scope">
                    <span v-if="!scope.row.iframe">是</span>
                    <span v-else>否</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px" align="center">
                <template slot-scope="scope">
                    <edit v-if="checkPermission(['MENU_EDIT','MENU_ALL'])" :menus="menus" :data="scope.row" :sup_this="sup_this"/>
                    <el-popover
                            v-if="checkPermission(['MENU_ALL','MENU_DELETE'])"
                            :ref="scope.row.id"
                            placement="top"
                            width="200">
                        <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
                            <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
                        </div>
                        <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>
<script>
    import initData from '@/mixins/initData'
    import eHeader from './module/header'
    import checkPermission from '@/utils/permission'
    import {parseTime} from '@/utils/index'
    import { getMenusTree,del } from '@/api/menu'
    import edit from './module/edit'

    export default {
        components: { eHeader,edit},
        mixins: [initData],
        data() {
            return {
                columns: [
                    {
                        text: '名称',
                        value: 'name'
                    }
                ],
                delLoading: false, sup_this: this, menus: []
            }
        },
        created() {
            this.getMenus()
            this.$nextTick(() => {
                this.init()
            })
        },
        methods: {
            checkPermission,
            parseTime,
            beforeInit() {
                this.listPermission = ['MENU_VIEW', 'MENU_ALL']
                this.url = 'api-user/menu'
                const query = this.query
                const value = query.value
                this.params = {page: this.page, size: this.size}
                if (value) {
                    this.params['name'] = value
                }
                return true
            },
            getMenus() {
                getMenusTree().then(res => {
                    this.menus = []
                    const permission = { id: 0, label: '顶级类目', children: [] }//这个手动添加的顶级的默认0
                    permission.children = res
                    this.menus.push(permission)
                })
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

        }
    }
</script>
