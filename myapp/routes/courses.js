var express = require('express');
var router = express.Router();
var pool = require('../dbConnection');
var CircularJSON = require('circular-json');
var utility = require('../utility');

/* GET courses listing. */
router.get('/', async (req, res, next) =>  {
    let result = await pool.query('select * from courses');
    result = CircularJSON.stringify(result);
    console.log(result);
    res.send(result);
  });

/* Get course by Id. */
router.get('/:username', async (req, res, next) =>  {
    let token = req.headers.authorization.replace('Bearer ','');
    let validity = utility.checkTokenValidity(token);
    console.log(validity);
    if(validity){
        let result = await pool.query('Select * from courses where admin_id = ?',[req.params.username],async(err,rows)=>{
            if(err){
                res.json(err);
            }
            else{
                res.json(rows);
            }
        });
        result = CircularJSON.stringify(result);
        res.send({statusCode: 200, statusMessage: '', result: result});
    }
    else{
        console.log("in else");
        res.send({statusCode: 401, statusMessage: 'Session Expired'});
    }
    
  });
  /*Insert Course*/
  /*router.post('/', async(req,res,next) =>{
      let result = await pool.query('Insert into courses(course_name,duration,description,created_date,updated_date,author,admin_id)

  





/*var course = {

    getAllCourse: function(callback){
        return db.query("select * from courses", callback);
    },

    getCourseById: function(id, callback){
        return db.query("Select * from courses where id = ?",[id], callback);

    },

    addCourse: function(course, callback){
    console.log(course);
     return db.query("Insert into courses(course_name,duration,description,created_date,updated_date,author,admin_id) values(?,?,?,now(),now(),?,?)",[course.course_name,course.duration,course.description,course.author,course.admin_id],callback);
     },

     addCourses: function(courses, callback){
         courses.forEach(course => {
            return db.query("Insert into courses(course_name,duration,description,created_date,updated_date,author,admin_id) values(?,?,?,now(),now(),?,?)",[course.course_name,course.duration,course.description,course.author,course.admin_id], function(err,result){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                }
            }, callback); 
         });
     },

     deleteCourse:function(id,callback){
        return db.query("delete from courses where Id=?",[id],callback);
    },

    updateCourse:function(name,course,callback){
        console.log(name);
        console.log(course);
        return  db.query("update courses set duration=?,description=?,updated_date=now(),author=?,admin_id=? where course_name = ?",[course.course_name,course.duration,course.description,course.author,course.admin_id,name],callback);
    },

}*/
  
module.exports = router;