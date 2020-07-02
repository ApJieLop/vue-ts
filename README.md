# cli-3 => 查看更多:
Vue官网地址See [Configuration Reference](https://cn.vuejs.org/)
vue.config.js相关配置See [Configuration Reference](https://cli.vuejs.org/zh/config/)

## 安装
npm install -g @vue/cli
安装后选择typeScript语法

## 检查安装是否成功 如有版本号表示成功
npm vue --version 或 npm vue -V

## 在指定文件(或者想要的盘:)建立你的项目
npm vue create 项目名称

## 安装axios - 请求
npm install axios
[在main.js中用法]
import axios from 'axios'

## 安装vue-axios - 请求(插件)
npm install vue-axios -S 
[在main.js中用法]
import vueAxios from 'vue-axios'
Vue.use(vueAxios, axios)

## 安装vuex
npm i vuex
[在main.js中用法]
import store from './store'

## 在ts语法中 - 引用js库 或者 js 方法 请看下面
在tsconfig.json  中加入这句话  "resolveJsonModule": true
意思是允许在ts中引用js语法

## QS
[在main.js中用法]
import Qs from 'qs' 
Vue.prototype.$qs = Qs
[如您是把请求文件抽离出来的用法]
import Qs from 'qs'
# 在 ts 中安装
npm install --save @types/qs

## 安装lazyload - 懒加载
npm install vue-lazy-load -S
[在main.js中用法]
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3, // 加载时间
  error: require('../public/static/images/error.jpg'), // 失败的图片
  loading: require('../public/static/images/loading.gif'), // loading的图片
  attempt: 1, // 加载完成
})

## 安装less
npm install -g less
npm install  less-loader node-less --save
[在vue文件中用法]
在style样式中 lang="less"

## 安装sass
npm install -g sass
npm install  sass-loader node-sass --save
[在vue文件中用法]
在style样式中 lang="sass"

## 安装element-ui - UI
npm i element-ui -S
[在main.js中用法]
import ElementUI from 'element-ui'
[如需要修改主题](必须安装sass)
import 'element-ui/lib/theme-chalk/index.css'
在根目录下新建 element-variables.scss
import '../element-variables.scss 

## 安装echarts - 可视化数据
npm install echarts -g --save
[在main.js中用法]
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
[如需用中国地图]
import china from 'echarts/map/json/china.json'
echarts.registerMap('china', china)
[如需用中3D图形-在所需vue文件]
import "echarts-gl";
require("echarts/lib/chart/bar");
# 如在ts中用 echarts
npm install @types/echarts

## 安装DataV - 可视化数据 (这是个基于Echars在封装的一个好看的可视化ui)
npm install @jiaminghi/data-view
[在main.js中用法]
import dataV from '@jiaminghi/data-view''
Vue.use(dataV)

# 安装v-distpicker - 省市区插件
npm install --save v-distpicker
[在所需vue文件中引用-这属于组件,别忘了挂在到组件上](See: https://www.jianshu.com/p/5bc713ec31c9)
import VDistpicker from 'v-distpicker'; 

## md5 加密
npm install --save js-md5
[在所需vue文件]
import md5 from "js-md5";
# ts 下载
npm install --save @types/js-md5

## 安装JQ
npm install jquery --save
[在main.js中用法/单文件应用]
import $ from "jquery";

## 初始化项目
npm install

### 启动项目
npm run serve -默认启动方式- 可更改package.json中的启动方式

### 项目打包
npm run build -默认打包方式- 可更改package.json中的打包方式
如遇到白屏问题请执行以下
npm install http-server -g
http-server

### 运行测试
npm run test

### 整理和修复文件
npm run lint

## ui图形化配置界面
npm vue ui

## 写在cli
npm uninstall vue-cli -g

## 项目目录结构说明
├─ .gitignore git => 屏蔽提交文件 - 前提是在安装cli3的时候下载了git的配置，如没下载，可以手动下载
├─ node_modules => node的相关配置
├─ public => 通过执行 npm run build 产生
└─| src 主要我们要修改的地方
  |─assets  => 静态文件
  |─components => 存放组件(可服用类型)
  |─views => 我们正常写页面的地方
  |─App.vue => App主组件
  |─main.js => 入口JS
  |─router.js => 路由文件
  └─store.js => vueX store 文件
├─ .browserslistrc => 浏览器列表
├─ .eslintrc => 用来管理和检测js代码风格的工具 See [Configuration Reference](https://eslint.org/docs/user-guide/configuring)
├─ .gitignore => 屏蔽上传文件编写文件
├─  babel.config.js => 自定义babel的地方
├─  package-lock.json => 程序包锁定-查看项目所欲的配置依赖版本
├─  package.json => 当我们创建一个node项目，意味着创建一个module模块，这个模块的描述文件
├─  postcss.config => 添加浏览器私缀-也是现在新型浏览器支持某些新API，而其它浏览器不支持的证明
├─  README.md => 也就是本文件-写日志的地方-这个就不多BB了
└─  vue.config => 这个就很重要了-我们想要对该项目的相关配置都在这里-注意~！！(如果安装时选择自定义配置时)-是不会有该文件的-自己手动添加