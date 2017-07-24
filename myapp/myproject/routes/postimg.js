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
    var s = req.file.path.replace("public","").replace(/\\/g,"/")
    console.log(s)
    res.send(JSON.stringify({post:'success',url:s}))
})
// 
// router.get('/',function(req,res){
//   res.send('这个地址计划显示静态文件的目录，本功能有待实现')
// })
router.post(function(err,req, res, next) {
  let info = {
    register:'err',
    token:''
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(info));
})
module.exports = router;
