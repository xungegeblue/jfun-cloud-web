
const req = require.context('../../icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys()

const re = /\.\/(.*)\.svg/

const icons = requireAll(req).map(i => {
  return i.match(re)[1]
})
//["add", "alipay", "chain", "codeConsole", "dev", "develop", "email", "error", "fwb", "github", "icon", "image",
// "index", "ipvisits", "java", "lock", "log", "markdown", "menu", "monitor", "password", "peoples", "permission", "qiniu",
// "redis", "role", "sqlMonitor", "system", "timing", "tools", "unlock", "user", "visits", "zujian"]
export default icons
