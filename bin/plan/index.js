var fs = require('fs');
var path = require('path');
var colors = require('colors');
var moment = require('moment');

var timeStimp = moment().format('HH:mm:ss');

var currentFileName = getFilePathByDate();

colors.setTheme({
  info: 'green',
  error: 'yellow',
  danger: 'red'
});


function add(content) {
	fs.open(currentFileName, 'a', function(err, fd) {
		if (err) throw err;

		fs.write(fd, `${timeStimp} : ${content}\r\n`, function(e) {
			if (e) throw e;
			console.log('计划加入成功!'.info);
			fs.closeSync(fd);
		});
	});
}

function list(date) {
	if(date && date.length === 1) {
		var days = getDaysArr(date);

		for(var i = 0; i < days.length; i++) {
			fetchFileContext(days[i]);
		}

		return;
	}

	if (/\d{4}-\d{2}-\d{2}/.test(date)) {
		fetchFileContext(date)

		return;
	}

	fetchFileContext();
}

function fetchFileContext(date) {
	fs.readFile(getFilePathByDate(date), function(err, data) {
		if (err) return console.log(`未记录${date || '今天'}的计划!`.danger);

		console.log(`读取文件结果[${moment(date).format('YYYY-MM-DD')}]：\n`);
		console.log(data.toString().info);
	})
}

function del(date) {
	if(date === '*') {
		var files = fs.readdirSync(__dirname);

		files.forEach(function(file, index) {
			if(/\.txt/.test(file)) {
				var curPath = path.join(__dirname, file);

				fs.stat(curPath, function(err, stats) {
					if (err) return console.log('err: ' + err);

					if(stats.isFile()) {
						fs.unlink(curPath, function() {
							console.log(`成功删除.txt文件: ${curPath}`.info);
						});
					}
				});

				
			}
		});

		return;
	}

	if (/\d{4}-\d{2}-\d{2}/.test(date)) {
		var _path = path.join(__dirname, date);

		if(fs.stat(_path).isFile()) {
			fs.unlink(_path, function() {
				console.log(`成功删除.txt文件: ${_path}`.info);
			});
		}

		return;
	}

	fs.unlink(getFilePathByDate(), function() {
		console.log(`成功删除.txt文件: ${getFilePathByDate()}`.info);
	});
}


module.exports = function(method, content) {

	switch(method) {
		case "add":
			add(content);
			break;

		case "list":
			list(content);
			break;

		case "del":
			del(content);
			break;

		// case "test":
		// 	test(date);
		// 	break;
	}

}


function getFilePathByDate(date) {
	var dateFile = moment(date).format('YYYY-MM-DD');
	return path.join(__dirname, `plan-${dateFile}.txt`);
}

function getDaysArr(n) {
	var tempArr = [];

	for(var i = 1; i <= 7; i++) {
	  var temp = moment().subtract(i, 'days').format('YYYY-MM-DD');
	  tempArr.push(temp);
	}

	return tempArr;
}