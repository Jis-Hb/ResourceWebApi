# 一.项目的初始化

## 1·npm初始化

``` javascript
npm init -y
```

生成`package.josn`文件；

+ 记录项目的依赖

## 2·git初始化

``` 
git init
```

生成.git隐藏文件夹，git的本地仓库

### 3·创建ReadMe文件



# 二搭建项目

## 1·安装Koa框架

``` 
npm install koa 

```



## 2·编写最基础的app

创建`src/app.js`

![image-20220327214616943](C:/Users/%E7%82%B8%E6%AF%9B%E5%B0%8F%E7%84%A6/AppData/Roaming/Typora/typora-user-images/image-20220327214616943.png)



# 三·项目的基本优化

## 1·自动重启服务

安装nodemon工具

``` 
npm install nodemon
```

编写`packge.josn`脚本；

``` json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev":"nodemon ./src/app.js"
  },
```

执行`npm run dev `启动服务

## 2· 读取配置文件’

安装dotenv,读取根目录中的.env文件、将配置写process.env中

``` 
npm install dotenv
```

创建.env文件

```
APP_PORT = 8000
```

创建`src/config/config.default.js`

``` javascript
const dotenv = require('dotenv');

dotenv.config()

// console.log(process.env.APP_PORT)

module.exports = process.env
```

改写`app.js`



# 四·添加路由

路由：根据不同的URL，掉哟个对应处理函数

## 1· 安装koa-router

``` 
npm install koa-router
```

步骤：

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

## 2·编写路由

创建`src/router/route.users.js`

``` javascript
const Router = require('koa-router')

const router = new Router({ prefix: '/users' })

router.get('/', (ctx, next) => {
  ctx.body = 'hello users'
})


module.exports = router
```

# 五·目录结构优化

## 1·将http服务和app业务拆分

创建`src/app/index.js`

``` javascript
const Koa = require('koa')

const app = new Koa()

const router = require('../router/user.route')

app.use(router.routes())

module.exports = app
```

改写`main.js`

``` js
const { APP_PORT } = require('./config/config.default')

const app = require('./app')


app.listen(APP_PORT, () => {
  console.log(`起飞咯 http://localhost:${APP_PORT}`);
})
```



## 2将路由和控制器拆分

路由：解析URL，分布给控制器对应的方法

控制器：处理不同的业务

改写`user.route.js`

``` js
const Router = require('koa-router')

const { register, login } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', register)

// 登录接口
router.post('/login', login)

module.exports = router
```

创建`controller/user.controller.js`

``` js
class UserController {
  async register(ctx, next) {
    ctx.body = '用户注册成功'
  }
  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}
module.exports = new UserController()
```

# 六·解析body

## 1·安装koa-body

`npm i koa-body`

##  2·注册中间件

改写`app/index.js`

## 3·解析请求的数据

改写`user.controller.js`文件

``` js
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
```

## 4·拆分service层

service层主要是做数据库处理

创建`src/service/user.service`

``` js
class UserService {
  async CreateUser(user_name, password) {
    // todo : 写入数据库
    return '写入数据库成功'
  }
}
module.exports = new UserService()

```

# 七·数据库操作

sequelize ORM数据库工具

ORM：对象关系映射

+ 数据表映射(对应)一个对象
+ 数据表中的数据行(记录)对应一个对象
+ 数据表字段对应对象的属性
+ 数据表的操作对应对象的方法

## 1·安装sequelize

``` 
npm install sequelize
```

## 2·安装mysql2



# 八·密码加密

在将密码保存到数据库之前，要对密码加密的处理

