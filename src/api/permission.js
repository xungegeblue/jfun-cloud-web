import request from '@/utils/request'


// 获取所有的菜单树
export function getPermissionTree() {
    return request({
        url: '/api-user/permission/tree',
        method: 'get'
    })
}

export function list() {
  return request({
    url: '/api-user/permission',
    method: 'get'
  })
}

export function add(data) {
    return request({
        url: '/api-user/permission',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: '/api-user/permission',
        method: 'put',
        data
    })
}

//删除是delete方式
export function del(id) {
    return request({
        url: '/api-user/permission/' + id,
        method: 'delete',
    })
}
