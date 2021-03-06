var express = require('express');
var sha1=require('sha1');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');
var shop=require('../models/shop');

//check user
router.post('/', function(req, res, next) {
  // res.set('Access-Control-Allow-Origin', '*');
  req.dataGet=JSON.parse(Object.keys(req.body)[0]);
  user.findOne({_id:req.dataGet.userid},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){
      next()
    }else{
      let info = {
        openshop:'fail',
        detail:'用户不存在'
      }
      res.send(JSON.stringify(info));
    }
  })
});
//check shop
router.post('/', function(req, res, next) {
  shop.findOne({shopname:req.dataGet.shopname,location:req.dataGet.location},function(err,doc){
    if(err){
      next(err);
    }
    if(doc){
      let info = {
        openshop:'fail',
        detail:'店铺已存在'
      }
      res.send(JSON.stringify(info));
    }else{
      req.userInfo=doc
      next()
    }
  })
});
//new shop
router.post('/', function(req, res, next) {
  var shopone=new shop({
    "masterid":req.dataGet.userid,
    "shopname" : req.dataGet.shopname,
    "headimg" : "http://up.qqjia.com/z/25/tu32741_12.jpg",
    "coverimg" : "http://photos.tuchong.com/33792/f/855658.jpg",
    "location" : req.dataGet.location,
    "activityid" : [],
    "fans" : [],
  })
  shopone.save(function(err,data){
    if(err){
      next(err)
    }else{
      console.log(data)
      req.newshopId=data._id
      next()
    }
  })
});
//add shopid to user & res.send
router.post('/', function(req, res, next) {
  user.findOne({_id:req.dataGet.userid},function(err,doc){
    doc.myshop.hasshop=true
    doc.myshop.shopid=req.newshopId
    doc.save()
    var info = {
      openshop:'success',
      detail:'申请成功'
    }
    res.send(JSON.stringify(info));
  })
});

module.exports = router;
