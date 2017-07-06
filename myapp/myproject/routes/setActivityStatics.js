var express = require('express');
var router = express.Router();
var activity=require('../models/activity');

router.post('/',function(req, res, next){
  var info={};
  res.set('Access-Control-Allow-Origin', '*');
  data=JSON.parse(Object.keys(req.body)[0]);
  activity.findOne({_id:data.activityId},function(err,doc){
    if(err){
      next(err)
    }
    console.log(doc.statics)
    if(doc){
      if(data.isLikesChange){
        let index=doc.statics.likes.indexOf(data.userId)
        if(index>-1){
          doc.statics.likes.splice(index,1)
        }else{
            doc.statics.likes.push(data.userId)
        }
      }
      if(data.isCollectionsChange){
        let index=doc.statics.collections.indexOf(data.userId)
        if(index>-1){
          doc.statics.collections.splice(index,1)
        }else{
            doc.statics.collections.push(data.userId)
        }
      }
      if(data.isCommentsChange){
        doc.statics.comments.push(data.comment)
      }
      doc.save()
      info.setactivityInfo='success'
    }else{
      info.setactivityInfo='fail'
    }
    res.send(JSON.stringify(info));
  })
});
router.post(function(err,req, res, next) {
  let info = {
    setactivityInfo:'err',
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(info));
})
module.exports = router;
