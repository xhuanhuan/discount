var express = require('express');
var router = express.Router();
var shop=require('../models/shop');
var user=require('../models/user');

router.post('/',function(req, res, next){
  // res.set('Access-Control-Allow-Origin', '*');
  req.dataGet=JSON.parse(Object.keys(req.body)[0]);
  user.findOne({_id:req.dataGet.userId},function(err,doc){
    if(err){
      next(err)
    }else if(doc){
      console.log(doc)
      req.userInfo=doc
      if(req.dataGet.isFans){
        doc.shopid.push(req.dataGet.shopId)
      }else{
        let index=doc.shopid.indexOf(req.dataGet.shopId)
        doc.shopid.splice(index,1)
      }
      doc.save()
      next()
    }else{
        req.userInfo=null
        let info={setShopInfo:'fail'}
        res.send(info)
    }
  })
})
router.post('/',function(req, res, next){
  var info={};
  shop.findOne({_id:req.dataGet.shopId},function(err,doc){
    if(err){
      next(err)
    }
    if(doc){
      if(req.dataGet.isFans){
        doc.fans.push(req.dataGet.userId)
      }else{
        let index=doc.fans.indexOf(req.dataGet.userId)
        doc.fans.splice(index,1)
      }
      doc.save()
      info.setShopInfo='success'
    }else{
      info.setShopInfo='fail'
    }
    res.send(info)
  })
});

module.exports = router;
