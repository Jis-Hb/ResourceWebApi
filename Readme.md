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

创建`src/main.js`

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

module.exports = process.env
```

