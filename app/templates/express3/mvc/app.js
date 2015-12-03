/**
 * Module dependencies.
 */

var express  = require('express'),
    path     = require('path'),
    mongoose = require('mongoose'),
    config   = require('./config');


mongoose.connect(config.database.url);
mongoose.connection.on('error', function () {
  console.log('mongodb connection error');
});

var app = express();

// Bootstrap routes
require('./routes/index')(app);

/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '<%= viewEngine %>');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret code' }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
