var path = require('path');
var fs = require('fs');
var colors = require('colors');

colors.setTheme({
  info: 'green',
  error: 'yellow',
  danger: 'red'
});


module.exports = function(name) {
	if (!/\.html$/.test(name)) {
		return console.log('不是html文件'.error);
	}

	var htmlPath = path.resolve(process.cwd(), name);

	fs.stat(htmlPath, function(err, stat) {
		if (err) return console.log('读取文件失败'.danger);

		if (stat.isFile()) {
			processFile(htmlPath, name.split('.')[0]);
		}
	})
}

function processFile(file, name) {
	fs.readFile(file, function(err, data) {
		if (err) return console.log('读取文件失败', err);

		writeFile(data.toString(), name);
	})
}

function writeFile(content, name) {
	var outputFile = path.resolve(process.cwd(), name +'.js');

	fs.open(outputFile, 'w', function(err, fd) {
		if (err) throw err;

content = 
`(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global['${name}'] = factory());
})(this, function() {
    var ${name} = '${content.replace(/'/g, "\\'").replace(/\r\n|\n/g, '\\n')}';
    
    return ${name};
});`


		fs.write(fd, `${content}`, function(e) {
			if (e) throw e;
			console.log(`成功生成js模板文件：${outputFile}`.info);
			fs.closeSync(fd);
		});
	});
}

