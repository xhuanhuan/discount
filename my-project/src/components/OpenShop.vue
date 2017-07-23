<template>
  <div>
    <div class="login-header">
      <router-link to="/home">
        <Icon type="chevron-left"></Icon>
          去首页
      </router-link>
      <span class="set" v-on:click="show = true">店铺申请</span>
      <span style="visibility:hidden">占位符</span>
    </div>
    <div class="login-content">
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <Form-item prop="user">
            <Input type="text" v-model="formInline.user" placeholder="请输入店铺名称">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="location">
           <Input v-model="formInline.location" placeholder="详细地址">
               <Icon type="location" slot="prepend"></Icon>
           </Input>
        </Form-item>
        <Form-item>
            <Button type="primary" @click="handleSignIn('formInline')">开店</Button>
        </Form-item>
    </Form>
    </div>
  </div>
</template>
<script>
  import ajax from '../utils/ajax';
    export default {
        name: 'login',
        computed: {

        },
        data () {
            return {
                formInline: {
                    user: '',
                    location: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    location: [{ required: true, message: '请填写地址', trigger: 'blur'}]

                },
                single: false
            }
        },
        methods: {
            handleSignIn: function(name) {
              var that=this;
              var user=this.formInline.user
              var location=this.formInline.location
                this.$refs[name].validate(function(valid){
                    if (valid) {
                      let url=that.myconfig.baseurl+'/openshop';
                      let data={
                        userid:that.$route.query.userid,
                        shopname: user,
                        location:location
                      };
                      console.log(data)
                      let handler=function(res){
                        let data=JSON.parse(res);
                        if(data.openshop==='success'){
                          console.log("申请成功")
                          that.$router.push({path:'/personal'})
                        }else if(data.openshop==='fail'){
                            console.log("申请失败")
                        }else{
                          console.log("someting wrong")
                        }
                      }
                      ajax(data,url,'post',handler)
                    }
                })
            }
        }
    }
</script>
<style scoped>
.login-header{
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
.login-content{
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
