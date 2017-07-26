var express = require('express');
var sha1=require('sha1');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var shop=require('../models/shop');
var activity=require('../models/activity');

//find shop
router.post('/', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  var data=JSON.parse(Object.keys(req.body)[0]);
  req.dataGet=data
  shop.findOne({_id:data.shopid},function(err,doc){
    if(err){
      next(err)
    }else if(doc){
      req.shop=doc
      req.dataGet.shopname=doc.shopname
      req.dataGet.shopheadimg=doc.headimg
      next()
    }else{
      let info={
        post:'fail'
      }
      res.send(JSON.stringify(info))
    }
  })
});
//new ativity and add it to shop.activityid
router.post('/', function(req, res, next) {
  var activityOne=new activity({
    shopid:req.dataGet.shopid,
    shopname:req.dataGet.shopname,
    shopheadimg:req.dataGet.shopheadimg,
    activitycontent: req.dataGet.activitycontent,
    posttime:'2017/12/21 12:21:23',
    statics:{
      watches:0,
      collections:[],
      likes:[],
      comments:[]
    }
  })
  activityOne.save(function(err,data){
    if(err){
      next(err)
    }else{
      console.log(data)
      req.shop.activityid.push(data._id)
      req.shop.save()
      next()
    }
  })
});
//res.send
router.post('/', function(req, res, next) {
  let info={
    post:'success'
  }
  res.send(JSON.stringify(info))
})
router.post(function(err,req, res, next) {
  let info = {
    register:'err',
    token:''
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.send(JSON.stringify(info));
})
module.exports = router;
