var mysql=require('mysql');
var connection=mysql.createPool({

host:'10.47.133.70',
user:'root',
password:'vishnu',
database:'tett'


});
module.exports=connection;