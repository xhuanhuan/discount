<template>
  <div>
    <transition name='loading-done'>
      <div v-if='loading' key='1'>
        <div class='loading'>
          <div class='loading-icon'><Icon type="load-c" size='50' color='#2d8cf0'></Icon></div>
          <div class='loading-text'>loading</div>
        </div>
      </div>
      <!-- <div v-else-if="pickcity" key='3'>
        <city-Picker v-on:remove="pickcity=false"></city-Picker>
      </div> -->
      <div v-else key='2'>
        <div class="container">
          <div class="header">
            <span calss="city" @click="cityPicker">{{userinfo.location||currentCity}} <Icon type="chevron-down"></Icon></span>
             <Button style="background-color: white;" class="search-btn" type="ghost" shape="circle" icon="ios-search">搜索</Button>
            <Icon size=20 type="ios-bell"></Icon>
          </div>
          <div class="block" v-for="(activity,index) in activities" @click="toActivityPage(activity._id)">
            <div class="userInfo-container">
              <div class="userInfo">
              <div class="head-img-container">
              <!-- <img v-if="activity.shopheadimg.indexOf('http')==-1" :src="myconfig.baseurl+activity.shopheadimg" class="header-img"> -->
              <img :src="activity.shopheadimg.indexOf('http')==-1?myconfig.baseurl+activity.shopheadimg:activity.shopheadimg" class="header-img">
              </div>
              <div class="head-uerInfo"  @click.stop="toShopPage(activity.shopid)">
                <p>{{activity.shopname}}</p>
                <p>{{activity.posttime}}</p>
              </div>
              </div>
              <Button type="ghost" size='small' icon="checkmark" style="float:right;color:#ff9900;border-color:#ff9900;"
                      v-if="userinfo.username?activity.isFansTmp:0"
                      v-on:click.stop="changeShopInfo(userinfo._id,index)">已关注</Button>
              <Button type="ghost" size='small' style="float:right;" icon="plus"
                      v-else @click.stop="changeShopInfo(userinfo._id,index)">加关注</Button>
            </div>
             <div class="cover">
               <div class="cover-img-container">
                 <img :src="myconfig.baseurl+activity.activitycontent[2].coverimg" class="cover-img">
               </div>
               <div class="activity-Info">
              <h5>{{activity.activitycontent[0].title}}</h5>
              <p>{{activity.activitycontent[1].content}}</p>
            </div>
            </div>
            <div class="control">
              <span class="eye"><Icon size=16 type="eye"></Icon>{{activity.statics.watches}}</span>
              <div>
                <Button type="ghost" shape="circle" class="collection" icon="android-favorite" style="color:orange;border-color:orange;"
                        v-if="activity.isCollectedTmp"
                        @click.stop="setStaticsInfo(index,'collections',false)">{{activity.statics.collections}}</Button>
                <Button type="ghost" shape="circle" class="collection" icon="android-favorite-outline"
                        v-else @click.stop="setStaticsInfo(index,'collections',true)">{{activity.statics.collections}}</Button>
                <Button type="ghost" shape="circle" class="like" icon="thumbsup" style="color:orange;border-color:orange;"
                        v-if="activity.isLikeTmp"
                        @click.stop="setStaticsInfo(index,'likes',false)">{{activity.statics.likes}}</Button>
                <Button type="ghost" shape="circle" class="like" icon="thumbsup"
                        v-else @click.stop="setStaticsInfo(index,'likes',true)">{{activity.statics.likes}}</Button>
                <Button type="ghost" shape="circle" class="comment" icon="chatbox-working">{{activity.statics.comments.length}}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <footer-Component></footer-Component>
  </div>
</template>

