var Ix = require('ix');

const source = Ix.Enumerable.fromArray([1,2,3]);

module.exports = function() {
	source.forEach(function(x) {
		console.log(`Next: ${x}`);
	});
};