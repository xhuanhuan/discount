var express = require('express');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');
var shop=require('../models/shop');
var activity=require('../models/activity');

router.post('/',function(req, res, next){
  var data=JSON.parse(Object.keys(req.body)[0]);
  var username=jwt.decode(data.userNameToken).iss
  user.findOne({username:username},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){
      req.userInfo=doc.toObject()
      req.userInfo.password=''
      next()
    }else{
      req.userInfo=null
      let info = {
        getPersonalInfo: 'fail',
      }
      res.send(JSON.stringify(info));
    }
  })
});
router.post('/',function(req, res, next){
  var shopsInfo=[];
  if(req.userInfo&&req.userInfo.shopid.length>0){
    req.userInfo.shopid.forEach(function(shopid,index){
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
        if(index===req.userInfo.shopid.length-1){
          req.shopsInfo=shopsInfo
          next()
        }
      })
    })
  }else{
    req.shopsInfo=[]
    next()
  }
});
router.post('/',function(req, res, next){
  console.log(3)
  var activitiesInfo=[];
  console.log(req.userInfo.activityid)
  if(req.userInfo&&req.userInfo.activityid.length>0){
  req.userInfo.activityid.forEach(function(activityid,index){
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
        activitiesInfo.push(activityinfo)
      }else{
        console.log('找不到'+index)
      }
      if(index===req.userInfo.activityid.length-1){
        req.activitiesInfo=activitiesInfo
        next()
      }
    })
  })
}else{
  req.activitiesInfo=[]
  next()
}
});
router.post('/',function(req, res, next){
  console.log(4)
  if(req.userInfo.myshop.hasshop){
    shop.findOne({_id:req.userInfo.myshop.shopid},function(err,doc){
      if(err){
        next(err)
      }else if(doc){
        req.userInfo.myshopInfo=doc.toObject()
      }else{
        req.userInfo.myshopInfo={}
      }
      next()
    })
  }else{
      next()
  }
});
router.post('/',function(req, res, next){
  console.log(5)
  let info={
    getPersonalInfo:'success',
    activitiesInfo:req.activitiesInfo,
    shopsInfo:req.shopsInfo,
    userInfo:req.userInfo
  }
  console.log(info)
  res.send(JSON.stringify(info));
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
