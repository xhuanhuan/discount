var express = require('express');
var router = express.Router();
var user=require('../models/user');
var activity=require('../models/activity');

router.post('/',function(req, res, next){
  // res.set('Access-Control-Allow-Origin', '*');
  req.dataGet=JSON.parse(Object.keys(req.body)[0]);
  activity.findOne({_id:req.dataGet.activityId},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){
      doc.statics.watches=doc.statics.watches+1
      doc.save()
      req.info = {
        getactivityInfo: 'success',
        activityInfo: doc.toObject()
      }
      // req.info.activityInfo.statics=doc.statics.toObject()
    }else{
      req.info = {
        getactivityInfo: 'fail',
        activityInfo: '店铺不存在'
      }
    }
    next()
  })
});
router.post('/',function(req, res, next){
  var activityInfo=req.info.activityInfo
  console.log(activityInfo)
  var userId=req.dataGet.userId
  var isLike=activityInfo.statics.likes.indexOf(userId)>-1?true:false
  var isCollected=activityInfo.statics.collections.indexOf(userId)>-1?true:false
  req.info.isLike=isLike
  req.info.isCollected=isCollected
  req.info.activityInfo.statics.likes=activityInfo.statics.likes.length
  req.info.activityInfo.statics.collections=activityInfo.statics.collections.length
  console.log(req.info.activityInfo.statics)
  res.send(JSON.stringify(req.info));
});

module.exports = router;
