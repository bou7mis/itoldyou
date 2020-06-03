var express = require('express');
var UserProvider = require('./userModel').UserProvider;

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

var userProvider= new UserProvider("mongodb://bou7mis:xxxxx@staff.mongohq.com:10063/itoldyou", 10063);

app.get('/', function(req, res){
    userProvider.findAll(function(error, docs){
        res.render('index.jade', { locals: {
                title: 'Users',
                users:docs
            }
        });
    });
})

git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch app.js \
  --prune-empty --tag-name-filter cat -- --all

app.get('/new', function(req, res) {
    res.render('user_new.jade', { locals: {
            title: 'New User'
        }
    });
});

app.post('/new', function(req, res){
    userProvider.save({
        firstname: req.param('firstname'),
        lastname: req.param('lastname'),
        email: req.param('email')
    }, function( error, docs) {
        res.redirect('/')
    });
});

app.listen(process.env.C9_PORT, '0.0.0.0');