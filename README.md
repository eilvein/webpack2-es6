# vue.webpack.gulp
基于vue+webpack+gulp 模块组件化解决方案

### 安装依赖模块

[Node.js​]: https://nodejs.org/en/

> nam install

### 目录结构

```
|--- vue.project
	|-- src					//源目录
	|-- asset				//编译目录
	|-- rev					//manifest.json
	|-- .gitignore  		//git忽略配置
	|-- gulpfile.js			//gulp基本配置
	|-- package.json		//模块依赖配置
	|-- README.MD			//项目文档说明
	|-- webpack.config.js	//webpack基本配置

```

### dev:

> npm run watch —> gulp watch	//开发环境

### build

> npm run release	//静态文件生产
>
> npm run build	//模拟生成环境

### server

- browserSync

> gulp browser-sync	//单独启动browserSync

### deploy

> gulp deploy	//测试环境部署

### sprite

> gulp sprite	//雪碧图

### mocha

> gulp mocha	//测试框架

### webpack

```jsp
module.exports = {
    entry: {}, //路口
    output: { }, //输出出口
    module: {
        loaders: [ ]
    },
    babel: { //配置babel
        "presets": ["es2015"],
        "plugins": ["transform-runtime"]
    },
    plugins: [ ],//编译的时候所执行的插件数组
    vue: { },//vue的配置,需要单独出来配置
    devtool : "source-map" //调试模式
};
```





### TODO

