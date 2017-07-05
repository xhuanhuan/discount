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
    <div class="comments">
      <div class="comments-line" v-for="(comment,index) in activityInfo.statics.comments" v-on:click="answear(comment)">
        <span class="person">{{ comment.speaker}}</span>
        <span v-if="comment.accept.length>0">回复</span>
        <span class="person" v-if="comment.accept.length>0">{{comment.accept}}</span>
        <span>：{{comment.content}}</span>
      </div>
    </div>
    <div class="activity-footer">
      <div>
        <Input v-model="currentComment.content" :placeholder="placeholder">
          <span slot="append" v-on:click="enterComment">
            <Tooltip placement="top" content="输入不能为空" :disabled="showNote">
              <Icon type="chatbubble-working"></Icon>
            </Tooltip>
            </span>
        </Input>
      </div>
      <span><Icon type="eye"></Icon>{{activityInfo.watchs}}</span>
      <span v-if="activityInfo.statics.likes.indexOf(userId)>-1"
            v-on:click="activityInfo.statics.likes.splice(activityInfo.statics.likes.indexOf(userId),1)"
            style="color:orange"><Icon type="thumbsup"></Icon>{{activityInfo.statics.likes.length}}</span>
      <span v-on:click="activityInfo.statics.likes.push(userId)"
            v-else><Icon type="thumbsup"></Icon>{{activityInfo.statics.likes.length}}</span>
      <span v-on:click="activityInfo.statics.collections.splice(activityInfo.statics.collections.indexOf(userId),1)"
            v-if="activityInfo.statics.collections.indexOf(userId)>-1"
            style="color:orange"><Icon type="android-favorite"></Icon>{{activityInfo.statics.collections.length}}</span>
      <span v-on:click="activityInfo.statics.collections.push(userId)"
            v-else><Icon type="android-favorite-outline"></Icon>{{activityInfo.statics.collections.length}}</span>
      <span><Icon type="chatbubble-working"></Icon>{{activityInfo.statics.comments.length}}</span>
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
</style>
<script>
import ajax from '../utils/ajax';
export default {
  name: 'activity',
  methods: {
    answear: function (comment) {
      this.currentComment.accept=comment.speaker
      if(this.currentComment.accept!==this.currentComment.speaker){
        this.placeholder=this.currentComment.speaker+'回复'+this.currentComment.accept+':'
      }
    },
    enterComment: function () {
      if(!this.currentComment.content){
        this.showNote=false
      }else{
        this.showNote=true
        this.activityInfo.statics.comments.push(this.currentComment)
        this.currentComment={}
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
    this.currentComment.speaker=this.$route.params.userName
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
      console.log(data)
    }
    ajax(data,url,'post',handler)
  },
  data () {
    return {
      activityInfo:{},
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
      showNote: true
    }
  }
}
</script>
