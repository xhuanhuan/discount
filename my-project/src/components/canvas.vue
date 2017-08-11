<template>
  <img class="cutimg" :src="computedUrl">
</template>
<style scoped>
    .cutimg{
        width:100%;
        height:100%;
    }
</style>
<script>
export default{
  name: 'canvas',
  props:['originUrl'],
  data(){
    return {
      computedUrl:''
    }
  },
  created:function(){
    var canvas1 = document.createElement("canvas")
    var cxt1 = canvas1.getContext("2d")
    var srcX
    var srcY
    var sWidth
    var sHeight
    var img = new Image();
    img.src = this.originUrl;
    img.crossOrigin = 'anonymous';
    var that=this
    // that.computedUrl=that.originUrl
    img.onload = function(){
      console.log(1)
    		if(this.width<this.height){
    		srcX=0;
    		srcY=(this.height-this.width)/2
    		sWidth=this.width
    		sHeight=this.width
    		}else{
    		srcX=(this.width-this.height)/2;
    		srcY=0;
    		sWidth=this.height
    		sHeight=this.height
    		}
    		canvas1.width=sWidth
    		canvas1.height=sHeight
    		cxt1.drawImage(img,srcX,srcY,sWidth,sHeight,0,0,sWidth,sHeight);
        var img2 = canvas1.toDataURL();;
        that.computedUrl=img2
        }
    // return this.originUrl
  }

}
</script>
