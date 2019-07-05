import request from '@/utils/request'
import { getToken } from '../utils/auth'

export function login(data) {
  let param = new URLSearchParams()
  param.append('username', data.username)
  param.append('grant_type', data.grant_type)
  param.append('client_id', data.client_id)
  param.append('client_secret', data.client_secret)
  param.append('password', data.password)

  return request({
    url: '/api-auth/oauth/token',
    method: 'post',
    data: param
  })
}

export function getInfo(token) {
  return request({
    url: '/api-user/user/info',
    method: 'get'
  })
}

export function logout() {
  var token = getToken();
  return request({
    url: '/api-auth/logout?token='+token,
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/api-user/user',
    method: 'post',
    data
  })
}

export function edit(data) {
  return request({
    url: '/api-user/user',
    method: 'put',
    data
  })
}

export function del(id) {
  return request({
    url: '/api-user/user/' + id,
    method: 'delete'
  })
}
