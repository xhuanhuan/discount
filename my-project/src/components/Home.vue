<template>
  <div>
    <transition name='loading-done'>
      <div v-if='loading' key='1'>
        <div class='loading'>
          <div class='loading-icon'><Icon type="load-c" size='50' color='#2d8cf0'></Icon></div>
          <div class='loading-text'>loading</div>
        </div>
      </div>
      <div v-else key='2'>
        <div class="container">
          <div class="header">
            <span calss="city">西安 <Icon type="chevron-down"></Icon></span>
             <Button style="background-color: white;" class="search-btn" type="ghost" shape="circle" icon="ios-search">搜索</Button>
            <Icon size=20 type="ios-bell"></Icon>
          </div>
          <div class="block" v-for="(activity,index) in activities" @click="toActivityPage(activity._id)">
            <div class="userInfo-container">
              <div class="userInfo">
              <div class="head-img-container">
              <img :src="activity.coverimg" class="header-img">
              </div>
              <div class="head-uerInfo"  @click.stop="toShopPage(activity.shopid)">
                <p>{{activity.shopname}}</p>
                <p>{{activity.posttime}}</p>
              </div>
              </div>
              <Button type="ghost" size='small' icon="checkmark" style="float:right;color:#ff9900;border-color:#ff9900;"
                      v-if="userinfo.username?userinfo.shopid.indexOf(activity._id)>-1:0"
                      v-on:click.stop="">已关注</Button>
              <Button type="ghost" size='small' style="float:right;"
                      v-else @click.stop="">关注</Button>
            </div>
             <div class="cover">
               <img :src="activity.coverimg" class="cover-img">
               <div class="activity-Info">
              <p>{{activity.activityname}}</p>
              <p>{{activity.activitycontent}}</p>
            </div>
            </div>
            <div class="control">
              <span class="eye"><Icon size=16 type="eye"></Icon>{{activity.statics.watches}}</span>
              <div>
                <Button type="ghost" shape="circle" class="collection" icon="android-favorite" style="color:#39f;border-color:#39f;"
                        v-if="userinfo.username?userinfo.activityid.indexOf(activity._id)>-1:0"
                        @click.stop="">{{activity.statics.collections}}</Button>
                <Button type="ghost" shape="circle" class="collection" icon="android-favorite-outline"
                        v-else @click.stop="">{{activity.statics.collections}}</Button>
                <Button type="ghost" shape="circle" class="like" icon="thumbsup" style="color:#39f;border-color:#39f;"
                        v-if="userinfo.username?userinfo.thumbsupid.indexOf(activity._id)>-1:0"
                        @click.stop="">{{activity.statics.likes}}</Button>
                <Button type="ghost" shape="circle" class="like" icon="thumbsup"
                        v-else @click.stop="">{{activity.statics.likes}}</Button>
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
import activity from './activity'
import shop from './shop'
import footer from './footer'
import ajax from '../utils/ajax'
export default {
  name: 'home',
  components: {
    'activity-Component': activity,
    'shop-Component': shop,
    'footer-Component':footer
  },
  created:function(){
    ajax(
    {
      usernameToken:window.localStorage.discountToken,
    },
    "http://localhost:3000/home",
    "post",
    (res)=>{
      let resobj = JSON.parse(res);
      this.activities = resobj.activityinfo;
      if(resobj.userinfo){
        this.userinfo = resobj.userinfo;
      }
      console.log(this.userinfo)
      console.log(this.activities)
      this.loading=false
    }).then(function(){
      console.log(123)
    });
  },
  methods: {
    toShopPage:function (shopId) {
      var userId=this.userinfo._id
      var userName=this.userinfo.username
      this.$router.push({name:'shop',query:{id:shopId},params:{userId:userId,userName:userName}})
    },
    toActivityPage: function (activityId) {
      var userId=this.userinfo._id
      var userName=this.userinfo.username
      this.$router.push({name:'activity',query:{id:activityId},params:{userId:userId,userName:userName}})
    }
  },
  data () {
    return {
      loading:true,
      activities:{},
      userinfo:{},
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
  padding-top: 1rem;
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
  height:370px;
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
  height:75%;
  margin:0 auto;
}
.cover-img{
  width:100%;
  height:80%;
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
  padding: 0 5px;
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
