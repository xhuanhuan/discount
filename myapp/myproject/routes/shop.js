var express = require('express');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');
var shop=require('../models/shop');
var activity=require('../models/activity');

var shopInfo={};
var activities=[];
var data={};
router.post('/',function(req, res, next){console.log(1)
  res.set('Access-Control-Allow-Origin', '*');
  data=JSON.parse(Object.keys(req.body)[0]);
  shop.findOne({_id:data.shopId},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){
      shopInfo=doc
      next()
    }else{
      let info = {
        getShopInfo: 'fail',
        shopInfo: '店铺不存在'
      }
      res.send(JSON.stringify(info));
    }
  })
});
router.post('/',function(req, res, next){console.log(2)
  activities=[];
  if(shopInfo.activityid.length===0){
    next()
  }
  shopInfo.activityid.forEach(function(id,index){
    activity.findOne({_id:id},function(err,doc){
      if(err){
        next(err)
      }
      if(doc){
        activities.push(doc)
      }
      if(index===shopInfo.activityid.length-1){
        next()
      }
    })
  })
});
router.post('/',function(req, res, next){console.log(3)
  var isFans=shopInfo.fans.some(function(item){
    return item===data.userId
  })
  let info = {
    getShopInfo: 'success',
    shopInfo: shopInfo,
    activities:activities,
    isFans: isFans
  }
  res.send(JSON.stringify(info));
});
router.post(function(err,req, res, next) {
  let info = {
    getShopInfo:'err',
    shopInfo:'something wrong'
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(info));
})
module.exports = router;
