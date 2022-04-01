const jwt = require('jsonwebtoken');

const { CreateUser, GetUserInfo } = require('../service/user.service')

const { userRegisterError } = require('../constant/err.type')

const { JWT_SECRET } = require('../config/config.default')

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
    const { user_name } = ctx.request.body

    // 1·获取用户信息(token: 的payload中，记录id，user_name,is_admin)


    try {
      // 从返回结果对象中剔除掉password
      const { password, ...res } = await GetUserInfo({ user_name })

      ctx.body = {
        code: 0,
        message: '用户登录成功',
        data: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
        }
      }
    } catch (error) {
      console.error('用户登录失败', error);
    }
  }

  async changePassword(ctx, user) {
    //1· 获取数据
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    console.log(id, password);
    //2·操作数据库

    //3·返回结果
  }
}
module.exports = new UserController()