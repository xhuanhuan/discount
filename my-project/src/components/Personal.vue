<template>
  <div v-if="toLogin">
  </div>
  <div v-else>
    <div class="setandsistem">
      <span class="set" v-on:click="setShow = true"><Icon type="gear-b"></Icon>设置</span>
      <Icon class="bell" size=20 type="ios-bell"></Icon>
    </div>
    <transition name="setPart">
    <div class="setPart" v-if="setShow">
      <div class="set-header"><Button type="text" icon="chevron-left" v-on:click="setShow = false">返回</Button></div>
      <Collapse style="border-left:none;border-right:none;">
        <Panel name="1">
          个人资料
          <ul slot="content">
            <li><span>头像</span><img class="head-Img" :src="personal.userInfo.personalinfo.headimg" /><Icon size=20 type="camera"></Icon></li>
            <li><span>背景</span><img class="head-Img" :src="personal.userInfo.personalinfo.coverimg" /><Icon size=20 type="camera"></Icon></li>
            <li><span>性别</span>
              <Select style="width:180px" :value="personal.userInfo.personalinfo.sex">
                <Option value="男" key="1">男</Option><Option value="女" key="2">女</Option>
              </Select>
            </li>
            <li><span>生辰</span> <Date-picker type="date" :value="personal.userInfo.personalinfo.birthday" placeholder="选择日期" style="width: 180px"></Date-picker></li>
            <li><span>常驻</span>
              <Select style="width:180px" :value="personal.userInfo.location">
                <Option value="北京" key="1">北京</Option>
                <Option value="深圳" key="2">深圳</Option>
                <Option value="西安" key="3">西安</Option>
              </Select>
            </li>
          </ul>
        </Panel>
        <Panel name="2">我的店铺
          <ul slot="content">
            <li><span>店铺头像</span><img class="head-Img" :src="personal.userInfo.personalinfo.headimg" /><Icon size=20 type="camera"></Icon></li>
            <li><span>店铺背景</span><img class="head-Img" :src="personal.userInfo.personalinfo.headimg" /><Icon size=20 type="camera"></Icon></li>
            <li><span>店铺名称</span><p>earth music旗舰店</p></li>
            <li><span>创建时间</span> <Date-picker type="date" :value="personal.userInfo.personalinfo.birthday" placeholder="选择日期" style="width: 180px"></Date-picker></li>
            <li><router-link to="/shop" style="width:100%;display:flex;justify-content:space-between"><span>去店铺首页</span><Icon type="chevron-right"></Icon></router-link></li>
          </ul>
        </Panel>
      </Collapse>
      <div class="log-out">
        <Button long type="warning" @click="logOut">退出当前登录</Button>
      </div>
    </div>
    </transition>
    <div class="header" :style='{backgroundImage:`url(${personal.userInfo.personalinfo.coverimg})`}'>
      <span class="username">{{personal.userInfo.username}}</span>
      <img class="head-Img" :src="personal.userInfo.personalinfo.headimg">
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
        let url='http://localhost:3000/personal';
        let handler=function(res){
          var data=JSON.parse(res)
          that.personal=data
          console.log(that.personal)
        }
        ajax(data,url,'post',handler)
      },
      methods: {
        removeShop: function(index){
          this.personal.userInfo.shopid.splice(index,1)
          this.personal.shopsInfo.splice(index,1)
        },
        removeActivity:function(index){
          this.personal.userInfo.activityid.splice(index,1)
          this.personal.activitiesInfo.splice(index,1)
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
.username{
  font-size: 1rem;
  color: rgb(244,169,122);
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

</style>
