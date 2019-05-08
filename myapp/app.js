var createError = require('http-errors');
var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser= require('body-parser');
const expressJwt = require('express-jwt');
const ayncMiddleware = require('express-async-await');
var ldap = require('ldapjs');
var passport= require('passport');
var LdapStrategy = require('passport-ldapauth');
var OPTS = {
  server: 
  {url: 'ldap://10.47.1.11',
  bindDn: 'CN=temms,OU=Users,DC=ldap,DC=telxsi,DC=com',
  bindCredentials : 'TeMmS#157',
  searchBase : "DC=ldap,DC=telxsi,DC=com",
  searchFilter : '(sAMAccountName={{username}})'                                       
  },
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var courseRouter = require('./routes/courses');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
passport.use(new LdapStrategy(OPTS));
app.use(passport.initialize());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
ayncMiddleware(app);
//require('./routes/users')(app);

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/courses', courseRouter);
app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
  var client = ldap.createClient({
    url: 'ldap://10.47.1.11/CN='+req.body.username+',OU=Users,OU=RNCENTER_A3,OU=TVM,OU=TELXSI ACCOUNTS,DC=ldap,DC=telxsi,DC=com'
  });
  var opts = {
    filter: '(&(objectclass=user)(samaccountname='+req.body.username+'))',
    scope: 'sub',
    attributes: ['objectGUID','sAMAccountName','cn','mail','title','employeeID']
  };

  try {
    client.bind(req.body.username, req.body.password, function (error) {
      console.log(req.body.username);
        if(error){
            console.log("inside error");
            console.log(error.message);
            client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
        } else {
            console.log('connected');
            client.search('OU=Users,OU=RNCENTER_A3,OU=TVM,OU=TELXSI ACCOUNTS,DC=ldap,DC=telxsi,DC=com', opts, function(error, search) {
                console.log('Searching.....');

                search.on('searchEntry', function(entry) {
                    if(entry.object){
                        console.log('entry: %j ' + JSON.stringify(entry.object));
                    }
                    client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
                });

                search.on('error', function(error) {
                    console.error('error: ' + error.message);
                    client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
                });

                // don't do this here
                //client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
            });
        }
    });
  }
  catch(error){
    console.log("error in cath");
    console.log(error);
    client.unbind(function(error) {if(error){console.log(error.message);} else{console.log('client disconnected');}});
}
    res.send({status: 'ok'});
   
  });
//app.use(expressJwt({secret: 'todo-app-super-shared-secret'}).unless({path: ['/users/api/auth']}));
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
