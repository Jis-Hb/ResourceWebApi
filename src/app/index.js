const Koa = require('koa')
const KoaBody = require('koa-body')

const errHandler = require('./errHandler')

const app = new Koa()

const router = require('../router/user.route')

app.use(KoaBody())
app.use(router.routes())

app.on('error', errHandler)

module.exports = app