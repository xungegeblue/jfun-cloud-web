import store from '@/store'

/**
 * 完全使用用户的权限进行判断，不使用角色
 * 参考:RBAC权限控制
 */
export default function checkPermission(value) {
    if (value && value instanceof Array && value.length > 0) {
        const permissions = store.getters && store.getters.permissions
        const permissionRequest = value
        //用户的权限是否包括请求的权限，如果包括那么说明用户有权限访问!
        const hasPermission = permissions.some(p => {
            return permissionRequest.includes(p)
        })

        if (!hasPermission) {
            return false
        }
        return true
    } else {
        return false
    }
}
