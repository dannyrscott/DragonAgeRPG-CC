/**
 * @from http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
 */

var fs = require('fs');

exports.walk = function(dir, done) { //Parallel
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var pending = list.length;
		if (!pending) return done(null, results);
		list.forEach(function(file) {
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
			if (stat && stat.isDirectory()) {
				walk(file, function(err, res) {
				results = results.concat(res);
				if (!--pending) done(null, results);
				});
			} else {
				results.push(file);
				if (!--pending) done(null, results);
			}
			});
		});
	});
};

exports.walkSerial = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var i = 0;
		(function next() {
			var file = list[i++];
			if (!file) return done(null, results);
			file = dir + '/' + file;
			fs.stat(file, function(err, stat) {
			if (stat && stat.isDirectory()) {
				walk(file, function(err, res) {
				results = results.concat(res);
				next();
				});
			} else {
				results.push(file);
				next();
			}
			});
		})();
	});
};