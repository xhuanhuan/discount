var express = require('express');
var router = express.Router();
var uuidv1 = require('uuid/v1');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, uuidv1() + '.'+file.originalname.split('.')[1])
  }
})
var upload = multer({ storage: storage });

router.post('/',function(req,res,next){
  next()
},function(req,res,next){
  next()
},upload.single('file'),function(req,res,next){
  console.log(req.file)
  res.send("123")
})

router.get('/',function(req,res){
  res.send('123')
})
module.exports = router;
