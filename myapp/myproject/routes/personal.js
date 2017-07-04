var express = require('express');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');
var shop=require('../models/shop');
var activity=require('../models/activity');

var D={};
var userInfo={};
// var shopsInfo=[];
// var activitiesInfo=[];
router.post('/',function(req, res, next){
  res.set('Access-Control-Allow-Origin', '*');
  var data=JSON.parse(Object.keys(req.body)[0]);
  var username=jwt.decode(data.userNameToken).iss
  user.findOne({username:username},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){
      D.userInfo=doc
      D.userInfo.password=''
      next()
    }else{
      let info = {
        getPersonalInfo: 'fail',
      }
      res.send(JSON.stringify(info));
    }
  })
});
router.post('/',function(req, res, next){
  var shopsInfo=[];
  D.userInfo.shopid.forEach(function(shopid,index){
    shop.findOne({_id:shopid},function(err,doc){
      if(err){
        next(err)
      }
      if(doc){
        let shopinfo={}
        shopinfo.shopId=doc._id
        shopinfo.shopName=doc.shopname
        shopinfo.headImg=doc.headimg
        shopsInfo.push(shopinfo)
      }
      if(index===D.userInfo.shopid.length-1){
        D.shopsInfo=shopsInfo
        next()
      }
    })
  })
});
router.post('/',function(req, res, next){
  var activitiesInfo=[];
  D.userInfo.activityid.forEach(function(activityid,index){
    activity.findOne({_id:activityid},function(err,doc){
      if(err){
        next(err)
      }
      if(doc){
        let activityinfo={}
        activityinfo.activityId=doc._id
        activityinfo.shopId=doc.shopid
        activityinfo.shopName=doc.shopname
        activityinfo.activityName=doc.activityname
        activityinfo.activityContent=doc.activitycontent
        activityinfo.coverImg=doc.coverimg
        activitiesInfo.push(activityinfo)
      }
      if(index===D.userInfo.activityid.length-1){
        D.activitiesInfo=activitiesInfo
        next()
      }
    })
  })

});

router.post('/',function(req, res, next){
  D.getPersonalInfo= 'success',
  res.send(JSON.stringify(D));
});
router.post(function(err,req, res, next) {
  let info = {
    register:'err',
    token:''
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(info));
})
module.exports = router;
