var express = require('express');
var router = express.Router();
var pool = require('../dbConnection');
var CircularJSON = require('circular-json');
var jwt = require('jwt-simple');
var utility = require('../utility');

/* GET users listing. */
router.get('/', async (req, res) =>  {
  let result = await pool.query('SELECT * FROM user_login');
  result = CircularJSON.stringify(result);
  res.send(result);
});

router.post('/api/auth', async (req, res) => {
  let body = req.body;
  let user = await pool.query("SELECT * from user_login where username = ?", [body.username]);
  if(!user || body.password != body.username) return res.sendStatus(401);
  let now_date = new Date();
  now_date.setMinutes(now_date.getMinutes()+1);
  var token = jwt.encode({username: body.username, expiresIn: now_date.getTime()}, 'TETT-app-super-shared-secret');
  let userInfo = await utility.getUserInfo(token);
  if(userInfo!== null){
    res.send({statusCode: 200, statusMessage: '', token: token, role: {role: userInfo[0]['role'],username: userInfo[0]['username']}});
    //res.send({token: token, role: {role: userInfo[0]['role'],username: userInfo[0]['username']}});
  }
  else{
    res.send({statusCode: 401, statusMessage: 'User UnAuthorised'});
  }
  
});

module.exports = router;
