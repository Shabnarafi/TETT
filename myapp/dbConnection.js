var mysql=require('mysql');
const util = require('util');

let pool = mysql.createPool({
host:'10.47.133.70',
user:'root',
password:'vishnu',
database:'tett'
});
pool.query = util.promisify(pool.query);
module.exports=pool;