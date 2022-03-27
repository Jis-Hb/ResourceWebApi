const Koa = require('koa')

const app = new Koa()

app.use((cts, next) => {
  cts.body = 'hello world'
})

app.listen(3000, () => {
  console.log('起飞咯 http://localhost:3000');
})