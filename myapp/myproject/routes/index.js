var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var user=require('../models/user');
var shop=require('../models/shop');
var activity=require('../models/activity');
mongoose.connect('mongodb://localhost/discount');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  user.find({}, function (err, docs) {
    console.log(docs);
  });
  shop.find({}, function (err, docs) {
    console.log(docs);
  });
  activity.find({}, function (err, docs) {
    console.log(docs);
  });
});

module.exports = router;
