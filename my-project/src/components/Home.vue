<template>
  <div v-if="activityShow">
    <activity-Component :activityInfo="activity" v-on:hide="activityShow=false"></activity-Component>
  </div>
  <div v-else-if="shopShow">
    <shop-Component :shopInfo="shopInfo" :userInfo="userInfo" v-on:hide="shopShow=false"></shop-Component>
  </div>
  <div class="container" v-else>
    <div class="header">
      <span calss="city">西安 <Icon type="chevron-down"></Icon></span>
       <Button style="background-color: white;" class="search-btn" type="ghost" shape="circle" icon="ios-search">搜索</Button>
      <Icon size=20 type="ios-bell"></Icon>
    </div>
    <div class="block" v-for="(item,index) in activitiesInfo" @click="getCurrentActivity(item)">
      <div class="userInfo-container">
        <div class="userInfo">
        <div class="head-img-container">
        <img :src="item.coverImg" class="header-img">
        </div>
        <div class="head-uerInfo"  @click.stop="getCurrentshopInfo(item.shopId)">
          <p>{{item.shopName}}</p>
          <p>{{item.postTime}}</p>
        </div>
        </div>
        <Button type="ghost" size='small' icon="checkmark" style="float:right;color:#ff9900;border-color:#ff9900;"
                v-if="userInfo.shopsFollowed.indexOf(item.shopId)>-1"
                v-on:click.stop="userInfo.shopsFollowed.splice(userInfo.shopFollowed.indexOf(item.shopId),1)">已关注</Button>
        <Button type="ghost" size='small' style="float:right;"
                v-else @click.stop="userInfo.shopsFollowed.push(item.shopId)">关注</Button>
      </div>
       <div class="cover">
         <img :src="item.coverImg" class="cover-img">
         <div class="activity-Info">
        <p>{{item.activityName}}</p>
        <p>{{item.activityContent}}</p>
      </div>
      </div>
      <div class="control">
        <span class="eye"><Icon size=16 type="eye"></Icon>{{item.watchs}}</span>
        <div>
          <Button type="ghost" shape="circle" class="collection" icon="android-favorite" style="color:#39f;border-color:#39f;"
                  v-if="item.collections.indexOf(userInfo.userName)>-1"
                  @click.stop="item.collections.splice(item.collections.indexOf(userInfo.userName),1)">{{item.collections.length}}</Button>
          <Button type="ghost" shape="circle" class="collection" icon="android-favorite-outline"
                  v-else @click.stop="item.collections.push(userInfo.userName)">{{item.collections.length}}</Button>
          <Button type="ghost" shape="circle" class="like" icon="thumbsup" style="color:#39f;border-color:#39f;"
                  v-if="item.likes.indexOf(userInfo.userName)>-1"
                  @click.stop="item.likes.splice(item.likes.indexOf(userInfo.userName),1)">{{item.likes.length}}</Button>
          <Button type="ghost" shape="circle" class="like" icon="thumbsup"
                  v-else @click.stop="item.likes.push(userInfo.userName)">{{item.likes.length}}</Button>
          <Button type="ghost" shape="circle" class="comment" icon="chatbox-working">{{item.comments.length}}</Button>
        </div>
      </div>
    </div>
      <footer-Component></footer-Component>
  </div>
</template>

