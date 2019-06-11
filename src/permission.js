import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { buildMenus } from '@/api/menu'
import { filterAsyncRouter } from './store/modules/menuRoutes'
import { removeToken } from './utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in

  if (getToken()) {

    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {

      if (store.getters.permissions.length === 0) { // 已经登陆的用户
        console.log('1')
        store.dispatch('user/getInfo').then(res => {
          // 动态路由，拉取菜单
          loadMenus(next, to)
        }).catch((err) => {
          removeToken()
        })
      } else if (store.getters.loadMenus) { //未登陆的用户
        console.log('2')
        // 修改成false，防止死循环
        store.dispatch('user/updateLoadMenus').then(res => {
        })
        loadMenus(next, to)

      } else {
        console.log('3')
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res)
    asyncRouter.push({path: '*', redirect: '/404', hidden: true})
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })// hack方法 确保addRoutes已完成
    })
  })
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
