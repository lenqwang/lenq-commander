var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var path = require('path');

function generateTemplate(name) {
	return fs.copyAsync(path.resolve(__dirname, 'template'), name || '.')
		.then(function(err) {
			if(err) return console.error(err);
		});
}

module.exports = generateTemplate;