<script>
import activity from './activity'
import shop from './shop'
import footer from './footer'
export default {
  name: 'home',
  components: {
    'activity-Component': activity,
    'shop-Component': shop,
    'footer-Component':footer
  },
  methods: {
    getCurrentActivity: function (item) {
      item.watchs++
      this.activity=item
      this.activityShow=true
      this.shopShow=false
    },
    getCurrentshopInfo: function (shopId){
      this.shopInfo=this.shopsInfo.filter(function(item){
        return item.shopId===shopId
      })[0]
      this.activityShow=false
      this.shopShow=true
    }
  },
  data () {
    return {
      activityShow: false,
      shopShow: false,
      activity: {},
      shopInfo:{},
      shopsInfo: [
        {
          shopId: 'r1rf12f',
          shopName: 'earth music 旗舰店',
          headImg: 'http://img5.imgtn.bdimg.com/it/u=3691544771,740678494&fm=23&gp=0.jpg',
          backgroundimage: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
          follows: ['xhh', 'xbb', 'xyy', 'sdd', 'sma'],
          location: '西安市雁塔区太白南路2号',
          activities: [
            {
              shopId: 'r1rf12f',
              shopName: 'earth music 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#520闺蜜节#',
              activityContent: '5.20-5.22全场1折起',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            },
            {
              shopId: 'r1rf12f',
              shopName: 'earth music 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#521闺蜜节#',
              activityContent: '5.20-5.22全场1折起wqdqwfweg文菲菲问问二无我问问vv问各位v我饿GV二维v的v翁',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            }
          ]
        },
        {
          shopId: '124125r3f',
          shopName: 'majestic legon 旗舰店',
          headImg: 'http://img5.imgtn.bdimg.com/it/u=3691544771,740678494&fm=23&gp=0.jpg',
          backgroundimage: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
          follows: ['xhh', 'xbb', 'xyy', 'saae', 'sma', 'qwd'],
          location: '西安市雁塔区太白南路2号',
          activities: [
            {
              shopId: '124125r3f',
              shopName: 'majestic legon 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#520闺蜜节#',
              activityContent: '5.20-5.22全场1折起',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            },
            {
              shopId: '124125r3f',
              shopName: 'majestic legon 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#521闺蜜节#',
              activityContent: '5.20-5.22全场1折起wqdqwfweg文菲菲问问二无我问问vv问各位v我饿GV二维v的v翁',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            }
          ]
        },
        {
          shopId: '35r3251t3g431',
          shopName: 'nice claup 旗舰店',
          headImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495284270411&di=e3dcd156cc328c49250c9e77f1fd82fe&imgtype=0&src=http%3A%2F%2Fwww.1tong.com%2Fuploads%2Fwallpaper%2Fplants%2F121-2-1600x900.jpg',
          backgroundimage: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
          follows: ['xhh', 'xbb', 'xyy', 'saae', 'sma', 'qwd'],
          location: '西安市雁塔区太白南路2号',
          activities: [
            {
              shopId: '35r3251t3g431',
              shopName: 'nice claup 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#520闺蜜节#',
              activityContent: '5.20-5.22全场1折起',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            },
            {
              shopId: '35r3251t3g431',
              shopName: 'nice claup 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#521闺蜜节#',
              activityContent: '5.20-5.22全场1折起wqdqwfweg文菲菲问问二无我问问vv问各位v我饿GV二维v的v翁',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            }
          ]
        },
        {
          shopId: '21r2r32g43y3',
          shopName: 'collect point 旗舰店',
          headImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
          backgroundimage: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
          follows: ['xhh', 'xbb', 'qwfq', 'qfqqc', 'xyy', 'sdd', 'sma'],
          location: '西安市雁塔区太白南路2号',
          activities: [
            {
              shopId: '21r2r32g43y3',
              shopName: 'collect point 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#520闺蜜节#',
              activityContent: '5.20-5.22全场1折起',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            },
            {
              shopId: '21r2r32g43y3',
              shopName: 'collect point 旗舰店',
              activityId: '984i12kmdcfk0r1',
              coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
              activityName: '#521闺蜜节#',
              activityContent: '5.20-5.22全场1折起wqdqwfweg文菲菲问问二无我问问vv问各位v我饿GV二维v的v翁',
              postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                        'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                        'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
              postTime: '3分钟前',
              likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
              comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
              watchs: 542,
              collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
            }
          ]
        }
      ],
      activitiesInfo: [
        {
          shopId: 'r1rf12f',
          shopName: 'earth music 旗舰店',
          activityId: '113532354',
          coverImg: 'http://img5.imgtn.bdimg.com/it/u=3691544771,740678494&fm=23&gp=0.jpg',
          activityName: '#520闺蜜节#',
          activityContent: '5.20-5.22全场1折起',
          postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                    'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
          postTime: '3小时前',
          likes: ['xdd', 'xbb', 'xyy', 'sdd', 'sma'],
          comments: ['xdd:hello world', 'xss:hello world', 'xmm:hello world'],
          watchs: 141,
          collections: ['mht', 'xbb', 'xyy', 'sdd', 'sma']
        },
        {
          shopId: '124125r3f',
          activityId: '41224tgsc34Ac634',
          shopName: 'majestic legon 旗舰店',
          coverImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495284224924&di=68a61a2ebef04dcf6add96d233fc9fe9&imgtype=0&src=http%3A%2F%2Fh8.86.cc%2Fwalls%2F20160405%2F1440x900_9837c6522e7cb1f.jpg',
          activityName: '#520闺蜜节#',
          activityContent: '5.20-5.22全场1折起',
          postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                    'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
          postTime: '3小时前',
          likes: ['xhh', 'qwf', 'qwcqw', 'xbb', 'xyy', 'sdd', 'sma'],
          comments: ['xhh:hello world', 'xdd回复xhh:hello world', 'xmm:hello world'],
          watchs: 235,
          collections: ['xhh', 'xbb', 'xyy', 'sdd', 'sma', 'qfq', 'F121']
        },
        {
          shopId: '35r3251t3g431',
          activityId: '152TF322T32T2F',
          shopName: 'nice claup 旗舰店',
          coverImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1495284270411&di=e3dcd156cc328c49250c9e77f1fd82fe&imgtype=0&src=http%3A%2F%2Fwww.1tong.com%2Fuploads%2Fwallpaper%2Fplants%2F121-2-1600x900.jpg',
          activityName: '#520闺蜜节#',
          activityContent: '5.20-5.22全场1折起',
          postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                    'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
          postTime: '3分钟前',
          likes: ['xss', 'qwf', 'qwcqw', 'xbb', 'xyy', 'sdd', 'sma'],
          comments: ['xhh:hello world', 'xdd:hello world', 'xmm回复xdd:hello world'],
          watchs: 235,
          collections: ['xhh', 'xbb', 'xyy', 'xas', 'sma', 'qfq', 'F121', 'qwfq', '2yg1']
        },
        {
          shopId: '21r2r32g43y3',
          activityId: '984i12kmdcfk0r1',
          shopName: 'collect point 旗舰店',
          coverImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
          activityName: '#520闺蜜节#',
          activityContent: '5.20-5.22全场1折起',
          postImgs: ['http://img0.imgtn.bdimg.com/it/u=3839631551,1989840719&fm=23&gp=0.jpg',
                    'http://d.5857.com/qingxinmeinv_140804/001.jpg',
                    'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg'],
          postTime: '3分钟前',
          likes: ['xhh', 'gg', 'qwcqw', 'ss', 'xyy', 'sdd', 'sma'],
          comments: ['xff回复xdd:hello world', 'xdd:hello world', 'xmm:hello world'],
          watchs: 542,
          collections: ['ggg', 'xbb', 'xyy', 'xas', 'qwc', 'F121', 'qwfq']
        }
      ],
      userInfo: {
        userId: '4124r2543',
        userName: 'xhh',
        headImg: 'http://img0.imgtn.bdimg.com/it/u=3696229962,3913167766&fm=23&gp=0.jpg',
        shopsFollowed: ['21r2r32g43y3', 'r1rf12f'],
        activitycollected: ['984i12kmdcfk0r1', '152TF322T32T2F']
      }
    }
  }
}
</script>

