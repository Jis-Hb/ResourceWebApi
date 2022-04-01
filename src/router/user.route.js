const Router = require('koa-router')

const { UserValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { register, login, changePassword } = require('../controller/user.controller')

const { auth } = require('../middleware/auth.middleware')

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', UserValidator, verifyUser, cryptPassword, register)

// 登录接口
router.post('/login', UserValidator, verifyLogin, login)

// 修改密码接口
router.patch('/', auth, cryptPassword, changePassword)


module.exports = router