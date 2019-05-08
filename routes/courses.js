var express = require('express');
var router = express.Router();
var Course = require('../models/courses');

router.get('/', function(req,res,next){



    Course.getAllCourse(function(err,rows){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
 
    });
});

router.get('/:id', function(req,res,next){

    console.log(req.params.id);

    Course.getCourseById(req.params.id, function(err,rows){
        if(err){
            res.json(err);
        }
        else{
            res.json(rows);
        }
    });
});

router.post('/', function(req,res,next){

    Course.addCourse(req.body,function(err,count){
        
        if(err){
            res.json(err);
        }
        else{
            res.json(req.body);
        }
    });
});

router.post('/addCourses', function(req,res,next){
    Course.addCourses(req.body,function(err,count){
        if(err)
        {
            res.json(err);
        }
        else{
            res.json(count);
        }
    })
    
});

router.delete('/:id',function(req,res,next){

    Course.deleteCourse (req.params.id,function(err,count){

        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(count);
        }

    });
});
router.put('/:name',function(req,res,next){
    console.log(req.params.name);
    console.log(req.body);

    Course.updateCourse(req.params.name,req.body,function(err,rows){
        console.log("hit te router");
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }
    });
});



module.exports = router;