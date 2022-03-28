const User = require('../model/user.model')

class UserService {
  async CreateUser(user_name, password) {
    try {
      // 插入数据
      const res = await User.create({
        // 表的字段
        user_name,
        password
      })
      return res
    } catch (error) {
      console.log(error);
    }
  }

  async GetUserInfo({ id, user_name, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })
    return res ? res.dataValues : null
  }
}
module.exports = new UserService()