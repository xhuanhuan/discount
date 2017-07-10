<template>
  <div>
    <transition name='loading-done'>
    <div v-if='loading' key='1'>
      <div>
        <div class='loading'>
          <div class='loading-icon'><Icon type="load-c" size='50' color='#2d8cf0'></Icon></div>
          <div class='loading-text'>loading</div>
        </div>
        <footer-Component></footer-Component>
      </div>
    </div>
    <div v-else key='2'>
      <div>
        <div class="activity-header">
          <span v-on:click="back"><Icon type="arrow-left-c" size=20></Icon></span>
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
          <span :class="isLikeTmp?staticactive:''"
                v-on:click="changeActivityInfo(userId,'likes')">
                 <Icon type="thumbsup"></Icon>{{activityInfo.statics.likes}}</span>
          <span :class="isCollectedTmp?staticactive:''"
                v-on:click="changeActivityInfo(userId,'collections')">
                <Icon type="android-favorite"></Icon>{{activityInfo.statics.collections}}</span>
          <span><Icon type="chatbubble-working"></Icon>{{activityInfo.statics.comments.length}}</span>
        </div>
        </div>
      </div>
    </div>
    </transition>
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
  margin-left:10px;
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
.staticactive{
  color:orange;
}

</style>
<script>
import ajax from '../utils/ajax'
import footer from './footer'
export default {
  name: 'activity',
  components:{
    'footer-Component':footer
  },
  methods: {
    changeActivityInfo:function(userId,note){
      clearTimeout(this.timer)
      if(note==='likes'){
        this.isLikeTmp=!this.isLikeTmp
        if(this.isLikeTmp){
          this.activityInfo.statics.likes++
        }else{
          this.activityInfo.statics.likes--
        }
      }else if(note==='collections'){
        this.isCollectedTmp=!this.isCollectedTmp
        if(this.isCollectedTmp){
          this.activityInfo.statics.collections++
        }else{
          this.activityInfo.statics.collections--
        }
      }
      var url='http://localhost:3000/setActivityInfo';
      var handler=function(res){
        var data=JSON.parse(res)
        console.log(data)
      }
      var that=this
      this.timer=setTimeout(function(){
        var data={
          isLikesChange:false,
          isCollectionsChange:false,
          isCommentsChange:false,
          isLike:false,
          isCollected:false,
          activityId:that.activityId,
          userId:that.userId
        }
        if(that.isLike!==that.isLikeTmp){
          data.isLikesChange=true
          that.isLike=that.isLikeTmp
          data.isLike=that.isLike
        }
        if(that.isCollected!==that.isCollectedTmp){
          data.isCollectionsChange=true
          that.isCollected=that.isCollectedTmp
          data.isCollected=that.isCollected
        }
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
          this.commentTarget=''
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
        var url='http://localhost:3000/setActivityInfo';
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
    back: function(){
      this.$router.go(-1)
    }
  },
  created:function(){
    this.activityId=this.$route.query.id;
    this.userId=this.$route.params.userId
    this.userName=this.$route.params.userName
    var that=this
    var data={
      activityId:this.activityId,
      userId:this.userId
    }
    console.log(data)
    var url='http://localhost:3000/activity';
    var handler=function(res){
      var data=JSON.parse(res)
      data.activityInfo.statics.collections=data.activityInfo.statics.collections[0]
      data.activityInfo.statics.likes=data.activityInfo.statics.likes[0]
      that.activityInfo=data.activityInfo
      that.isLike=data.isLike
      that.isCollected=data.isCollected
      that.isLikeTmp=data.isLike
      that.isCollectedTmp=data.isCollected
      console.log(data)
      setTimeout(function(){
        that.loading = false
      },1000)
    }
    ajax(data,url,'post',handler)
  },
  data () {
    return {
      loading:true,
      timer:null,
      activityInfo:{},
      isLike:false,
      isCollected:false,
      isLikeTmp:false,
      isCollectedTmp:false,
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
      staticactive:'staticactive'
    }
  }
}
</script>
