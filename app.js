
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*
 * Local variables
 */
app.use(function(req, res, next){
  app.locals.session = req.session;
  app.locals.routemap = app.get('routemap');
  req.routemap = app.locals.routemap;
  next();
});

app.set('routemap', require('express-route-mapper'));
app.get('routemap').map(app, 'config');

app.get('/dogs', function(req, res) {
  res.send("List all dogs");
});

console.log("*******")
console.log(app.get('routemap').get('list_photos'));
console.log(app.get('routemap').get('new_photos'));
console.log(app.get('routemap').get('show_photos', 101));
console.log(app.get('routemap').alias('/photos/:photo_id', 'get'));
console.log(app.get('routemap').alias('/photos', 'post'));
console.log("*******")
console.log(app.get('routemap').get('dogs'));
console.log(app.get('routemap').alias('/dogs'));
console.log("*******")



app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
