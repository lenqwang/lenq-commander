# lenq-commander

一个自娱自乐的命令行工具

### Install

```
npm install -g lenq-commander
```

### Usage

```
$ lenq -h

  Usage: lenq [options] [command]


  Commands:

    *
    plan|p [method] [content]                   管理您的日常计划
    convert|cvt [htm]                           转换html为js模板文件
    total|t [npmPackage] [startDate] [endDate]  查询npm项目的总下载量
    filter|f [repo] [keyword] [extension]       过滤code在github的仓库上
    search|s [keyword]                          通过搜索引擎搜索内容 [baidu、google], 默认使用baidu搜索引擎
    create|c [directory]                        创建gulp + webpack工程项目
    news|n [keyword]                            获取最新的it新闻
    fy [content]                                输入你要翻译的内容
    serve [name]                                启动webpack-dev-server服务
    compile [name]                              将ES6代码编译为ES5代码
    build [name]                                将ES6代码编译并打包为ES5代码

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

### Other

目前，serve命令还未修复，暂时未能使用，如果您对此项目有兴趣，欢迎Fork!