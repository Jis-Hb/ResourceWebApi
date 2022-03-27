const { CreateUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    console.log(ctx.request.body);
    const { user_name, password } = ctx.request.body
    const res = await CreateUser(user_name, password)
    console.log(res);
    ctx.body = ctx.request.body
  }
  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}
module.exports = new UserController()