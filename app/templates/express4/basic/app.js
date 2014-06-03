/**
 * Module dependencies.
 */

var express        = require('express'),
    path           = require('path'),
    logger         = require('morgan'),
    bodyParser     = require('body-parser'),
    compress       = require('compression'),
    favicon        = require('static-favicon'),
    methodOverride = require('method-override'),
    errorHandler   = require('errorhandler'),
    config         = require('./config'),
    routes         = require('./routes');



var app = express();

/**
 * Express configuration.
 */
app.set('port', config.server.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '<%= viewEngine %>');

app
  .use(compress())
  .use(favicon())
  .use(logger('dev'))
  .use(bodyParser())
  .use(methodOverride())
  .use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(errorHandler());
}


app.get('/', routes.index);
app.get('/products', routes.getProducts);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
