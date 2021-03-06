var express = require('express');
var sha1=require('sha1');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');

/* GET users listing. */
router.post('/', function(req, res, next) {
  // res.set('Access-Control-Allow-Origin', '*');
  var data=JSON.parse(Object.keys(req.body)[0]);
  user.find({username:data.username},function(err,doc){
    if(err){
      next(err);
    }
    if(doc.length>0){
      let info = {
        register:'fail',
        token:''
      }
      res.send(JSON.stringify(info));
      // next('user has been exist')
    }else{
      next();
    }
  })
});
router.post('/', function(req, res, next) {
  var data=JSON.parse(Object.keys(req.body)[0]);
  var userone=new user({
    username: data.username,
    password: sha1(data.password),
    activityid:[],
    shopid:[],
    thumbsupid:[],
    myshop : {
       hasshop : false,
       shopid : ""
   },
    personalinfo:{
      birthday : "20170108",
      sex : "male",
      headimg : "http://up.qqjia.com/z/25/tu32741_12.jpg",
      coverimg : "http://img005.hc360.cn/m8/M02/6C/77/wKhQplUUu5qEa2QEAAAAAH710KU373.jpg"
    },
    location:"北京"
  });
  userone.save(function(err,data){
    if(err){
      next(err)
    }else{
      let info = {
        register:'success',
        token:jwt.encode(data.username),
        userid:data._id,
        username:data.username
      }
      res.send(JSON.stringify(info));
   }
 });
});

module.exports = router;
