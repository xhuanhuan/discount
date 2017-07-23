<template>
  <div class="footer">
  <Menu mode="horizontal" :active-name="active" style="background-color: #e3e8ee;display:flex;justify-content: space-around;">
    <router-link to="/home">
      <Menu-item name="1">
        <Icon type="home"></Icon>
        首页
      </Menu-item>
    </router-link>
    <div class="divider"></div>
    <!-- <router-link to="/post">
      <Menu-item name="2" v-if="true">
        <Icon type="compose"></Icon>
        发布
      </Menu-item>
    </router-link> -->
    <router-link :to="personal">
      <Menu-item name="3">
          <Icon type="person"></Icon>
          我的
      </Menu-item>
    </router-link>
  </Menu>
</div>
</template>
<script>
    export default {
      name: 'footer',
      computed: {
        active: function () {
          var active
          switch(window.location.hash){
            case '#/home':active='1';break;
            case '#/post':active='2';break;
            case '#/personal':active='3';break;
          }
          return active
        }
    },
    data(){
      return {
        personal:''
      }
    },
    beforeMount:function(){
      if(window.localStorage.discountToken){
        this.personal = "/personal"
      }else{
        this.personal = '/login'
      }
    }
  }
</script>

<style>
.footer{
  display: block;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #d7dde4;
}
.divider{
  width:1px;
  background-color: #bbbec4;
  margin: 10px 0;
}
</style>
