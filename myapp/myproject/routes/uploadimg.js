var express = require('express');
var router = express.Router();
var uuidv1 = require('uuid/v1');
var multer = require('multer');
var jwt = require('../models/jwt_auth');
var user=require('../models/user');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv1() + '.'+file.originalname.split('.')[1])
  }
})
var upload = multer({ storage: storage });

router.post('/',upload.single('file'),function(req,res,next){
    var username=jwt.decode(req.body.token).iss
    var img = req.body.img
    var s = req.file.path.replace("public","").replace(/\\/g,"/")
    console.log(username,img,s)
    user.findOne({username:username},function(err,doc){
      if(err){
        console.log(err)
        res.send({
          result:'failed'
        })
      }else{
        doc.personalinfo[img] = s
        doc.save(function(err,data){
          if(err){
            console.log(err)
            res.send({
              result:'failed'
            })
          }else{
            res.send({
              result:"success",
              url:s
            })
          }
        })
      }
    })
})

router.get('/',function(req,res){
  res.send('这个地址计划显示静态文件的目录，本功能有待实现')
})
module.exports = router;
