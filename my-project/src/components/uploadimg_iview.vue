<template>
    <Upload
        :on-success="handleSuccess"
        :on-format-error="handleFormatError"
        multiple
        action="//jsonplaceholder.typicode.com/posts/">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
</template>
<script>
    export default {
      methods:{
        handleSuccess (res, file) {
              // 因为上传过程为实例，这里模拟添加 url
              console.log(file)
          },
          handleFormatError (file) {
            console.log(file)
           }
      }
    }
</script>
