var express = require('express');
var router = express.Router();
var activity=require('../models/activity');
var userinfo = require('../models/user');
var jwt = require('../models/jwt_auth');
var deepcopy=require('../utils/deepcopy');

/* GET users listing. */
router.get('/', function(req, res, next) {
	activity.find({}, function (err, docs) {
		req.result1 = docs.map((item)=>item.toObject());
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
		req.result1 = docs
	  next();
	});
})
router.post('/',function(req,res,next){
	if(req.body.usernameToken){
		var username=jwt.decode(req.body.usernameToken).iss
		console.log(username)
    userinfo.findOne({username:username},function(err,doc){
    	console.log(doc)
    	req.result2 = doc.toObject();
					console.log(req.result2)
			next()
    })
	}else{
		next()
	}
})
router.post('/',function(req,res,next){
	var info = {};
	if(req.result2){
    	info.userinfo = req.result2
			info.activityinfo = req.result1.map(function(item){
				let isLike=item.statics.likes.indexOf(req.result2._id)>-1?true:false
				let isCollected=item.statics.collections.indexOf(req.result2._id)>-1?true:false
				let likesLen=item.statics.likes.length
				let collectionsLen=item.statics.collections.length
				item=item.toObject()
				item.statics.likes=likesLen
				item.statics.collections=collectionsLen
				item.isLike=isLike
				item.isCollected=isCollected
				item.isLikeTmp=isLike
				item.isCollectedTmp=isCollected
				item.isFans=info.userinfo.shopid.indexOf(item.shopid)>-1?true:false
				item.isFansTmp=item.isFans
				return item
			})
    	res.send(JSON.stringify(info))
	}else{
		info.activityinfo = req.result1.map(function(item){
			item.isLike=false
			item.isCollected=false
			item.isLikeTmp=false
			item.isCollectedTmp=false
			let likesLen=item.statics.likes.length
			let collectionsLen=item.statics.collections.length
			item=item.toObject()
			item.statics.likes=likesLen
			item.statics.collections=collectionsLen
			return item
		});
		info.userinfo = null;
		console.log(info)
		res.send(JSON.stringify(info));
	}
})
module.exports = router;
