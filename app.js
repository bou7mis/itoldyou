var express = require('express');
var ArticleProvider = require('./userModel').ArticleProvider;

var app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var userProvider= new UserProvider();

app.get('/', function(req, res){
  userProvider.findAll(function(error, docs){
      res.render('index.jade', { locals: {
        title: 'Users',
        users:docs
        }
    });
  });
})

app.get('/new', function(req, res) {
    res.render('user_new.jade', { locals: {
        title: 'New User'
    }
    });
});

app.post('/new', function(req, res){
    articleProvider.save({
        firstname: req.param('firstname'),
        lastname: req.param('lastname'),
        email: req.param('email')
    }, function( error, docs) {
        res.redirect('/')
    });
});

app.listen(process.env.C9_PORT, '0.0.0.0');