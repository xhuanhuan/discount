var express = require('express');
var sha1=require('sha1');
var jwt = require('../models/jwt_auth');
var router = express.Router();
var user=require('../models/user');

/* GET users listing. */
router.post('/', function(req, res, next) {
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
    personalinfo:{
      birthday : "20170108",
      sex : "male",
      headimg : "http://file3.u148.net/2014/1/images/1390620015143.jpg",
      coverimg : "http://img3.imgtn.bdimg.com/it/u=3797592229,3840448992&fm=26&gp=0.jpg",
      age : "24"
    }
  });
  userone.save(function(err,data){
    if(err){
      next(err)
    }else{
      let info = {
        register:'success',
        token:jwt.encode(data.username)
      }
      res.send(JSON.stringify(info));
   }
 });
});
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
