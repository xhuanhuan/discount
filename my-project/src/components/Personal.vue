<template>
<div>
  <div v-if='!loading'>
    <transition name="setPart">
    <div class="setPart" v-if="setShow">
      <div class="set-header"><Button type="text" icon="chevron-left" v-on:click="setShow = false">返回</Button></div>
      <input id='headimg' type='file' style='display:none'
        accept='image/gif,image/jpeg,image/jpg,image/png'
        @change='filechanged'>
      <input id='coverimg' type='file' style='display:none'
        accept='image/gif,image/jpeg,image/jpg,image/png'
        @change='filechanged'
        >
      <Collapse style="border-left:none;border-right:none;">
        <Panel name="1">
          个人资料
          <ul slot="content">
            <li>
              <span>头像</span>
              <div style='position:relative'>
                <img class="head-Img" :src="personalinfo.headimg" />
                <transition name='img-cover'>
                  <div class='img-cover' v-show="uploadimg.headimg.loading">
                  </div>
                </transition>
                <span class='img-progress' v-show="uploadimg.headimg.loading" :style="{width:uploadimg.headimg.progress+'%'}"></span>
              </div>
              <label for='headimg'><Icon size=20 type="camera"></Icon></label>
            </li>
            <li>
              <span>背景</span>
              <div style='position:relative'>
                <img class="head-Img" :src="personalinfo.coverimg" />
                <transition name='img-cover'>
                  <div class='img-cover' v-show="uploadimg.coverimg.loading">
                  </div>
                </transition>
                <span class='img-progress' v-show="uploadimg.coverimg.loading" :style="{width:uploadimg.coverimg.progress+'%'}"></span>
              </div>
              <label for='coverimg'><Icon size=20 type="camera"></Icon></label>
            </li>
            <li><span>性别</span>
              <Select style="width:180px" v-model="personalinfo.sex">
                <Option value="male" key="1">男</Option><Option value="female" key="2">女</Option>
              </Select>
            </li>
            <li><span>生辰</span> <Date-picker type="date" v-model="personalinfo.birthday" style="width: 180px"></Date-picker></li>
            <li><span>常驻</span>
              <Select style="width:180px" :value="personal.userInfo.location" :placeholder="personal.userInfo.location">
                <Option value="北京" key="1">北京</Option>
                <Option value="深圳" key="2">深圳</Option>
                <Option value="西安" key="3">西安</Option>
              </Select>
            </li>
          </ul>
        </Panel>
        <Panel name="2">我的店铺
          <ul v-if="!personal.userInfo.myshop.hasshop" slot="content">
            <li class="openShop-btn" @click.stop="openshop">申请开店</li>
          </ul>
          <ul v-else slot="content">
            <li>
              <span>店铺头像</span>
              <div style='position:relative'>
                <img class="head-Img" :src="personal.userInfo.myshopInfo.coverimg" />
                <div class='img-cover'></div>
              </div>
              <Icon size=20 type="camera"></Icon>
            </li>
            <li><span>店铺背景</span><img class="head-Img" :src="personal.userInfo.myshopInfo.headimg" /><Icon size=20 type="camera"></Icon></li>
            <li><span>店铺名称</span><p>{{personal.userInfo.myshopInfo.shopname}}</p></li>
            <!-- <li><span>创建时间</span> <Date-picker type="date" :value="personal.userInfo.personalinfo.birthday" placeholder="选择日期" style="width: 180px"></Date-picker></li> -->
            <li @click="toShopPage(personal.userInfo.myshop.shopid)"><span>去店铺首页</span><Icon type="chevron-right"></Icon></li>
          </ul>
        </Panel>
      </Collapse>
      <div class="log-out">
        <Button long type="warning" @click="logOut">退出当前登录</Button>
      </div>
    </div>
    </transition>
  </div>
  <transition name='loading-done'>
  <div v-if='loading' key='1'>
    <div class='loading'>
      <div class='loading-icon'><Icon type="load-c" size='50' color='#2d8cf0'></Icon></div>
      <div class='loading-text'>loading</div>
    </div>
  </div>
  <div v-else>
    <div key='2'>
      <div class="setandsistem">
        <span class="set" v-on:click="setShow = true"><Icon type="gear-b"></Icon>设置</span>
        <Icon class="bell" size=20 type="ios-bell"></Icon>
      </div>
      <div class="header" :style='{backgroundImage:`url(${personalinfo.coverimg})`}'>
        <span class="username">{{personal.userInfo.username}}</span>
        <img class="head-Img" :src="personalinfo.headimg">
      </div>
      <div class="user-info">
      <Menu mode="horizontal" :active-name="sellected" style="display:flex;justify-content: space-around;">
          <Menu-item name="1">
            <div v-on:click="sellected = 1">
              <Icon type="eye"></Icon>
              我的关注
            </div>
          </Menu-item>
          <div style="width:1px;height:100%;border-left:1px solid rgb(200, 224, 228);"></div>
          <Menu-item name="2">
            <div v-on:click="sellected = 2">
              <Icon type="android-checkmark-circle"></Icon>
              我的收藏
            </div>
          </Menu-item>
        </Menu>
      </div>
      <div class="app-content" v-if="sellected === 1">
        <div class="block" v-for="(item,index) in personal.shopsInfo" v-on:click="toShopPage(item.shopId)">
        <Follows :shopInfo="item" v-on:remove="removeShop(index)"></Follows>
        </div>
      </div>
      <div class="app-content" v-else>
        <div class="block" v-for="(item, index) in personal.activitiesInfo" v-on:click="toActivityPage(item.activityId)">
        <Collects :activityInfo="item"
                  v-on:remove="removeActivity(index)"
                  v-on:toShop="toShopPage(item.shopId)"></Collects>
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
import login from './Login'
import footer from './footer'
import ajax from '../utils/ajax';
    export default {
      name: 'footer',
      components: {
        'activity-Component': activity,
        'shop-Component': shop,
        'login-Component': login,
        'footer-Component':footer,
        'Follows': {
          template: `<div class="follows_container">
          <div :style="container1">
          <img :src="shopInfo.headImg" :style="headimgStyle">
          <span :style="shopnameStyle">{{shopInfo.shopName}}</span>
          </div>
          <Button shape="circle" v-on:click.stop="remove">取消关注</Button>
          </div>`,
          props: ['shopInfo'],
          methods: {
            remove: function () {
              this.$emit('remove')
            }
          },
          data () {
            return {
              container1: {
                display: 'flex',
                alignItems: 'center'
              },
              headimgStyle: {
                width:'4rem',
                height:'4rem'
              },
              shopnameStyle: {
                fontSize: '1rem',
                marginLeft: '1rem'
              }
            }
          }
        },
        'Collects': {
          template: `<div class="collects_container">
          <img :src="activityInfo.coverImg" style="width:8rem;height:8rem;">
          <div style="width:10rem;height:8rem;overflow:auto">
          <h3 style="color:#5cadff" @click.stop="toShop">{{activityInfo.shopName}}</h3>
          <h4>{{activityInfo.activityName}}</h4>
          <p>{{activityInfo.activityContent}}</p>
          </div>
            <Button icon="close" shape="circle" size="small" v-on:click.stop="remove"></Button>
          </div>`,
          props: ['activityInfo'],
          methods: {
            toShop: function () {
              this.$emit('toShop')
            },
            remove: function () {
              this.$emit('remove')
            }
          },
        }
      },
      computed: {
        toLogin: function () {
          if(window.localStorage.discountToken.length>0){
            return false
          }
          this.$router.push({path:'/login'})
          return false
        }
      },
      created: function(){
        var that=this
        let data={
          userNameToken:localStorage.discountToken
        }
        let url=this.myconfig.baseurl+'/personal';
        let handler=function(res){
          var data=JSON.parse(res)
          that.personal=data
          that.personalinfo = data.userInfo.personalinfo
          that.personalinfo.headimg = that.myconfig.baseurl+that.personalinfo.headimg
          that.personalinfo.coverimg = that.myconfig.baseurl+that.personalinfo.coverimg
          console.log("that.personal",that.personal)
          // setTimeout(function(){
            that.loading = false
          // },1000)
        }
        ajax(data,url,'post',handler)
      },
      methods: {
        openshop:function(){
          this.$router.push({name:'openshop',query:{userid:this.personal.userInfo._id}})
        },
        filechanged:function(obj){
          var that = this
          console.log(obj.target.id)
          console.log(obj.target.files)
          var file = obj.target.files[0]
          var reader = new FileReader();
          if(/image/.test(file.type)){
            reader.readAsDataURL(file);
            reader.onerror = function(){
              console.log('读取失败，错误码为:'+reader.error.code);
            }
            reader.onload = function(event){
              that.personalinfo[obj.target.id] = reader.result
            }

            var data,xhr;
            data = new FormData();
            data.append('file',file);
            data.append("token",localStorage.discountToken)
            data.append("img",obj.target.id)
            xhr = new XMLHttpRequest();
            xhr.upload.onprogress = function(evt){
                if (evt.lengthComputable) {
                  var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                  that.uploadimg[obj.target.id].progress=percentComplete
                }
            };
            xhr.open("post",that.myconfig.baseurl+"/uploadimg",true)
            that.uploadimg[obj.target.id].loading = true
            xhr.onreadystatechange = function(){
              if(xhr.readyState == 4){
                console.log(xhr.responseText);
                var result = JSON.parse(xhr.responseText);
                console.log(result)
                if(result.result=='success'){
                  that.personalinfo[obj.target.id] = that.myconfig.baseurl+result.url
                }else{
                  alert("上传失败");
                }
                that.uploadimg[obj.target.id].loading = false
              }
            }
            xhr.send(data)
          }else {
            reject('err');
            alert("请选择图片文件！");
          }
        },
        uploadimg:function(){
          var that = this
          var files = this.files.map(function(file){
            return file.fileinfo;
          })
          console.log(files)
          files.forEach(function(file,index){
            var data,xhr;
            data = new FormData();
            data.append('file',file);
            xhr = new XMLHttpRequest();
            xhr.upload.onprogress = function(evt){
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                    that.files[index].progress=percentComplete
                }
            };
            xhr.open("post",that.myconfig.baseurl+"/uploadimg",true)
            xhr.onreadystatechange = function(){
              if(xhr.readyState == 4){
                console.log(xhr.responseText);
              }
            }
            xhr.send(data)
          })
        },
        removeShop: function(index){
          var data={
            isFansChange:true,
            isFans:false,
            shopId:this.personal.shopsInfo[index].shopId,
            userId:this.personal.userInfo._id
          }
          var url=this.myconfig.baseurl+'/setShopInfo';
          var that=this
          var handler=function(res){
            var data=JSON.parse(res)
            that.personal.userInfo.shopid.splice(index,1)
            that.personal.shopsInfo.splice(index,1)
            console.log(data)
          }
          ajax(data,url,'post',handler)
        },
        removeActivity:function(index){
          var activity=this.personal.activitiesInfo[index]
          var data={
            isLikesChange:false,
            isCollectionsChange:true,
            isCommentsChange:false,
            isLike:false,
            isCollected:false,
            activityId:activity.activityId,
            userId:this.personal.userInfo._id
          }
          var url=this.myconfig.baseurl+'/setActivityInfo';
          var that=this
          var handler=function(res){
            var data=JSON.parse(res)
            if(data.setactivityInfo==='success'){
              that.personal.userInfo.activityid.splice(index,1)
              that.personal.activitiesInfo.splice(index,1)
            }
            console.log(data)
          }
          ajax(data,url,'post',handler)
        },
        toShopPage: function(shopId){
          var userId=this.personal.userInfo._id
          var userName=this.personal.userInfo.username
          this.$router.push({name:'shop',query:{id:shopId},params:{userId:userId,userName:userName}})
        },
        toActivityPage: function(activityId){
            var userId=this.personal.userInfo._id
            var userName=this.personal.userInfo.username
            this.$router.push({name:'activity',query:{id:activityId},params:{userId:userId,userName:userName}})
        },
        logOut: function () {
          window.localStorage.discountToken=''
          this.$router.push({path:'/login'})
        }
      },
      data () {
        return {
          uploadimg:{
            headimg:{
              progress:0,
              loading:false
            },
            coverimg:{
              progress:0,
              loading:false
            }
          },
          personalinfo:{
            coverimg:"",
            headimg:"",
            sex:"",
            birthday:""
          },
          timer:null,
          loading:true,
          personal:{},
          sellected: '2',
          setShow: false
        }
      }
    }
