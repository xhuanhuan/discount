var express = require('express');
var router = express.Router();
var user=require('../models/user');
var activity=require('../models/activity');

router.post('/',function(req, res, next){
  res.set('Access-Control-Allow-Origin', '*');
  req.dataGet=JSON.parse(Object.keys(req.body)[0]);
  activity.findOne({_id:req.dataGet.activityId},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){  console.log(doc)
      req.info = {
        getactivityInfo: 'success',
        activityInfo: doc
      }
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
  var userId=req.dataGet.userId
  var isLike=activityInfo.statics.likes.indexOf(userId)>-1?true:false
  var isCollected=activityInfo.statics.collections.indexOf(userId)>-1?true:false
  req.info.isLike=isLike
  req.info.isCollected=isCollected
  res.send(JSON.stringify(req.info));
});
router.post(function(err,req, res, next) {
  let info = {
    getactivityInfo:'err',
    activityInfo:'something wrong'
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(info));
})
module.exports = router;
