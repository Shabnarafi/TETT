var express = require('express');
var app = express();
var cors = require('cors');
var User=require('./routes/User');
var Course=require('./routes/courses');
var bodyParser= require('body-parser');
var passport= require('passport');
var LdapStrategy = require('passport-ldapauth');
var OPTS = {
    server: 
    {url: 'ldap://10.47.1.3',
    bindDn: 'CN=shabna.r,OU=Users,DC=ldap,DC=telxsi,DC=com',
    bindCredentials : '',
    searchBase : "DC=ldap,DC=telxsi,DC=com",
    searchFilter : '(sAMAccountName={{username}})'                                       
    },
  };
passport.use(new LdapStrategy(OPTS));  
app.use(express.static("TeOnlineCourseTracker")); // myApp will be the same folder name.
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/users', User);
app.use('/course', Course);
app.post('/login', passport.authenticate('ldapauth', {session: true}), function(req, res) {
  console.log(req.body);
    res.send({status: 'ok'});
   
  });

app.listen(8080, 'localhost');

console.log('Server is Listening on port 8080');