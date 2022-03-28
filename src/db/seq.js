const { Sequelize } = require('sequelize')
const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PWD,
  MYSQL_DB
} = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  timezone: '+8:00',
  dialectOptions: {
    useUTC: false
  }

})

// seq.authenticate()
//   .then(() => {
//     console.log('数据库链接成功');
//   })
//   .catch(error => {
//     console.log(error, '数据库链接失败');
//   })
module.exports = seq