var express = require('express');
var router = express.Router();
var user=require('../models/user');
var jwt = require('../models/jwt_auth');

router.post('/',function(req, res, next){console.log(1)
  res.set('Access-Control-Allow-Origin', '*');
  var data=JSON.parse(Object.keys(req.body)[0]);
  var username=jwt.decode(data.usernameToken).iss
  console.log(username)
  if(data.usernameToken&&username){
    user.findOne({username:username},function(err,doc){
      if(err){
        next(err)
      }else if(doc){
        doc.location=data.location
        console.log(doc)
        doc.save()
        let info={
          setuserinfo:'success'
        }
        res.send(JSON.stringify(info))
      }else{
        let info={
          setuserinfo:'fail'
        }
        res.send(JSON.stringify(info))
      }
    })
  }
})

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