<script>
import citypicker from './citypicker'
import footer from './footer'
import ajax from '../utils/ajax'
export default {
  name: 'home',
  components: {
    'footer-Component':footer,
    'city-Picker':citypicker
  },
  computed:{
    currentCity:function(){
      return this.$route.params.currentCity
    }
  },
  created:function(){
    var that=this
    ajax(
    {
      usernameToken:window.localStorage.discountToken||'',
    },
    this.myconfig.baseurl+"/home",
    "post",
    (res)=>{
      let resobj = JSON.parse(res);
      this.activities=resobj.activityinfo
      if(resobj.userinfo){
        this.userinfo = resobj.userinfo;
        sessionStorage.discount_userid=this.userinfo._id
        sessionStorage.discount_username=this.userinfo.username
      }
      console.log(this.userinfo,this.activities)
      this.loading=false
    }).then(function(){
      console.log(123)
    });
  },
  methods: {
    cityPicker:function(){
      this.$router.push({name:'citypicker',query:{currentCity:this.userinfo.location||this.currentCity}})
    },
    toShopPage:function (shopId) {
      this.$router.push({name:'shop',query:{id:shopId}})
    },
    toActivityPage: function (activityId) {
      var userId=this.userinfo._id
      var userName=this.userinfo.username
      this.$router.push({name:'activity',query:{id:activityId}})
    },
    changeShopInfo:function(userId,index){
      if(localStorage.discountToken.length===0){
        alert('您还没有登录')
        return
      }
      clearTimeout(this.timer)
      this.timer=null
      this.activities[index].isFansTmp=!this.activities[index].isFansTmp
      var data={
        isFansChange:false,
        isFans:this.activities[index].isFansTmp,
        shopId:this.activities[index].shopid,
        userId:this.userinfo._id
      }
      var url=this.myconfig.baseurl+'/setShopInfo';
      var handler=function(res){
        var data=JSON.parse(res)
        console.log(data)
      }
      var that=this
      this.timer=setTimeout(function(){
        if(that.activities[index].isFans!==that.activities[index].isFansTmp){
          data.isFansChange=true
          that.activities[index].isFans=that.activities[index].isFansTmp
          // data.isFans=that.activities[index].isFans
        }
        if(data.isFansChange){
          ajax(data,url,'post',handler)
        }
      },2000)
    },
    setStaticsInfo:function (index,note,isadd) {
      if(localStorage.discountToken.length===0){
        alert('您还没有登录')
        return
      }
      clearTimeout(this.timer)
      this.timer=null
      if(note==='likes'){
        this.activities[index].isLikeTmp=!this.activities[index].isLikeTmp
        if(this.activities[index].isLikeTmp){
          this.activities[index].statics.likes++
        }else{
          this.activities[index].statics.likes--
        }
      }else if(note==='collections'){
        this.activities[index].isCollectedTmp=!this.activities[index].isCollectedTmp
        if(this.activities[index].isCollectedTmp){
          this.activities[index].statics.collections++
        }else{
          this.activities[index].statics.collections--
        }
      }
      var data={
        isLikesChange:false,
        isCollectionsChange:false,
        isCommentsChange:false,
        isLike:false,
        isCollected:false,
        activityId:this.activities[index]._id,
        userId:this.userinfo._id
      }
      var url=this.myconfig.baseurl+'/setActivityInfo';
      var handler=function(res){
        var data=JSON.parse(res)
        console.log(data)
      }
      var that=this
      this.timer=setTimeout(function(){
        if(that.activities[index].isLike!==that.activities[index].isLikeTmp){
          data.isLikesChange=true
          that.activities[index].isLike=that.activities[index].isLikeTmp
          data.isLike=that.activities[index].isLike
        }
        if(that.activities[index].isCollected!==that.activities[index].isCollectedTmp){
          data.isCollectionsChange=true
          that.activities[index].isCollected=that.activities[index].isCollectedTmp
          data.isCollected=that.activities[index].isCollected
        }
        if(data.isLikesChange||data.isCollectionsChange){
          ajax(data,url,'post',handler)
        }
      },2000)
    }
  },
  data () {
    return {
      timer:null,
      loading:true,
      pickcity:false,
      activities:[],
      userinfo:{},
      isLikeTmp:false,
      isCollectedTmp:false
    }
  }
}
</script>

<style scoped>
.container{
  width:100%;
  margin-top: 4rem;
  margin-bottom:60px;
  background-color: #f5f7f9;
}
.header{
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  padding-top: 0.3rem;
  background-color: rgb(169,200,221);
  color: white;
  position: fixed;
  top:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}
.search-btn{
  width: 70%;
}
.block{
  box-sizing: border-box;
  width:100%;
  background-color: white;
  margin:20px 0;
  padding:5px;
  border-bottom: 1px solid #e3e8ee;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  }
  .userInfo-container{
    height:40px;
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .userInfo{
    height:100%;
    width:80%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .head-img-container{
    width:35px;
    height:35px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 5px;
  }
  .head-uerInfo{
    height:100%;
  }
  .header-img{
    width: 100%;
    height: 100%;
  }
.cover{
  background-color: #f5f7f9;
  width:100%;
  margin:5px auto;
}
.cover-img-container{
  width:100%;
  max-height:250px;
  overflow: hidden;
}
.cover-img{
  width:100%;
}
.control{
  width:100%;
  padding: 0 5px;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.activity-Info{
  width:100%;
  padding: 5px;
}
.eye{
  color: #9ea7b4;
}
.like,.comment,.collection{
  margin-left: 5px;
  color: #9ea7b4;
  padding-top:0;
  padding-bottom: 0;
}
Icon{
  margin:0 2px;
}
</style>
