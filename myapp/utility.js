var pool = require('./dbConnection');
var jwt = require('jwt-simple');
var CircularJSON = require('circular-json');

var utility = {
  decodeToken: function(token){
    var token = jwt.decode(token, 'TETT-app-super-shared-secret');
    return token;
  },

  checkTokenValidity: function(token){
  var token = this.decodeToken(token);
  if( Date.now() > token.expiresIn) {
    return false;
    //throw new Error('Token has expired');
    
  }
  return true;

  },

  getUserInfo: async function(token)
  {
    var Token = this.decodeToken(token);
    var tokenValidity = this.checkTokenValidity(token);
    if(tokenValidity){
      var role = await pool.query("SELECT role,username from user_login where username = ?", [Token.username]);
      return role;
    }
    else{
      return null;
    }
  
  }

}
module.exports = utility;