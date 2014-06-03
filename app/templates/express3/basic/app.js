/**
 * Module dependencies.
 */

var express  = require('express'),
    path     = require('path'),
    config   = require('./config'),
    routes   = require('./routes');



var app = express();


/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '<%= viewEngine %>');
app.use(express.compress());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res) {
  res.status(404).render('404', {title: 'Not Found :('});
});

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/products', routes.getProducts);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
