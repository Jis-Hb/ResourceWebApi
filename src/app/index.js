const Koa = require('koa')

const app = new Koa()

const router = require('../router/user.route')

app.use(router.routes())

module.exports = app