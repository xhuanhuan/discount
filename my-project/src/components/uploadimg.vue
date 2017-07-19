<template>
  <div >
    <input
      id='uploadimg-id'
      type='file'
      multiple
      style='display:none'
      accept='image/gif,image/jpeg,image/jpg,image/png'
      @change='filechanged'>
    <label for='uploadimg-id'><Icon size=20 type="camera"></Icon></label>
    <div class='filelist'>
      <div class='show-file' v-for='(file,index) in files' :key='index'>
        <div class='show-file-image'><img :src="file.value" width='100px' height='100px'></div>
        <div class='show-file-progress'>{{file.progress}}</div>
      </div>
      <Button
        long
        :type="files.length===0?'ghost':'success'"
        :disabled="files.length===0"
        @click='uploadimg'
      >上传</Button>
    </div>
  </div>
</template>

<style scoped>
.filelist{
  width:100%;
  padding:0 2%;
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
let pictures = 0
export default{
  name:'uploadimg',
  created:function(){
  },
  data(){
    return {
      files:[]
    }
  },
  methods:{
    filechanged:function(obj){
      var that = this
      console.log(obj.target.files)
      var files = obj.target.files
      var length = that.files.length;
      [].map.call(files,function(file){
        that.files.push({
          fileinfo:file,
          value:'',
          progress:0
        })
      })
      var start = that.files.length-files.length
      var funcs = [].map.call(files,function(file,index){
        var reader = new FileReader();
        if(/image/.test(file.type)){
          reader.readAsDataURL(file);
          reader.onerror = function(){
            console.log('上传失败，错误码为:'+reader.error.code);
            // progress.innerHTML = '上传失败，错误码为:'+reader.error.code;
          }
          reader.onload = function(event){
            that.files[start+index].value = reader.result
            pictures++
            if(pictures==files.length){
              console.log(files.length)
            }
            // imgcontainer.innerHTML += '<img style="width:100px;height:100px;" src = "'+reader.result+'">';
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

    }
  }
}
</script>
