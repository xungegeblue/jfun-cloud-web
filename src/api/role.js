import request from '@/utils/request'

export function getRoleList(){
    return request({
        url:'/api-user/roleList',
        method:'get'
    })
}
export function add(data) {
    return request({
        url:'/api-user/role',
        method:'post',
        data
    })
}
export function edit(data) {
    return request({
        url:'/api-user/role',
        method:'put',
        data
    })
}

export function editPermission(data) {
    return request({
        url:'/api-user/role/permission',
        method:'put',
        data
    })
}

export function editMenu(data) {
    return request({
        url:'/api-user/role/menu',
        method:'put',
        data
    })
}

export function get(id) {
    return request({
        url:'/api-user/role/'+id,
        method:'get',
    })
}

export function del(id) {
    return request({
        url:'/api-user/role/'+id,
        method:'delete',
    })
}
