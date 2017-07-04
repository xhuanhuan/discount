<template>
  <div>
  <el-amap-search-box class="search-box" style="display:none"
                      :search-option="searchOption"
                      :on-search-result="onSearchResult"
                      :events="search"></el-amap-search-box>
  <div class="amap-wrapper" :style="screenheight">
     <el-amap :plugin="plugin" :center="mapCenter" amapManager="AmapManager">
       <div v-for="(mark,index) in markers">
          <el-amap-marker animation="AMAP_ANIMATION_DROP"
                          :position="mark.location"
                          :title="mark.name"
                          :icon="mark.icon"
                          :events="toThisPlace">
          </el-amap-marker>
       </div>
          <el-amap-polyline :path="plan" strokeColor="red"></el-amap-polyline>
     </el-amap>
   </div>
     <div v-on:click="Geolocation" class="Geolocation"><Button type="info" shape="circle" icon="ios-navigate"></Button></div>
   <div class="toolbar">
     <span v-on:click="hide"><Icon type="close" size=20></Icon></span>
       <Select v-model="transSelected" @on-change="changeTrans" :disabled="transSelectedDisabled" style="width:100px">
         <Option v-for="item in transList" :value="item.value" :key="item">{{ item.label }}</Option>
       </Select>
       <Select v-model="planSelected" @on-change="changePlan" :disabled="planSelectedDisabled" style="width:100px">
         <Option v-for="item in plansList" :value="item.value" :key="item">{{ item.label }}</Option>
       </Select>
       <div v-on:click="showPanel=!showPanel"><Icon type="ios-paw" size="25" color="orange"></Icon></div>
    </div>
    <div id="panel" v-on:click="clickPanel" v-show="showPanel"></div>
 </div>
</template>

