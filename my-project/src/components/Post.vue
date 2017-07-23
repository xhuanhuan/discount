<template>
  <div>
    <div class="add-content" v-on:click="addContent">
      <Button data-index="1" style="color:white;" class="btn addTitle" type="dashed">标题</Button>
      <Button data-index="2" style="color:white;" class="btn addContent" type="dashed">文本</Button>
      <Button data-index="3" style="color:white;" class="btn addImg" type="dashed"><Icon type="ios-camera-outline" size="24"></Icon></Button>
      <Button data-index="4" style="color:white;" class="btn preview" type="dashed" >预览</Button>
      <Button data-index="5" style="color:white;" class="btn post" type="dashed" @click="post">提交</Button>
    </div>
    <div id="text-content">
      <div v-for="(item,index) in mycomponents">
        <addtitle v-if="item==='addtitle'" :index="index" v-on:getinputvalue="gettitle"></addtitle>
        <addtext v-else-if="item==='addtext'" :index="index" v-on:getinputvalue="getcontent"></addtext>
        <addimg v-else></addimg>
      </div>
    </div>
    <footer-Component></footer-Component>
  </div>
</template>
<script>
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
        post:function(){
          console.log(this.inputdata)
        },
        gettitle:function(obj){
          this.inputdata[obj.index]='#title#'+obj.value+'$'
        },
        getcontent:function(obj){
          this.inputdata[obj.index]='#content#'+obj.value+'$'
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
                this.inputdata.push("")
              }
              break
            case '2' :
              this.mycomponents.push('addtext')
              this.inputdata.push("")
              break
            case '3' :
              this.mycomponents.push('addimg')
              this.inputdata.push("")
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
          inputdata:[]
        }
      }
    }
</script>

<style scoped>
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
  /*margin-top: 3rem;*/
  background-color: #657180;
  border: 1px solid #e3e8ee;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
#text-content{
  width: 100%;
  /*min-height: 800px;*/
  background-color: #f5f7f9;
  padding: 1rem 2rem;
  margin-bottom: 4rem;
}
</style>
