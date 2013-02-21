var Express = require('express'),
	exphbs = require('express3-handlebars'),
	ExpressNamespace = require('express-namespace'),
	Winston = require('winston'),
	Stylus = require('stylus'),
	Nib = require('nib'),
	path = require('path'),
	_ = require('underscore'),
	Models,
	Routes = require('./routes');


var Application = function Application() {
	var app = this.server = Express();

	var routes = new Routes(app);

	if(Application.caller != getInstance) {
		throw new Error("This object cannot be instantiated");
	}

	require('express-params').extend(app);

	app.configure(function() {
		app.set('host', process.env.HOST || '0.0.0.0');
		app.set('port', process.env.PORT || 3000);
		app.set('views', path.join(__dirname, 'views'));
		app.engine('handlebars', exphbs({}));
		app.set('view engine', 'handlebars');

		app.use(Express.responseTime());
		app.use(Express.favicon());
		app.use(Express.logger('short'));
		app.use(Express.bodyParser());
		app.use(Express.methodOverride());
		app.use(Express.cookieParser('i20vcWjZ8O297p2ZIkfnqJaX0Lgu4UU1'));
		app.use(Express.session({
			secret: process.env.CLIENT_SECRET || '7saxmqZ7EN22kD4Kvi3b42l0IIIQ95h4',
			cookie: {
				maxAge: new Date(Date.now() + 7200000), //2 hours
				httpOnly: false
			}
		}));


		app.use(require('connect-flash').call(this));
		app.use(Express.compress());

		app.use(function(req, res, next) { //make session available to template
			res.locals.session = req.session;
			next();
		});

		app.use(app.router);

		app.use(Stylus.middleware({
			src: path.join(__dirname, 'views/'),
			dest: path.join(__dirname, 'public/'),
			compile: function (str, path) {
				return Stylus(str)
					.set('filename', path)
					.set('compress', true)
					.use(Nib())
					.import('nib');
			}
		}));

		app.use(Express.static(path.join(__dirname, 'public')));
	});

	app.logger = new (Winston.Logger)({
		transports: [
			new (Winston.transports.Console)()
		]
	});

	app.locals.title = 'Dragon Age CC';
	app.locals.pageHeader = 'Dragon Age CC';
	app.locals._ = _;
}

Application.prototype.listen = _.once(function() {
	this.server.listen(this.server.get('port'), this.server.get('host'), function() {
		this.server.logger.info('Server started over port ' + this.server.get('host') + ':' + this.server.get('port'));
	}.bind(this));
});

/**
 * Application getInstance definition
 * @return singleton class
 */
var getInstance = function() {
	if(!global.appinstance) {
		global.appinstance = new Application();
	}
	return global.appinstance;
}

module.exports = getInstance();