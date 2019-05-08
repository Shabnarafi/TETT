var db = require('../dbconnection');

var course = {

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

}
module.exports = course;