</script>

<style scoped>
.setPart{
  width:100%;
  background-color: white;
  position:fixed;
  top:0;
  bottom: 0;
  left: 0;
  z-index:1001;
  overflow: auto;
}
li{
  padding:1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e3e8ee;
}
li:last-child{
  border-bottom: transparent;
}
.openShop-btn{
  color: rgb(92, 173, 255);
}
.set-header{
  padding: 1rem;
  border-bottom: 1px solid #e3e8ee;
}
.log-out{
  padding: 1rem;
  text-align: center;
}
.header{
  width:100%;
  height:10rem;
  background-size: 100% 100%;
  margin-top: 3rem;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}
.head-coverImg{
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
.setandsistem{
  width:100%;
  height:3rem;
  background-color: rgba(0, 168, 159, 0.8);
  padding: 0.5rem 1rem;
  position: fixed;
  top:0;
  left:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head-Img{
  width:4rem;
  height:4rem;
  border-radius: 50%;
}
.img-cover{
  width:4rem;
  height:4rem;
  border-radius: 50%;
  display:inline-block;
  background: radial-gradient(grey, white);
  /*background-color: grey;*/
  position:absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  opacity:0.5;
}
.img-progress{
  opacity:0.5;
  background-color: #f90;
  width:2rem;
  height:10px;
  display:inline-block;
  border-radius:5px;
  position:absolute;
  left:0;
  top:50%;
  transform:translateY(-50%);
}
.username{
  font-size: 1rem;
  color: rgba(244,169,122,1);
}
.user-info{
  width:100%;
  border-bottom: 1px solid rgb(200, 224, 228);
}
.my{
  padding: 1rem;
}
.app-content{
  margin-bottom: 4rem;
}
.block{
  background-color: #f5f7f9;
}
.follows_container{
  width: 100%;
  height:6rem;
  padding:0 1rem;
  margin-bottom: 1px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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


.setPart-enter-active {
  animation:setPart-in .5s linear;
}
.setPart-leave-active {
  animation:setPart-out .5s linear;
}
@keyframes setPart-in {
  0% {
    transform: translateX(-375px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes setPart-out {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-375px);
  }
}
.img-cover-enter-active {
  animation: bounce-in .5s reverse;
}
.img-cover-leave-active {
  animation: bounce-in .5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(1);
    opacity:0;
  }
  100% {
    transform: scale(2);
    opacity:0.5;
  }
}

</style>
<style>
.loading{
  position:absolute;
  top:40%;
  left:50%;
  transform:translate(-50%,-50%);
  z-index:100;
}
.loading-text{
  text-align:center;
  font-size:15px;
  color:rgb(45, 140, 240);
}
.loading-icon .ivu-icon-load-c{
  animation:rt 1s linear infinite;
}
@keyframes rt{
　0%{transform:rotate(0deg)}
  50%{transform:rotate(180deg)}
  100%{transform:rotate(360deg)}
}
.loading-done-enter-active{
  animation:in 1s linear;
}
@keyframes in{
  from{opacity:0}
  to{opacity:1}
}
.loading-done-leave{
  transition:opacity 1s;
  opacity:1;
}
.loading-done-leave-active{
  transition:opacity 1s;
  opacity:0;
}
</style>