<style scoped>
.container{
  width:100%;
  margin-top: 4rem;
  background-color: #f5f7f9;
}
.header{
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  padding-top: 1rem;
  background-color: rgb(169,200,221);
  color: white;
  position: fixed;
  top:0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}
.search-btn{
  width: 70%;
}
.block{
  box-sizing: border-box;
  width:100%;
  height:370px;
  background-color: white;
  margin:20px 0;
  padding:5px;
  border-bottom: 1px solid #e3e8ee;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  }
  .userInfo-container{
    height:40px;
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .userInfo{
    height:100%;
    width:80%;
    display:flex;
    justify-content: flex-start;
    align-items: center;
  }
  .head-img-container{
    width:35px;
    height:35px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 5px;
  }
  .head-uerInfo{
    height:100%;
  }
  .header-img{
    width: 100%;
    height: 100%;
  }
.cover{
  background-color: #f5f7f9;
  width:100%;
  height:75%;
  margin:0 auto;
}
.cover-img{
  width:100%;
  height:80%;
}
.control{
  width:100%;
  padding: 0 5px;
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.activity-Info{
  width:100%;
  padding: 0 5px;
}
.eye{
  color: #9ea7b4;
}
.like,.comment,.collection{
  margin-left: 5px;
  color: #9ea7b4;
  padding-top:0;
  padding-bottom: 0;
}
Icon{
  margin:0 2px;
}
</style>
