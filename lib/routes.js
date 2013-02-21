var folderScan = require('./utilities/folderScan');

function Routes(app, callback) {
	folderScan.walk(process.cwd()+'/lib/controllers', function (err, results) {
		results.forEach(function(v) {
			var curFile = require(v);

			if (typeof curFile == 'object' && typeof curFile.routes != 'undefined') {
				curFile.routes.call(app);
			}
		});
	});
}

module.exports = Routes;