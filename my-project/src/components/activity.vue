<template>
  <div>
    <div class="activity-header">
      <span v-on:click="hide"><Icon type="close" size=20></Icon></span>
      <span class="shopName">{{activityInfo.shopname}}</span>
    </div>
    <div class="acti-body">
      <h3>{{activityInfo.activityname}}</h3>
      <p>{{activityInfo.activitycontent}}</p>

      <span class="post-time">{{activityInfo.posttime}}</span>
      <div class="img-container" v-for="url in activityInfo.postimgs">
        <img class="img" :src="url">
      </div>
    </div>
    <div class="comments-header">全部评论</div>
    <div class="comments" v-if="Object.keys(activityInfo).length>0">
      <div class="comments-line" v-for="(comment,index) in activityInfo.statics.comments" v-on:click="answear(comment)">
        <span class="person">{{ comment.speaker}}</span>
        <span v-if="comment.accept.length>0">回复</span>
        <span class="person" v-if="comment.accept.length>0">{{comment.accept}}</span>
        <span>：{{comment.content}}</span>
      </div>
    </div>
    <div class="activity-footer">
      <div>
        <Input v-model="commentContent" :placeholder="placeholder">
          <span slot="append" v-on:click="enterComment">
            <Tooltip placement="top" content="输入不能为空" :disabled="showNote">
              <Icon type="chatbubble-working"></Icon>
            </Tooltip>
            </span>
        </Input>
      </div>
      <div class="div2" v-if="Object.keys(activityInfo).length>0">
      <span><Icon type="eye"></Icon>{{activityInfo.statics.watches}}</span>
      <span :class="staticactive"
            v-on:click="changeActivityInfo(userId,'likes')">
             <Icon type="thumbsup"></Icon>{{activityInfo.statics.likes.length}}</span>
      <span :class="collectActive"
            v-on:click="changeActivityInfo(userId,'collections')">
            <Icon type="android-favorite"></Icon>{{activityInfo.statics.collections.length}}</span>
      <span><Icon type="chatbubble-working"></Icon>{{activityInfo.statics.comments.length}}</span>
    </div>
    </div>
  </div>
</template>
<style scoped>
.activity-header{
  width:100%;
  height:3rem;
  background-color: #e3e8ee;
  border-bottom: 1px solid #d7dde4;
  padding: 0.5rem 1rem;
  position: fixed;
  top:0;
  left:0;
  display:flex;
  align-items: center;
}
.shopName{
  font-size: 1.2rem;
  margin-left: 1.5rem;
}
.acti-body{
  margin-top: 3rem;
  padding:1rem;
  font-size: 1rem;
  background-color:#f5f7f9;
}
.post-time{
  font-size: 12px;
  color:orange;
}
.img-container{
  width:100%;
  padding:0.5rem 0.5rem 1.5rem 0.5rem;
  margin: 0.5rem auto;
  background-color:white;
  border: 1px solid #e3e8ee;
}
.img{
  width:100%;
}
.comments-header{
  font-size: 1.2rem;
  background-color: #e3e8ee;
  border-top: 1px solid #d7dde4;
  text-align: center;
  padding:0.5rem;
}
.comments{
  font-size: 1rem;
  padding:1rem;
  margin-bottom: 4rem;
  background-color:#f5f7f9;
}
.comments-line{
  padding:0.5rem;
  border-bottom: 1px solid #e3e8ee;
}
.person{
  color: #3399ff;
}
.activity-footer{
  width: 100%;
  height:4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left:0;
  background-color: #e3e8ee;
  border-top: 1px solid #d7dde4;
  z-index: 1002;
}
.activity-footer .div2{
  flex-grow: 1;
  display:flex;justify-content: space-around;
}
</style>
<script>
import ajax from '../utils/ajax';
export default {
  name: 'activity',
  methods: {
    changeActivityInfo:function(userId,note){
      clearTimeout(this.timer)
      if(note==='likes'){
        let index=this.activityInfo.statics.likes.indexOf(userId)
        if(index>-1){
          this.activityInfo.statics.likes.splice(index,1)
          this.likeActive={}
        }else{
          this.activityInfo.statics.likes.push(userId)
          this.likeActive=this.active
        }
      }else if(note==='collections'){
        let index=this.activityInfo.statics.collections.indexOf(userId)
        if(index>-1){
          this.activityInfo.statics.collections.splice(index,1)
          this.likeActive={}
        }else{
          this.activityInfo.statics.collections.push(userId)
          this.likeActive=this.active
        }
      }
      var that=this
      this.timer=setTimeout(function(){
        var isLike=that.activityInfo.statics.likes.indexOf(that.userId)>-1?true:false
        var isCollected=that.activityInfo.statics.collections.indexOf(that.userId)>-1?true:false
        var data={
          isLikesChange:false,
          isCollectionsChange:false,
          isCommentsChange:false,
          activityId:that.activityId,
          userId:that.userId
        }
        var url='http://localhost:3000/setActivityStatics';
        var handler=function(res){
          var data=JSON.parse(res)
          console.log(data)
        }
        if(isLike!==that.isLike){
          data.isLikesChange=true
        }
        if(isCollected!==that.isCollected){
          data.isCollectionsChange=true
        }
        console.log(data.isLikesChange||data.isCollectionsChange)
        if(data.isLikesChange||data.isCollectionsChange){
          ajax(data,url,'post',handler)
        }
      },2000)
    },
    answear: function (comment) {
      this.commentTarget=comment.speaker
      if(this.commentTarget!==this.userName){
        this.placeholder=this.userName+'回复'+this.commentTarget+':'
      }else{
          this.placeholder='评论'
      }
    },
    enterComment: function () {
      if(!this.commentContent){
        this.showNote=false
      }else{
        this.showNote=true
        var comment={
          speaker: this.userName,
          accept:this.commentTarget,
          content:this.commentContent
        }
        this.activityInfo.statics.comments.push(comment)
        var data={
          isCommentsChange:true,
          comment:comment,
          activityId:this.activityId,
          userId:this.userId
        }
        var url='http://localhost:3000/setActivityStatics';
        var handler=function(res){
          var data=JSON.parse(res)
          console.log(data)
        }
        ajax(data,url,'post',handler)
        this.placeholder='评论'
        this.commentContent=''
        this.commentTarget=''
      }
    },
    hide: function(){
      this.$emit('hide')
    }
  },
  created:function(){
    this.activityId=this.$route.query.id;
    this.userId=this.$route.params.userId
    this.userName=this.$route.params.userName
    // this.currentComment.speaker=this.$route.params.userName
    var that=this
    var data={
      activityId:this.activityId,
      userId:this.userId
    }
    console.log(data)
    var url='http://localhost:3000/activity';
    var handler=function(res){
      var data=JSON.parse(res)
      that.activityInfo=data.activityInfo
      that.isLike=data.isLike
      that.isCollected=data.isCollected
      that.likeActive=that.isLike?that.active:{}
      that.collectActive=that.isCollected?that.active:{}
      console.log(data)
    }
    ajax(data,url,'post',handler)
  },
  data () {
    return {
      timer:null,
      activityInfo:{},
      isLike:false,
      isCollected:false,
      activityId:'',
      userId:'',
      userName:'',
      commentTarget:'',
      commentContent:'',
      currentComment:{
        speaker:'',
        accept:'',
        content:''
      },
      placeholder:'评论',
      showNote: true,
      likeActive:{},
      collectActive:{},
      staticactive:{'active':{'color':'orange'}}
    }
  }
}
</script>
