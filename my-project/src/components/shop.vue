<template>
  <div class="shop-container" v-if="!showMap">
    <transition name='loading-done' >
    <div v-if='loading' key='1'>
        <div class='loading'>
          <div class='loading-icon'><Icon type="load-c" size='50' color='#2d8cf0'></Icon></div>
          <div class='loading-text'>loading</div>
        </div>
        <footer-Component></footer-Component>
    </div>
    <div v-else key='2'>
      <div class="shop-back">
        <span v-on:click="back">
           <Button type="text" icon="chevron-left" size="large">返回</Button>
        </span>
        <span>店铺页面</span>
        <span v-on:click="toPostPage" v-if="shopInfo.masterid.length>0&&shopInfo.masterid===userId">
          <Button type="text" icon="ios-compose" size="large">发布</Button>
        </span>
        <span v-else style="visibility:hidden">占位符</span>
      </div>
      <div class="shop-header" >
        <div class="leftpart">
          <img class="head-Img" :src="shopInfo.headimg">
          <span class="shopname">{{shopInfo.shopname}}</span>
        </div>
        <div class="rightpart">
              <div>
                <div style="text-align:center;color:orange">
                  <p>{{shopInfo.fans}}</p>
                  <p>粉丝数</p>
                </div>
                <Button type="ghost" size='small' icon="checkmark"  style="color:#ff9900;border-color:#ff9900;"
                        v-if="isFansTmp"
                        @click="changeShopInfo(userId)">已关注</Button>
                <Button type="info" size='small' icon="plus"
                        v-else @click="changeShopInfo(userId)">加关注</Button>
              </div>
          </div>
      </div>
      <div class="location" v-on:click="showMap=true">
        <Icon type="location" size=20></Icon> {{shopInfo.location}}
      </div>
      <div class="activity-header">活动</div>
      <div v-for="(item, index) in activities">
      <Collects :activityInfo="item" :activities="activities" v-on:toActivitiyPage="toActivitiyPage(item._id)" v-on:remove="removeCollects(index)"></Collects>
      </div>
    </div>
    </transition>
  </div>
  <div v-else><map-Component :addressInfo="shopInfo.location" v-on:hide="showMap=false"></map-Component></div>
</template>
<style scoped>
.shop-back{
  width:100%;
  height:3rem;
  line-height:3rem;
  background-color: rgba(0, 168, 159, 0.6);
  padding:0 5px;
  position: fixed;
  top:0;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.shop-container{
  font-size: 1rem;
}
.shop-header{
  width:100%;
  height:9rem;
  padding: 0 1rem;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495467447278&di=cb96ffa1d9ce351015f48a9dc7accdab&imgtype=0&src=http%3A%2F%2Fp2.gexing.com%2FG1%2FM00%2F94%2F3E%2FrBACJ1Wf1AHR_z0GAAAY0B5Z488547.jpg);
  background-size: contain;
  display:flex;
  justify-content: space-between;
  align-items:flex-end;
}
.head-Img{
  width:4rem;
  height:4rem;
  margin-right: 1rem;
}
.leftpart{
  display: flex;
}
.rightpart{
  margin-bottom: 0.5rem;
}
.shopname{
  font-size: 1.1rem;
}
.activity-header,.location{
  padding: 1rem;
  background-color: #f5f7f9;
  border-bottom: 1px solid #e3e8ee;
}
.collects_container{
  width: 100%;
  height:10rem;
  padding:0 1rem;
  margin-bottom: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e8ee;
}
</style>
<script>
import ajax from '../utils/ajax'
import activity from './activity'
import map from './map'
import footer from './footer'
    export default {
      name: 'shop',
      components: {
        'footer-Component':footer,
        'activity-Component': activity,
        'map-Component':map,
        'Collects': {
          template: `<div class="collects_container" v-on:click="toActivitiyPage">
          <img :src="activityInfo.coverimg" style="width:6rem;height:6rem;">
          <div style="display:flex;flex-direction:column;justify-content:space-between;width:16rem;height:6rem;">
          <div style="height:5rem;overflow:auto;">
              <h4>{{activityInfo.activitycontent[0].title}}</h4>
              <p>{{activityInfo.activitycontent[1].content}}</p>
          </div>
          <div style="display:flex;justify-content:flex-end ">
          <Button type="text" icon="eye" size="small">{{activityInfo.watches}}</Button>
          <Button type="text" icon="thumbsup" size="small">{{activityInfo.statics.likes.length}}</Button>
          <Button type="text" icon="android-favorite-outline" size="small">{{activityInfo.statics.collections.length}}</Button>
          <Button type="text" icon="chatbox-working" size="small">{{activityInfo.statics.comments.length}}</Button>
          </div>
          </div>
          </div>`,
          props: ['activityInfo', 'activities'],
          methods: {
            remove: function () {
              this.$emit('remove')
            },
            toActivitiyPage: function () {
              this.$emit('toActivitiyPage')
            }
          },
        }
      },
      data () {
        return {
          timer:null,
          loading:true,
          shopInfo:{},
          userId:'',
          userName:'',
          activities:[],
          isFans:false,
          isFansTmp:false,
          showMap:false,
        }
      },
      created:function(){
        var shopId=this.$route.query.id;
        var userId=this.$route.params.userId
        var userName=this.$route.params.userName
        this.userId=userId
        this.userName=userName
        var that=this
        var data={
          shopId:shopId,
          userId:userId
        }
        var url=this.myconfig.baseurl+'/shop';
        var handler=function(res){
          var data=JSON.parse(res)
          if(data.getShopInfo==='success'){
            data.shopInfo.fans=data.shopInfo.fans[0]
            that.shopInfo=data.shopInfo
            that.activities=data.activities
            that.isFans=data.isFans
            that.isFansTmp=that.isFans
            that.loading = false
          }else if(data.getShopInfo==='fail'){
            console.log(店铺不存在)
          }else{
            console.log('something wrong')
          }
        }
        ajax(data,url,'post',handler)
      },
      methods: {
        changeShopInfo:function(userId){
          clearTimeout(this.timer)
          this.timer=null
          this.isFansTmp=!this.isFansTmp
          if(this.isFansTmp){
            this.shopInfo.fans++
          }else{
            this.shopInfo.fans--
          }
          var url=this.myconfig.baseurl+'/setShopInfo';
          var handler=function(res){
            var data=JSON.parse(res)
            console.log(data)
          }
          var that=this
          this.timer=setTimeout(function(){
            var data={
              isFansChange:false,
              isFans:false,
              shopId:that.shopInfo._id,
              userId:that.userId
            }
            if(that.isFans!==that.isFansTmp){
              data.isFansChange=true
              that.isFans=that.isFansTmp
              data.isFans=that.isFans
            }
            if(data.isFansChange){
              ajax(data,url,'post',handler)
            }
          },2000)
        },
        back: function(){
          this.$router.go(-1)
        },
        removeCollects: function (index) {
          var activities=[].slice.call(this.shopInfo.activities)
          activities.splice(index,1)
          this.shopInfo.activities=activities
        },
        toActivitiyPage: function (activityId) {
          this.$router.push({name:'activity',query:{id:activityId},params:{userId:this.userId,userName:this.userName}})
        },
        toPostPage: function () {
            this.$router.push({name:'post',query:{shopid:this.$route.query.id}})
        }

      }
    }
</script>
