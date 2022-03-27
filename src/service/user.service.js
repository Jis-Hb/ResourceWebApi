class UserService {
  async CreateUser(user_name, password) {
    // todo : 写入数据库
    return '写入数据库成功'
  }
}
module.exports = new UserService()