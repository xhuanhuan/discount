<template>
  <div>
    <div class="post-back">
      <span v-on:click="back">
         <Button type="text" icon="chevron-left" size="large">返回</Button>
      </span>
      <span>发布页面</span>
      <span style="visibility:hidden">占位符占位</span>
    </div>
    <div class="add-content" v-on:click="addContent">
      <Button data-index="1" style="color:white;" class="btn addTitle" type="dashed">标题</Button>
      <Button data-index="2" style="color:white;" class="btn addContent" type="dashed">文本</Button>
      <Button data-index="3" style="color:white;" class="btn addImg" type="dashed"><Icon type="ios-camera-outline" size="24"></Icon></Button>
      <Button data-index="4" style="color:white;" class="btn cover" type="dashed">封面</Button>
      <Button data-index="5" style="color:white;" class="btn post" type="dashed" @click="post">提交</Button>
    </div>
    <div id="text-content">
      <div v-for="(item,index) in mycomponents">
        <addtitle v-if="item==='addtitle'" :index="index" v-on:getinputvalue="gettitle"></addtitle>
        <addtext v-else-if="item==='addtext'" :index="index" v-on:getinputvalue="getcontent"></addtext>
        <addimg v-else :index="index" v-on:getinputimg="getimg"></addimg>
      </div>
    </div>
    <footer-Component></footer-Component>
  </div>
</template>
<script>
import ajax from '../utils/ajax';
import footer from './footer'
import uploadimg from './uploadimg'
    export default {
      name: 'post',
      components: {
        'footer-Component':footer,
        'addtitle': {
          template: `<div class="contentContainer"><label class="note">标题</label>
          <Input v-on:input="changeinput" class="add_input" placeholder="请输入活动标题" >
          </Input></div>`,
        props:['index'],
        methods:{
          changeinput:function(value){
            this.$emit('getinputvalue',{index:this.index,value:value})
          }
        }
        },
        'addtext': {
          template: `<div class="contentContainer"><label class="note">文本域</label>
          <Input v-on:input="changeinput" class="add_input" type="textarea" placeholder="请输入活动内容">
          </Input></div>`,
          props:['index'],
          methods:{
            changeinput:function(value){
              this.$emit('getinputvalue',{index:this.index,value:value})
            }
          }
        },
        'addimg': uploadimg
      },
      methods: {
        back:function(){
          this.$router.go(-1)
        },
        post:function(){
          if(this.inputdata.length===0){
            console.log("内容为空！不能发布")
            return
          }
          if(this.post_click){
            console.log("发布中...请耐心等待")
            return
          }else{
            this.post_click=true
          }
          var promiseArr=[]
          var that=this
          console.log(this.inputdata)
          this.inputdata.forEach(function(item,key){
            if(!(item instanceof Array)){
                that.postdata[key]=item
            }
            if(item instanceof Array){
              let promiseOne=new Promise(function(resolve,reject){
                var files =item.map(function(file){
                  return file.fileinfo;
                })
                if(files.length==0){
                  resolve()
                }
                files.forEach(function(file,index){
                  var data,xhr;
                  data = new FormData();
                  data.append('file',file);
                  xhr = new XMLHttpRequest();
                  xhr.upload.onprogress = function(evt){
                      if (evt.lengthComputable) {
                          var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                          files[index].progress=percentComplete
                      }
                  };
                  xhr.open("post",that.myconfig.baseurl+"/postimg",true)
                  xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        var res=JSON.parse(xhr.responseText)
                        // console.log(res);
                        files[index]=res.url
                        if(index==files.length-1){
                          that.postdata[key]=files
                          resolve()
                        }
                      }else{
                        alert('ajax通信失败 ' + xhr.status)
                      }
                    }
                  }
                  xhr.send(data)
               })
             })//promise_end
             promiseArr.push(promiseOne)
            }
          })
          //post data
          Promise.all(promiseArr).then(function(){
            console.log(that.postdata)
            var data={
              shopid:that.$route.query.shopid,
              activitycontent:that.postdata
            }
            var url=that.myconfig.baseurl+'/post'
            var handler=function(res){
              var data=JSON.parse(res)
              that.post_click=false
              if(data.post==='fail'){
                console.log('发布失败，店铺不存在')
              }else if(data.post==='success'){
                console.log('发布成功')
                that.$router.go(-1)
              }else{
                console.log('something wrong')
              }
            }
            ajax(data,url,'post',handler)
          })
        },
        gettitle:function(obj){
          this.inputdata[obj.index]={title:obj.value}
        },
        getcontent:function(obj){
          this.inputdata[obj.index]={content:obj.value}
        },
        getimg:function(obj){
          this.inputdata[obj.index]=obj.files
        },
        addContent: function (e) {
          var target = e.target
          if (target.type !== 'button') {
            target = target.parentNode
          }
          if (target.type !== 'button') {
            target = target.parentNode
          }
          switch (target.dataset.index) {
            case '1' :
              if(this.mycomponents.length==0){
                this.mycomponents.push('addtitle')
                this.inputdata.push({})
              }
              break
            case '2' :
              this.mycomponents.push('addtext')
              this.inputdata.push({})
              break
            case '3' :
              this.mycomponents.push('addimg')
              this.inputdata.push([])
              break
            case '4' :
              console.log(4)
              break
          }
        },
      } ,
      data () {
        return {
          mycomponents: [],
          inputdata:[],
          postdata:[],
          post_click:false
        }
      }
    }
</script>

<style scoped>
.post-back{
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
.preview{
  background-color: #464c5b;
}
.post{
  background-color: #464c5b;
}
.note{
  margin-right: 1rem;
}
.add_input{
  width:100%;
}
.contentContainer{
  /*background-color: silver;*/
  padding:0.5rem;
  display:flex;
  flex-direction: column;
  align-items: flex-start;
}
.btn{
  width: 4rem;
  height: 4rem;
}
.add-content{
  width: 100%;
  height: 5rem;
  margin-top: 3rem;
  background-color: #657180;
  border: 1px solid #e3e8ee;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#text-content{
  width: 100%;
  background-color: #f5f7f9;
  padding: 1rem 2rem;
  margin-bottom: 4rem;
}
</style>
