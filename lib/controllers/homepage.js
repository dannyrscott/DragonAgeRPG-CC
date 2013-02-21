exports.index = function(req, res) {
	res.render('home');
}


exports.routes = function() {
	this.get('/', exports.index);
}