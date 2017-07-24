<template>
  <div class="contentContainer">
    <input
      :id='uploadimg_id'
      type='file'
      multiple
      style='display:none'
      accept='image/gif,image/jpeg,image/jpg,image/png'
      @change='filechanged'>
    <label :for='uploadimg_id' style="display:block;width:8rem;height:3rem;line-height:3rem;text-align:center;border-radius:3px;border:1px solid #dddee1"><Icon size=20 type="ios-cloud-upload-outline"></Icon>上传图片</label>
    <div class='filelist'>
      <div class='show-file' v-for='(file,index) in files' :key='index'>
        <div class='show-file-image'><img :src="file.value" width='100px' height='100px'></div>
        <div class='show-file-progress'>{{file.progress}}</div>
      </div>
      <!-- <Button
        long
        :type="files.length===0?'ghost':'success'"
        :disabled="files.length===0"
        @click='uploadimg'
      >上传</Button> -->
    </div>
  </div>
</template>

<style scoped>
.contentContainer{
  /*background-color: silver;*/
  padding:0.5rem;
  display:flex;
  flex-direction: column;
  align-items: flex-start;
}
.filelist{
  width:100%;
  padding:2% 0;
  display:flex;
  flex-wrap: wrap;
}
.show-file{
  width:33.33%;
}
.show-file-name{
  text-overflow:ellipsis;
  overflow:hidden;
}
.show-file-image{
  text-align:center;
}
</style>

<script>
export default{
  name:'uploadimg',
  props:['index'],
  computed:{
    uploadimg_id:function(){
      var s=''
      s=s+'uploadimg-'+this.index.toString()
      return s
    }
  },
  created:function(){
  },
  data(){
    return {
      // index:0,
      files:[]
    }
  },
  methods:{
    filechanged:function(obj){
      var that = this
      // console.log(obj.target.files)
      var files = obj.target.files
      var funcs = [].map.call(files,function(file,index){
        var reader = new FileReader();
        if(/image/.test(file.type)){
          reader.readAsDataURL(file);
          reader.onerror = function(){
            console.log('上传失败，错误码为:'+reader.error.code);
          }
          reader.onload = function(event){
            that.files.push({
              fileinfo:file,
              value:reader.result,
              progress:0
            })
            if(index+1==files.length){
              // console.log(that.files.length)
              that.$emit('getinputimg',{index:that.index,files:that.files})
            }
          }
        }else {
          alert("请选择图片文件！");
        }
      })
    },
    uploadimg:function(){
      var that = this
      var files = this.files.map(function(file){
        return file.fileinfo;
      })
      // console.log(files)
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
        xhr.open("post",that.myconfig.baseurl+"/postimg",true)
        xhr.onreadystatechange = function(){
          if(xhr.readyState == 4){
            if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
              var res=JSON.parse(xhr.responseText)
              console.log(res);
              that.files[index]=res.url
              console.log(index)
            }else{
              alert('ajax通信失败 ' + xhr.status)
            }
          }
        }
        xhr.send(data)
      })
    }
  }
}
</script>
