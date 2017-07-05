<template>
  <div>
    <div class="activity-header">
      <span v-on:click="hide"><Icon type="close" size=20></Icon></span>
      <span class="shopName">{{activityInfo.shopName}}</span>
    </div>
    <div class="acti-body">
      <h3>{{activityInfo.activityName}}</h3>
      <p>{{activityInfo.activityContent}}</p>

      <span class="post-time">{{activityInfo.postTime}}</span>
      <div class="img-container" v-for="url in activityInfo.postImgs">
        <img class="img" :src="url">
      </div>
    </div>
    <div class="comments-header">全部评论</div>
    <div class="comments">
      <div class="comments-line" v-for="(comment,index) in activityInfo.comments" v-on:click="answear(comment)">
        <span class="person">{{ comment.split(':')[0].split('回复')[0]}}</span>
        <span v-if="comment.indexOf('回复')>-1">回复</span>
        <span class="person" v-if="comment.indexOf('回复')>-1">{{comment.split(':')[0].split('回复')[1]}}</span>
        <span>：{{comment.split(':')[1]}}</span>
      </div>
    </div>
    <div class="activity-footer">
      <div>
        <Input v-model="currentComment" :placeholder="placeholder">
          <span slot="append" v-on:click="enterComment">
            <Tooltip placement="top" content="输入不能为空" :disabled="showNote">
              <Icon type="chatbubble-working"></Icon>
            </Tooltip>
            </span>
        </Input>
      </div>
      <span><Icon type="eye"></Icon>{{activityInfo.watchs}}</span>
      <span v-if="activityInfo.likes.indexOf(userName)>-1"
            v-on:click="activityInfo.likes.splice(activityInfo.likes.indexOf(userName),1)"
            style="color:orange"><Icon type="thumbsup"></Icon>{{activityInfo.likes.length}}</span>
      <span v-on:click="activityInfo.likes.push(userName)"
            v-else><Icon type="thumbsup"></Icon>{{activityInfo.likes.length}}</span>
      <span v-on:click="activityInfo.collections.splice(activityInfo.collections.indexOf(userName),1)"
            v-if="activityInfo.collections.indexOf(userName)>-1"
            style="color:orange"><Icon type="android-favorite"></Icon>{{activityInfo.collections.length}}</span>
      <span v-on:click="activityInfo.collections.push(userName)"
            v-else><Icon type="android-favorite-outline"></Icon>{{activityInfo.collections.length}}</span>
      <span><Icon type="chatbubble-working"></Icon>{{activityInfo.comments.length}}</span>
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
export default {
  name: 'activity',
  props: ['activityInfo'],
  methods: {
    answear: function (comment) {
      var target=comment.split(':')[0].split('回复')[0]
      this.placeholder=this.userName+'回复'+target+':'
    },
    enterComment: function () {
      if(this.currentComment.length===0){
        this.showNote=false
      }else{
        this.showNote=true
        if(this.placeholder.indexOf('回复')>-1){
          this.currentComment=this.placeholder+this.currentComment
        }else{
            this.currentComment=this.userName+':'+this.currentComment
        }
        this.activityInfo.comments.push(this.currentComment)
        this.currentComment=''
      }
    },
    hide: function(){
      this.$emit('hide')
    }
  },
  data () {
    return {
      placeholder:'评论',
      currentComment: '',
      userName:'xhh',
      showNote: true
    }
  }
}
</script>
