<template>
  <div>
    <div class="citypicker-header">
      <span v-on:click="back"><Icon type="chevron-left" size=20></Icon></span>
    </div>
    <div class="alphabet" @click.stop="toLetter"><div v-for="(letter,index) in alphabet">{{letter}}</div></div>
    <div class="citypicker-body">
      <div class="citypicker-body-up">
      <div class="current-location">当前城市：{{currentCity}}</div>
      <div class="citypicker-block-container">
        <span>当前定位的城市</span>
        <div class="citypicker-block">{{currentLocation}}</div>
      </div>
      <div class="citypicker-block-container">
        <span>最近访问的城市</span>
        <div class="citypicker-block-s">
          <div class="citypicker-block" v-for="city in visitedCity">{{city}}</div>
        </div>
      </div>
      <div class="citypicker-block-container">
        <span>热门城市</span>
        <div class="citypicker-block-s">
          <div class="citypicker-block" v-for="city in hotCity">{{city}}</div>
        </div>
      </div>
    </div>
      haha
    </div>
  </div>
</template>
<script>
import ajax from '../utils/ajax'
export default {
  created:function(){
  },
  methods: {
    back:function(){},
    toLetter:function(e){
      console.log(e.target.innerHTML)
    }
  },
  data () {
    return {
      alphabet:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      currentCity:'西安',
      currentLocation:'西安',
      visitedCity:['西安','南京','杭州','成都'],
      hotCity:['北京','成都','重庆','广州','杭州','南京','上海','深圳','天津','武汉','西安']
    }
  }
}
</script>

<style scoped>
.citypicker-header{
  width:100%;
  height:3rem;
  background-color: #f8f8f9;
  border-bottom: 1px solid #e9eaec;
  position: fixed;
  top:0;
  display:flex;
  align-items: center;
  padding-left: 1rem;
}
.alphabet{
  position:fixed;
  top:7rem;
  bottom:1rem;
  right:5px;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
}
.citypicker-body{
  width:100%;
  margin-top:3rem;
  background-color: #f8f8f9;
}
.citypicker-body-up{
    border-bottom: 1px solid #e9eaec;
}
.citypicker-block-container,.current-location{
  padding:1rem;
}
.current-location{
  background-color: white;
  border-bottom: 1px solid #e9eaec;
}
.citypicker-block-s{
  display:flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.citypicker-block{
  background-color: white;
  border: 1px solid #e9eaec;
  height:2.5rem;
  width:28%;
  line-height: 2.5rem;
  text-align: center;
  border-radius: 5px;
  margin: 0.4rem;
}
</style>
