<template>
  <div class="app-container">
    <eHeader :permissions="permissions" :query="query" :sup_this="sup_this"/>
    <el-table
      :data="data"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" clo>
      <el-table-column prop="alias" label="别名"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit :permissions="permissions" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            :ref="scope.row.id"
            placement="top"
            width="200">
            <p>确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定
              </el-button>
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
  import { parseTime } from '@/utils/index'
  import { getPermissionTree, del, list } from '@/api/permission'
  import edit from './module/edit'

  export default {
    components: { eHeader, edit },
    mixins: [initData],
    data() {
      return {
        delLoading: false, sup_this: this, permissions: []
      }
    },
    created() {
      this.getPermissions()
      this.$nextTick(() => {
        this.init()
      })
    },
    methods: {
      checkPermission,
      parseTime,
      beforeInit() {
        this.url = "/api-user/permission"
        return true
      },

      getPermissions() {
        getPermissionTree().then(res => {
          this.permissions = []
          const permission = { id: 0, label: '顶级类目', children: [] }//这个手动添加的顶级的默认0
          permission.children = res
          this.permissions.push(permission)
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
          console.log(err.response.data.message)
        })
      }
    }
  }
</script>
