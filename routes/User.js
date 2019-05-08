var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/',function(req,res,next){



    User.getAllUsers(function(err,rows){

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