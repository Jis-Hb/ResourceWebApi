const { CreateUser } = require('../service/user.service')

const { userRegisterError } = require('../constant/err.type')

class UserController {
  async register(ctx, next) {
    console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body

    try {
      const res = await CreateUser(user_name, password)
      console.log(res);
      ctx.body = {
        code: 0,
        message: '用户注册成功！',
        data: {
          id: res.id,
          user_name: res.user_name,
          is_admin: res.is_admin
        }
      }
    } catch (err) {
      console.log(err);
      ctx.app.emit('error', userRegisterError, ctx)
    }


  }
  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}
module.exports = new UserController()