var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var path = require('path');

// var root = __dirname.replace(/mycommand\/lib/, 'autogo/');

function generateStructure(project) {
	return fs.copyAsync(path.resolve(__dirname, 'structure'), project)
		.then(function(err) {
			if(err) return console.error(err);
		});
}

module.exports = generateStructure;