import request from '@/utils/request'

// 获取所有的菜单树
export function getMenusTree() {
  return request({
    url: 'api-user/menu/tree',
    method: 'get'
  })
}

export function buildMenus() {
  return request({
    url: 'api-user/menu/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: 'api-user/menu',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'api-user/menu/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'api-user/menu',
    method: 'put',
    data
  })
}
