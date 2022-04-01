const bcrypt = require('bcryptjs');
const { GetUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  userInvalidPassword
} = require('../constant/err.type')

const UserValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  // 合理性
  // if (await GetUserInfo({ user_name })) {
  //   ctx.app.emit('error', userAlreadyExited, ctx)
  //   return
  // }

  try {
    const res = await GetUserInfo({ user_name })
    if (res) {
      console.error('用户名已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }

  } catch (error) {
    console.error('获取用户信息错误', { error });
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  // hash 保存的是密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  // 1· 判断用户是否存在(不存在就报错)
  try {
    const res = await GetUserInfo({ user_name })
    if (!res) {
      console.error('用户名不存在', { user_name });
      return ctx.app.emit('error', userDoesNotExist, ctx)
    }
    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', userInvalidPassword, ctx)
    }

  } catch (error) {
    console.error('用户登录失败', { error });
    return ctx.app.emit('error', userLoginError, ctx)

  }

  // 2·密码是否匹配(不匹配：报错)

  await next()
}

module.exports = {
  UserValidator,
  verifyUser,
  cryptPassword,
  verifyLogin

}