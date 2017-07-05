var express = require('express');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');
var activity=require('../models/activity');

router.post('/',function(req, res, next){console.log(1)
  res.set('Access-Control-Allow-Origin', '*');
  var data=JSON.parse(Object.keys(req.body)[0]);
  activity.findOne({_id:data.activityId},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){  console.log(doc)
      var info = {
        getactivityInfo: 'success',
        activityInfo: doc
      }
    }else{
      var info = {
        getactivityInfo: 'fail',
        activityInfo: '店铺不存在'
      }
    }
    res.send(JSON.stringify(info));
  })
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
