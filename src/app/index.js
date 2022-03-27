const Koa = require('koa')
const KoaBody = require('koa-body')

const app = new Koa()

const router = require('../router/user.route')

app.use(KoaBody())
app.use(router.routes())

module.exports = app