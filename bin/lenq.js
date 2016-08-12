#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var program = require('commander');
var youdao = require('youdao');
var superagent = require('superagent');
var cheerio = require('cheerio');
var colors = require('colors');
var webpack = require('webpack');
var exec = require('child_process').exec;

var gs = require('../lib/generateStructure');
var webpackConfig = require('./webpack.config');

program
  .version(require('../package.json').version);

/**
 * about commander.js doc
 * http://tj.github.io/commander.js/
 */

// program
//   .command('hi')
//   .description('initialize project configuration')
//   .action(function(){
// 		console.log('Hi my Friend!!!');
// });

// program
//   .command('bye [name]')
//   .description('initialize project configuration')
//   .action(function(name){
// 		console.log('Bye ' + name + '. It was good to see you!');
// });
// 
// 

colors.setTheme({
  info: 'green',
  error: 'yellow',
  danger: 'red'
});


program
  .command('*')
  .action(function(env) {
    console.log('您输入的命令不存在!'.error);
  });

// search
program
  .command('search [keyword]')
  .alias('s')
  .description('通过搜索引擎搜索内容 [baidu、google], 默认使用baidu搜索引擎')
  .action(function(keyword, enginName) {
    keyword = typeof keyword === 'object' ? '' : keyword;
    var searchUrl = `https://www.baidu.com/s?wd=${keyword}`;
    if(!!enginName) {
      switch(enginName) {
        case 'baidu':
          searchUrl = `https://www.${enginName}.com/s?wd=${keyword}`;
          break;
        case 'google':
          searchUrl = `https://www.${enginName}.com.hk/?q=${keyword}#safe=strict&q=${keyword}`;
          break;
      }  
    }

    // exec
    exec(`start ${searchUrl}`);
  });

program
  .command('create [directory]')
  .alias('c')
  .description('创建gulp + webpack工程项目')
  .action(function(name){
    gs(name);
    console.log(`恭喜，${name}目录已生成！`.info);
    // terminate(true);
});

// 执行系统命令
// exec('start http://example.com'); 打开网页

// news
program
  .command('news [keyword]')
  .alias('n')
  .description('获取最新的it新闻')
  .action(function(name) {
    var newsUrl = 'http://toutiao.io/';

    if(name) {
      newsUrl = 'http://toutiao.io/search?utf8=%E2%9C%93&q=' + name;
    }

    superagent.get(newsUrl)
      .end(function(err, sres) {
        if(err) {
          console.log('获取内容失败');
        }

        var $ = cheerio.load(sres.text);
        var items = [];

        $('.posts .post').each(function(idx, element) {
          var $element = $(element);
          var $title = $element.find('.title');

          items.push({
            title: $title.text(),
            href: $title.find('a').attr('href')
          });
        });


        for(var item of items) {
          if(name) {
            if(name && item.title.toLowerCase().search(name.toLowerCase()) !== -1) {
              console.log(`${item.title}`.info.dim, ' ', ' ', '->', `(${item.href})`.error);
            }
            else {
              // console.log(`sorry, 找不到和${name}相关的新闻`);
            }
          }
          else {
            console.log(`${item.title}`.info.dim, ' ', ' ', '->', `( ${item.href} )`.error);
          }
        }

      });
  });

// 翻译
program
  .command('fy [content]')
  .description('输入你要翻译的内容')
  .action(function(name) {
    youdao.set({
      keyfrom: 'cnblog',
      key: '1356067187'
    });

    youdao.translate(name, function(e, result) {
      console.log('翻译的结果为： \n\n'+ result);
    });
});

// compile es6 to es5
program
  .command('compile [name]')
  .description('将ES6代码编译为ES5代码')
  .action(function(name) {

    var _dir = 'es5_compiled';

    buildDevWebpack(name, _dir);

    // fs.access(__dirname + _dir, fs.F_OK, function(err) {
    //     if(!err) {
    //          console.log('Connot access this directory or exist this directory please clean the directory'.danger);
    //     }

        

    // });

  });

program
  .command('build [name]')
  .description('将ES6代码编译为ES5代码')
  .action(function(name) {

    var _dir = 'es5_build';

    buildProdWebpack(name, _dir);
    
    // fs.access(__dirname + _dir, fs.F_OK, function(err) {
    //     if(err) {
    //          console.log('Connot access this directory or exist this directory please clean the directory'.danger);
    //     }

        

    // });

  });

program.parse(process.argv);


function buildProdWebpack(name, dir) {
  webpack(webpackConfig(name, {
      output: {
        path: path.resolve(process.cwd(), dir),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].chunk.js'
      },
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            }
        })
      ]
    }), function(err, stats) {
      if(err) {
        console.log(`compile error! ${err}`.error);
      }

      console.log(`Nice, build success! output: ${path.resolve(process.cwd(), dir, name)}`.info);
    });
}

function buildDevWebpack(name, dir) {
  webpack(webpackConfig(name, {
      output: {
        path: path.resolve(process.cwd(), dir),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
      },
      plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            children: true,
            minChunks: 2,
            async: true
        })
      ]
    }), function(err, stats) {
      if(err) {
        console.log(`compile error! ${err}`.error);
      }

      console.log(`Nice, build success! output: ${path.resolve(process.cwd(), dir, name)}`.info);
    });
}


// 原生写法

// var fs = require('fs'),
// 	path = process.cwd();

// var run = function(obj) {
// 	if(obj[0] === '-v') {
// 		console.log('version is 0.0.1');
// 	}
// 	else if(obj[0] === '-h') {
// 		console.log('Usage:');
// 		console.log('	-v --version [show version]');
// 	}
// 	else {
// 		fs.readdir(path, function(err, files) {
// 			if(err) {
// 				return console.log(err);
// 			}
// 			else {
// 				for(var i = 0; i < files.length; i++) {
// 					console.log(files[i]);
// 				}
// 			}
// 		});
// 	}
// };


// run(process.argv.slice(2));