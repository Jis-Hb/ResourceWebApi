const { APP_PORT } = require('./config/config.default')

const app = require('./app')


app.listen(APP_PORT, () => {
  console.log(`起飞咯 http://localhost:${APP_PORT}`);
})