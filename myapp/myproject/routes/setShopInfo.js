var express = require('express');
var router = express.Router();
var shop=require('../models/shop');

router.post('/',function(req, res, next){console.log(1)
  var info={};
  res.set('Access-Control-Allow-Origin', '*');
  data=JSON.parse(Object.keys(req.body)[0]);
  console.log(data)
  shop.findOne({_id:data.shopId},function(err,doc){
    if(err){
      next(err)
    }
    if(doc){
      if(data.isFans){
        doc.fans.push(data.userId)
      }else{
        let index=doc.fans.indexOf(data.userId)
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

router.post(function(err,req, res, next) {
  let info = {
    setShopInfo:'err',
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(info));
})
module.exports = router;
