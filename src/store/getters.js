const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permissions: state => state.user.permissions,
  routers: state => state.menuRoutes.routers,
  loadMenus: state => state.user.loadMenus,
}
export default getters
