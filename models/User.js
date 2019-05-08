var db = require('../dbconnection');

var User = {

    getAllUsers: function(callback){
        return db.query("select * from user_login", callback);
    }

}
module.exports = User;
