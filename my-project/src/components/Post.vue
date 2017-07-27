<template>
  <div>
    <div class="post-back">
      <span v-on:click="back">
         <Button type="text" icon="chevron-left" size="small">返回</Button>
      </span>
      <span>{{postnote}}</span>
      <span style="visibility:hidden">占位符</span>
    </div>
    <div class="add-content" v-on:click="addContent">
      <Button data-index="1" style="color:white;" class="post_btn" type="dashed">小标题</Button>
      <Button data-index="2" style="color:white;" class="post_btn" type="dashed">文本</Button>
      <Button data-index="3" style="color:white;" class="post_btn" type="dashed"><Icon type="ios-camera-outline" size="24"></Icon></Button>
      <!-- <Button data-index="4" style="color:white;" class="post_btn" type="dashed">封面</Button> -->
      <Button data-index="5" style="color:white;" class="post_btn" type="dashed" @click="post">提交</Button>
    </div>
    <div id="text-content">
      <div class="contentContainer"><label class="note">活动标题 <span class="warn">{{title_note}}</span></label>
        <Input v-model="title" class="add_input" placeholder="请输入活动标题" ></Input>
      </div>
      <div class="contentContainer"><label class="note">活动摘要<span class="warn">{{summary_note}}</span></label>
        <Input v-model="summary" class="add_input" placeholder="请输入活动摘要" ></Input>
      </div>
      <div style="display:flex;align-items:center">
        <addcoverimg :FL="coverimg" v-on:getinputimg="getcoverimg"></addcoverimg>
        <span class="warn">{{coverimg_note}}</span></div>
      <div v-for="(item,index) in mycomponents">
        <addtitle v-if="item==='addtitle'" :text="inputdata[index]" :index="index" v-on:getinputvalue="gettitle" v-on:removeComponent="removeComponent"></addtitle>
        <addtext v-else-if="item==='addtext'" :text="inputdata[index]" :index="index" v-on:getinputvalue="getcontent" v-on:removeComponent="removeComponent"></addtext>
        <addimg v-else :FL="inputdata[index]" :index="index" v-on:getinputimg="getimg" v-on:removeComponent="removeComponent"></addimg>
        <!-- <addcoverimg v-else :FL="inputdata[index]" :index="index" v-on:getinputimg="getcoverimg" v-on:removeComponent="removeComponent"></addcoverimg> -->
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
          <div :style="contentContainer_inner">
          <Input :value="text.title||''" v-on:input="changeinput" class="add_input" placeholder="请输入活动标题" ></Input>
          <Button type="text" icon="close-circled" @click="remove"></Button>
          </div>
          </div>`,
          data(){
            return {
              contentContainer_inner:{
                width:'100%',
                display:'flex',
                flexDirection:'row'
              },
              empty_note:{
                display:'none',
                color:'orange'
              }
            }
          },
        props:['index','text'],
        methods:{
          changeinput:function(value){
            this.$emit('getinputvalue',{index:this.index,value:value})
          },
          remove:function(){
            this.$emit('removeComponent',this.index)
          }
        }
        },
        'addtext': {
          template: `<div class="contentContainer"><label class="note">文本域</label>
          <div  :style="contentContainer_inner">
          <Input :value="text.content||''" v-on:input="changeinput" class="add_input" type="textarea" placeholder="请输入活动内容"></Input>
          <Button type="text" icon="close-circled" @click="remove"></Button>
          </div>
          </div>`,
          props:['index','text'],
          data(){
            return {
              contentContainer_inner:{
                width:'100%',
                display:'flex',
                flexDirection:'row'
              }
            }
          },
          methods:{
            changeinput:function(value){
              this.$emit('getinputvalue',{index:this.index,value:value})
            },
            remove:function(){
              this.$emit('removeComponent',this.index)
            }
          }
        },
        'addimg': uploadimg,
        'addcoverimg':{
          template:`<div class="contentContainer">
              <input id='uploadimg_cover' type='file' style='display:none'
                     accept='image/gif,image/jpeg,image/jpg,image/png'
                     @change='filechanged'>
                <label for='uploadimg_cover' style="display:block;width:8rem;height:3rem;line-height:3rem;text-align:center;border-radius:3px;border:1px solid #dddee1">
                <Icon size=20 type="ios-cloud-upload-outline"></Icon>上传封面</label>
              <div :style='filelist'>
                <div class='show-file' v-if="Object.keys(file).length>0">
                  <div class='show-file-image'><img :src="file.value" width='100px' height='100px'></div>
                  <div class='show-file-progress'>{{file.progress}}</div>
                </div>
              </div>
            </div>`,
            props:['FL'],
            created:function(){
              this.file=this.FL.length===1?this.FL[0]:{}
            },
            data () {
              return{
                file:{},
                filelist:{
                  paddingTop:'5px'
                },
                contentContainer_inner:{
                  width:'100%',
                  display:'flex',
                  alignItems:'center'
              //    flexDirection:'row'
                }
              }
            },
            methods:{
              filechanged:function(obj){
                var that = this
                var file = obj.target.files[0]
                console.log(file)

                var reader = new FileReader();
                if(/image/.test(file.type)){
                  reader.readAsDataURL(file);
                  reader.onerror = function(){
                    console.log('上传失败，错误码为:'+reader.error.code);
                  }
                  reader.onload = function(event){
                    that.file={
                      fileinfo:file,
                      value:reader.result,
                      progress:0
                    }
                  that.$emit('getinputimg',{file:that.file})
                  }
                }else {
                  alert("请选择图片文件！");
                }

              }
            }
        }
      },
      methods: {
        checkinput:function(){
          var that=this
          if(this.post_click){
            this.postnote="正在发布...请耐心等待"
            setTimeout(function(){
              that.postnote="发布中..."
            },2000)
            return true
          }else if(this.title.length===0){
            this.postnote="信息不全！不能发布"
            this.title_note="*请填写标题！"
            setTimeout(function(){
              that.postnote="发布页面"
              that.title_note=''
            },2000)
            return true
          }else if(this.summary.length===0){
            this.postnote="信息不全！不能发布"
            this.summary_note="*请填写摘要！"
            setTimeout(function(){
              that.postnote="发布页面"
              that.summary_note=''
            },2000)
            return true
          }else if(this.coverimg.length===0){
            this.postnote="信息不全！不能发布"
            this.coverimg_note="*请填写摘要！"
            setTimeout(function(){
              that.postnote="发布页面"
              that.coverimg_note=''
            },2000)
            return true
          }else{
            var flag=0
            this.inputdata.forEach(function(item,index){
              if(!(item instanceof Array)){
                if(!item.title&&!item.content){
                  flag++
                }else if(item.title&&item.title.length===0){
                  flag++
                }else if(item.content&&item.content.length===0){
                  flag++
                }
              }
            })
            if(flag>0){
              this.postnote="信息填写不全！不能发布"
              setTimeout(function(){
                that.postnote="发布页面"
              },2000)
              return true
            }else{
              this.postdata=[{title:this.title},{content:this.summary},{coverimg:this.coverimg}].concat(this.inputdata)
              this.postnote="发布中..."
              this.post_click=true
              return false
            }
          }
        },
        removeComponent:function(index){
          this.mycomponents.splice(index,1)
          this.inputdata.splice(index,1)
          console.log(this.inputdata)
        },
        back:function(){
          this.$router.go(-1)
        },
        post:function(){
          var that=this
          if(this.checkinput()){
            return
          }
          var promiseArr=[]
          this.postdata.forEach(function(item,key){
            if(item instanceof Array||item.coverimg){
              let promiseOne=new Promise(function(resolve,reject){
                if(item instanceof Array){
                  var files =item.map(function(file){
                    return file.fileinfo;
                  })
                }else{
                  var files =[item.coverimg[0].fileinfo]
                }
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
                          if(item.coverimg){
                            that.postdata[key]={coverimg:files[0]}
                          }else{
                            that.postdata[key]=files
                          }
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
            // console.log(that.inputdata)
            console.log(that.postdata)
            var data={
              shopid:that.$route.query.shopid,
              activitycontent:that.postdata
            }
            var url=that.myconfig.baseurl+'/post'
            var handler=function(res){
              var data=JSON.parse(res)
              if(data.post==='fail'){
                that.post_click=false
                that.postnote='发布失败，店铺不存在'
                setTimeout(function(){
                  that.postnote="发布页面"
                },2000)
              }else if(data.post==='success'){
                that.postnote='发布成功！'
                setTimeout(function(){
                  that.postnote="发布页面"
                  that.$router.go(-1)
                },2000)
              }else{
                that.post_click=false
                that.postnote='发布失败，发送异常，请稍后再发！'
                setTimeout(function(){
                  that.postnote="发布页面"
                },2000)
              }
            }
            // ajax(data,url,'post',handler)
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
        getcoverimg:function(obj){
          this.coverimg=[obj.file]
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
                this.mycomponents.push('addtitle')
                this.inputdata.push({})
              break
            case '2' :
              this.mycomponents.push('addtext')
              this.inputdata.push({})
              break
            case '3' :
              this.mycomponents.push('addimg')
              this.inputdata.push([])
              break
            // case '4' :
            //   this.mycomponents.push('addcoverimg')
            //   this.inputdata.push({})
            //   break
          }
        }
      },
      data () {
        return {
          title:'',
          summary:'',
          coverimg:[],
          mycomponents: [],
          inputdata:[],
          postdata:[],
          post_click:false,
          postnote:'发布页面',
          title_note:'',
          summary_note:'',
          coverimg_note:''
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
.warn{
  color:orange;
}
.add_input{
  width:100%;
}
.contentContainer{
  padding:0.5rem;
  display:flex;
  /*align-items: center;*/
  flex-direction: column;
  align-items: flex-start;
}
.post_btn{
  width: 4rem;
  height: 4rem;
  text-align: center;
  padding:0;
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
.filelist{
  width:100%;
  padding:2% 0;
  display:flex;
  flex-wrap: wrap;
}
</style>
