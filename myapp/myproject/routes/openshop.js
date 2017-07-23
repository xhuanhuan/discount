var express = require('express');
var sha1=require('sha1');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');
var shop=require('../models/shop');

//check user
router.post('/', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
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
    "shopname" : req.dataGet.shopname,
    "headimg" : "http://img5.imgtn.bdimg.com/it/u=3691544771,740678494&fm=23&gp=0.jpg",
    "coverimg" : "http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg",
    "location" : req.dataGet.location,
    "activityid" : [],
    "fans" : [],
  })
  shopone.save(function(err,data){
    if(err){
      next(err)
    }else{
      console.log(data)
      req.newshoId=data._id
      next()
    }
  })
});
//add shopid to user & res.send
router.post('/', function(req, res, next) {
  user.findOne({_id:req.dataGet.userid},function(err,doc){
    doc.myshop.hasshop=true
    doc.myshop.shopid=req.newshoId
    doc.save()
    var info = {
      openshop:'success',
      detail:'申请成功'
    }
    res.send(JSON.stringify(info));
  })
});
router.post(function(err,req, res, next) {
  let info = {
    openshop:'err',
    token:''
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.send(JSON.stringify(info));
})
module.exports = router;
