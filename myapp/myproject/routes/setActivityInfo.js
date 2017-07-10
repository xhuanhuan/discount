var express = require('express');
var router = express.Router();
var activity=require('../models/activity');
var user=require('../models/user');

router.post('/',function(req, res, next){
  res.set('Access-Control-Allow-Origin', '*');
  req.dataGet=JSON.parse(Object.keys(req.body)[0]);
  user.findOne({_id:req.dataGet.userId},function(err,doc){
    if(err){
      next(err)
    }else if(doc){
      req.userInfo=doc
      if(req.dataGet.isLikesChange){
        if(req.dataGet.isLike){
          doc.thumbsupid.push(req.dataGet.activityId)
        }else{
            let index=doc.thumbsupid.indexOf(req.dataGet.activityId)
            doc.thumbsupid.splice(index,1)
        }
      }
      if(req.dataGet.isCollectionsChange){
        if(req.dataGet.isCollected){
          doc.activityid.push(req.dataGet.activityId)
        }else{
          let index=doc.activityid.indexOf(req.dataGet.activityId)
          doc.activityid.splice(index,1)
        }
      }
      doc.save()
    }else{
      req.userInfo=null
    }
    next()
  })
})
router.post('/',function(req, res, next){
  var info={};
  if(req.userInfo){
    activity.findOne({_id:req.dataGet.activityId},function(err,doc){
      if(err){
        next(err)
      }
      if(doc){
        if(req.dataGet.isLikesChange){
          if(req.dataGet.isLike){
            doc.statics.likes.push(req.dataGet.userId)
          }else{
              let index=doc.statics.likes.indexOf(req.dataGet.userId)
              doc.statics.likes.splice(index,1)
          }
        }
        if(req.dataGet.isCollectionsChange){
          if(req.dataGet.isCollected){
            doc.statics.collections.push(req.dataGet.userId)
          }else{
            let index=doc.statics.collections.indexOf(req.dataGet.userId)
            doc.statics.collections.splice(index,1)
          }
        }
        if(req.dataGet.isCommentsChange){
          doc.statics.comments.push(req.dataGet.comment)
        }
        doc.save()
        info.setactivityInfo='success'
      }else{
        info.setactivityInfo='fail'
      }
      res.send(JSON.stringify(info));
    })
  }else{
      info.setactivityInfo='fail'
      res.send(JSON.stringify(info));
  }
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
