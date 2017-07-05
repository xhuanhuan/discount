var express = require('express');
var router = express.Router();
var activity=require('../models/activity');
var userinfo = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
	activity.find({}, function (err, docs) {
		req.result1 = docs;
	    next();
	});
});
router.get('/',function(req,res,next){
    res.send(JSON.stringify(req.result1)+JSON.stringify(req.query));
})

//解读x-www-form-urlencoded信息,重新解读req.body
router.post('/',function(req,res,next){
	req.body = JSON.parse(Object.keys(req.body)[0]);
	next();
})
router.post('/',function(req,res,next){
	activity.find({}, function (err, docs) {
		req.result1 = docs;
	    next();
	});
})
router.post('/',function(req,res,next){
	var info = {};
	if(req.body.username){
        userinfo.find({username:req.body.username},function(err,docs){
        	req.result2 = docs[0];
        	info.activityinfo = req.result1;
        	info.userinfo = req.result2;
        	res.send(JSON.stringify(info));
        })
	}else{
		info.activityinfo = req.result1;
		info.userinfo = null;
		res.send(JSON.stringify(info));
	}
})

module.exports = router;