<script>
export default{
  props: ['addressInfo'],
  computed:{
    screenheight:function(){
      return {
        height:document.body.offsetHeight+'px'
      }
    }
  },
  data(){
     let self = this
    return{
    showPanel:true,
    planSelectedDisabled:true,
    transSelectedDisabled:true,
    toPlace:[],
    search:{
      init(o) {
         let Msearch=o.placeSearch
         Msearch.search(self.addressInfo,function(status, result){
           let pois=result.poiList.pois
           let latSum = 0;
           let lngSum = 0;
           self.markers=[]
           if (pois.length > 0) {
             pois.forEach(poi => {
                let {lng, lat} = poi.location;
               lngSum += lng;
               latSum += lat;
               self.markers.push({location:[lng, lat],name:poi.name});
             });
             let center = {
               lng: lngSum / pois.length,
               lat: latSum / pois.length
             };
             self.mapCenter = [center.lng, center.lat];
           }
         })
       }
    },
    toThisPlace:{
      dblclick(e){
        var location=e.target.G.position
        self.markers=self.markers.map(function(item){
          let location1=item.location
          if(location.lng===location1[0]&&location.lat===location1[1]){
            item.icon='https://raw.githubusercontent.com/xhuanhuan/Happy-Shopping/master/src/assets/end.png'
            self.toPlace=item.location
            self.transSelectedDisabled=false
          }else{
            item.icon=''
          }
          return item
        })
      }
    },
    transSelected:'',
    transList:[
      {
          value: '1',
          label: '公交'
      },
      {
          value: '2',
          label: '驾车'
      },
      {
          value: '3',
          label: '步行'
      },
    ],
    planSelected:'',
    plansList:[
      {
          value: '1',
          label: '路径最短'
      },
      {
          value: '2',
          label: '时间最短'
      },
      {
          value: '3',
          label: '步行最少'
      },
      {
        value: '4',
        label: '最少花费'
      }
    ],
    Driving: {},
    Walking: {},
    Transfer: {},
    Geolocat: {},
    lng: 0,
    lat: 0,
    loaded: false,
    mylocation:[],
    markers: [],
    mapCenter: [122.5273285, 31.21515044],
    plans: [],
    plan:[],
    searchOption: {
      city: '西安市',
      citylimit: false
    },
    plugin: [
      {
        pName: 'ToolBar',
        position: 'LB'
      },
      {
        pName: 'Geolocation',
        showButton: false,
        events: {
          init(o) {
            self.Geolocat=o
            self.Geolocation()
          }
        }
      },
      {
        pName: 'Transfer',
        events: {
          init(o) {
            self.Transfer=o
          }
        }
      },
      {
        pName: 'Driving',
        events: {
          init(o) {
            self.Driving=o
          }
        }
      },
      {
        pName: 'Walking',
        events: {
          init(o) {
            self.Walking=o
          }
        }
      }
  ]
}
  },
  methods:{
    clickPanel: function(e){
      var node=e.target
      while(node.tagName!=='DIV'){
        node=node.parentNode
      }
      if(node.className==='planTitle'){
        var index=parseInt(node.getAttribute('index'))
        if(this.transSelected==='1'){
          this.plan=this.plans[index].path.map(function(item){
            return [item.lng,item.lat]
          })
        }else{
          this.plan=this.plans[index]
        }
      }else{
        console.log(1)
      }
    },
    onSearchResult: function(pois){
      let latSum = 0;
      let lngSum = 0;
      this.markers=[]
      if (pois.length > 0) {
        pois.forEach(poi => {
          let {lng, lat} = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push({location:[lng, lat],name:poi.name});
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter=[center.lng, center.lat]
      }
      self.lng=0
      self.lat=0
    },
    changePlan: function(){
      if(this.transSelected==='1'){
        let compare='disdance'
        let index=0
        switch(this.planSelected){
          case '1':compare='disdance';break;
          case '2':compare='time';break;
          case '3':compare='walking_distance';break;
          case '4':compare='cost';break;
          default: break;
        }
       let c=this.plans[0][compare]
       this.plans.forEach(function(o,i){
         if(o[compare]<c){
           index=i
         }
       })
       this.plan=this.plans[index].path.map(function(item){
         return [item.lng,item.lat]
       })
      }
   },
   changeTrans:function(){
     var o={}
     switch(this.transSelected){
       case '1':o=this.Transfer;this.planSelectedDisabled=false;break;
       case '2':o=this.Driving;this.planSelectedDisabled=true;break;
       case '3':o=this.Walking;this.planSelectedDisabled=true;break;
     }
     this.getPath(o)
   },
   Geolocation: function(){
     let o=this.Geolocat
     let self=this
     o.getCurrentPosition((status, result)=>{
       if (result && result.position) {
          console.log('geolocation success')
         self.lng = result.position.lng
         self.lat = result.position.lat
         self.mapCenter = [self.lng, self.lat]
         self.mylocation=self.mapCenter
         self.loaded = true
         self.$nextTick()
       }
     })
   },
   getPath: function(trans){
     var self=this
     self.planSelected=''
     if(self.transSelected==='1'){
      trans.setCity('西安')
     }
     trans.search(self.mylocation,self.toPlace,function(status,result){
       console.log(status,result)
         if(status == 'complete'&&result.info!='NO_DATA'){
           switch(self.transSelected){
             case '1':
              (new Lib.AMap.TransferRender()).autoRender({
                  data:result,
                  panel:"panel"
              });
               self.plan=result.plans[0].path.map(function(item){
                 return [item.lng,item.lat]
               })
               self.plans=result.plans
              break;
             case '2':
             (new Lib.AMap.DrivingRender()).autoRender({
                 data:result,
                 panel:"panel"
             });
             self.plans=result.routes.map(function(item){
               let arrdrive=[]
               item.steps.forEach(function(item1){
                 let temp=item1.path.map(function(item2){
                   return [item2.lng,item2.lat]
                 })
                 arrdrive=arrdrive.concat(temp)
               })
               return arrdrive
             })
             self.plan=self.plans[0]
             break;
             case '3':
             (new Lib.AMap.WalkingRender()).autoRender({
                 data:result,
                 panel:"panel"
             });
             self.plans=result.routes.map(function(item){
               let arrwalk=[]
               item.steps.forEach(function(item1){
                 let temp=item1.path.map(function(item2){
                   return [item2.lng,item2.lat]
                 })
                 arrwalk=arrwalk.concat(temp)
               })
               return arrwalk
             })
             self.plan=self.plans[0]
             break;
           }
         }else{
           (new Lib.AMap.WalkingRender()).autoRender({
               data:{info:'抱歉，没有合适线路'},
               panel:"panel"
           });
         }
     })
   },
   hide: function(){
     this.$emit('hide')
   }
  }

}
</script>
<style scoped>
.amap-wrapper{
  width:100%;
}
.amap-demo {
  height: 300px;
}
.Geolocation{
  position: fixed;
  left:1.5rem;
  bottom: 10rem;
}
.toolbar{
  width:100%;
  height:4rem;
  background-color: #d7dde4;
  position: fixed;
  top:0;
  display:flex;
  justify-content: space-around;
  align-items: center;
}
#panel {
    position: fixed;
    background-color: white;
    max-height: 80%;
    overflow-y: auto;
    top: 4rem;
    right: 0;
    width: 250px;
    border: solid 1px silver;
}
</style>
