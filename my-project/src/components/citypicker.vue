<template>
  <div>
    <div class="citypicker-header">
      <span v-on:click.stop="back"><Icon type="chevron-left" size=20></Icon></span>
    </div>
    <!-- <div class="alphabet" @click.stop="toLetter"><div v-for="(letter,index) in alphabet">{{letter}}</div></div> -->
    <div class="citypicker-body" @click.stop="getCity">
      <div class="citypicker-body-up">
      <div class="current-location">当前城市：{{currentCity}}</div>
      <div class="citypicker-block-container">
        <span>当前定位的城市</span>
        <div data-identification="city" class="citypicker-block">{{currentLocation}}</div>
      </div>
      <!-- <div class="citypicker-block-container">
        <span>最近访问的城市</span>
        <div class="citypicker-block-s">
          <div data-identification="city" class="citypicker-block" v-for="city in visitedCity">{{city}}</div>
        </div>
      </div> -->
      <div class="citypicker-block-container">
        <span>热门城市</span>
        <div class="citypicker-block-s">
          <div data-identification="city" class="citypicker-block" v-for="city in hotCity">{{city}}</div>
        </div>
      </div>
    </div>
    <div class="citypicker-body-down">
      <Collapse v-model="province_value">
          <Panel v-for="(province,index) in province_list" :name="province.name">
            {{province.name}}
            <div class="city-content" slot="content">
              <div data-identification="city" class="alpha-city-block" v-for="city in province.city_list">{{city.name}}</div>
            </div>
          </Panel>
      </Collapse>
    </div>
    </div>
  </div>
</template>
<script>
import ajax from '../utils/ajax'
export default {
  created:function(){
    this.currentCity=this.$route.query.currentCity
    var citysearch = new AMap.CitySearch();
    var that=this
    citysearch.getLocalCity(function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
                that.currentLocation = result.city;
            }
        }
    });
  },
  methods: {
    back:function(){
      // this.$emit('remove')
      this.$router.push({name:'home',params:{currentCity:this.currentCity}})
    },
    toLetter:function(e){
      console.log(e.target.innerHTML)
    },
    getCity:function(e){
      var that=this
      console.log(e.target.dataset)
      if(e.target.dataset.identification==='city'){
        clearTimeout(this.timer)
        this.timer=null
        // if(this.visitedCity.length>=6){
        //   this.visitedCity.shift()
        // }
        // if(this.visitedCity.indexOf(e.target.innerHTML)===-1){
        //   this.visitedCity.push(e.target.innerHTML)
        // }
        var data={
          usernameToken:window.localStorage.discountToken,
          location:e.target.innerHTML
        }
        var url=this.myconfig.baseurl+'/setUserInfo'
        var handler=function(res){
          let data=JSON.parse(res);
          console.log(data)
          that.currentCity=e.target.innerHTML
          that.back()
        }
        if(window.localStorage.discountToken.length>0){
          this.timer=setTimeout(function(){
            ajax(data,url,'post',handler)
          },2000)
        }else{
          this.currentCity=e.target.innerHTML
          this.back()
        }
      }
    }
  },
  data () {
    return {
      timer:null,
      province_value:'',
      currentCity:'',
      currentLocation:'西安',
      // visitedCity:['西安','南京','杭州','成都'],
      hotCity:['北京','成都','重庆','广州','杭州','南京','上海','深圳','天津','武汉','西安'],
      province_list: [{
      "name": "北京",
      "city_list": [{
        "name": "北京",
        "code": 10
      }]
    }, {
      "name": "上海",
      "city_list": [{
        "name": "上海",
        "code": 21
      }]
    }, {
      "name": "天津",
      "city_list": [{
        "name": "天津",
        "code": 22
      }]
    }, {
      "name": "重庆",
      "city_list": [{
        "name": "重庆",
        "code": 23
      }, {
        "name": "涪陵市",
        "code": 230
      }, {
        "name": "万州市",
        "code": 231
      }, {
        "name": "黔江市",
        "code": 232
      }]
    }, {
      "name": "河北",
      "city_list": [{
        "name": "石家庄",
        "code": 311
      }, {
        "name": "张家口",
        "code": 313
      }, {
        "name": "承德",
        "code": 314
      }, {
        "name": "秦皇岛",
        "code": 335
      }, {
        "name": "唐山",
        "code": 315
      }, {
        "name": "廊坊",
        "code": 316
      }, {
        "name": "保定",
        "code": 312
      }, {
        "name": "沧州",
        "code": 317
      }, {
        "name": "衡水",
        "code": 318
      }, {
        "name": "邢台",
        "code": 319
      }, {
        "name": "邯郸",
        "code": 310
      }]
    }, {
      "name": "山西",
      "city_list": [{
        "name": "太原",
        "code": 351
      }, {
        "name": "大同",
        "code": 352
      }, {
        "name": "朔州",
        "code": 349
      }, {
        "name": "阳泉",
        "code": 353
      }, {
        "name": "长治",
        "code": 355
      }, {
        "name": "晋城",
        "code": 356
      }, {
        "name": "忻州",
        "code": 350
      }, {
        "name": "离石",
        "code": 358
      }, {
        "name": "晋中",
        "code": 354
      }, {
        "name": "临汾",
        "code": 357
      }, {
        "name": "运城",
        "code": 359
      }, {
        "name": "吕梁市",
        "code": 242
      }]
    }, {
      "name": "内蒙古",
      "city_list": [{
        "name": "呼和浩特",
        "code": 471
      }, {
        "name": "包头",
        "code": 472
      }, {
        "name": "乌海",
        "code": 473
      }, {
        "name": "赤峰",
        "code": 476
      }, {
        "name": "海拉尔",
        "code": 470
      }, {
        "name": "乌兰浩特",
        "code": 482
      }, {
        "name": "通辽",
        "code": 475
      }, {
        "name": "锡林浩特",
        "code": 479
      }, {
        "name": "集宁",
        "code": 474
      }, {
        "name": "东胜",
        "code": 477
      }, {
        "name": "临河",
        "code": 478
      }, {
        "name": "阿拉善左旗",
        "code": 483
      }, {
        "name": "巴彦淖尔市",
        "code": 480
      }, {
        "name": "鄂尔多斯市",
        "code": 489
      }, {
        "name": "呼伦贝尔市",
        "code": 481
      }, {
        "name": "乌兰察布市",
        "code": 484
      }, {
        "name": "锡林郭勒盟",
        "code": 485
      }, {
        "name": "兴安盟",
        "code": 486
      }]
    }, {
      "name": "辽宁",
      "city_list": [{
        "name": "沈阳",
        "code": 24
      }, {
        "name": "朝阳",
        "code": 421
      }, {
        "name": "阜新",
        "code": 418
      }, {
        "name": "铁岭",
        "code": 410
      }, {
        "name": "抚顺",
        "code": 413
      }, {
        "name": "本溪",
        "code": 414
      }, {
        "name": "辽阳",
        "code": 419
      }, {
        "name": "鞍山",
        "code": 412
      }, {
        "name": "丹东",
        "code": 415
      }, {
        "name": "大连",
        "code": 411
      }, {
        "name": "营口",
        "code": 417
      }, {
        "name": "盘锦",
        "code": 427
      }, {
        "name": "锦州",
        "code": 416
      }, {
        "name": "葫芦岛",
        "code": 429
      }]
    }, {
      "name": "吉林",
      "city_list": [{
        "name": "长春",
        "code": 431
      }, {
        "name": "白城",
        "code": 436
      }, {
        "name": "松原",
        "code": 438
      }, {
        "name": "吉林",
        "code": 432
      }, {
        "name": "四平",
        "code": 434
      }, {
        "name": "辽源",
        "code": 437
      }, {
        "name": "通化",
        "code": 435
      }, {
        "name": "白山",
        "code": 439
      }, {
        "name": "延吉",
        "code": 433
      }, {
        "name": "延边州",
        "code": 247
      }]
    }, {
      "name": "黑龙江",
      "city_list": [{
        "name": "哈尔滨",
        "code": 451
      }, {
        "name": "齐齐哈尔",
        "code": 452
      }, {
        "name": "黑河",
        "code": 456
      }, {
        "name": "大庆",
        "code": 459
      }, {
        "name": "伊春",
        "code": 458
      }, {
        "name": "鹤岗",
        "code": 468
      }, {
        "name": "佳木斯",
        "code": 454
      }, {
        "name": "双鸭山",
        "code": 469
      }, {
        "name": "七台河",
        "code": 464
      }, {
        "name": "鸡西",
        "code": 467
      }, {
        "name": "牡丹江",
        "code": 453
      }, {
        "name": "绥化",
        "code": 455
      }, {
        "name": "加格达奇",
        "code": 457
      }, {
        "name": "大兴安岭地区",
        "code": 285
      }]
    }, {
      "name": "江苏",
      "city_list": [{
        "name": "南京",
        "code": 25
      }, {
        "name": "苏州",
        "code": 512
      }, {
        "name": "徐州",
        "code": 516
      }, {
        "name": "连云港",
        "code": 518
      }, {
        "name": "宿迁",
        "code": 527
      }, {
        "name": "淮安",
        "code": 517
      }, {
        "name": "盐城",
        "code": 515
      }, {
        "name": "扬州",
        "code": 514
      }, {
        "name": "泰州",
        "code": 523
      }, {
        "name": "南通",
        "code": 513
      }, {
        "name": "镇江",
        "code": 511
      }, {
        "name": "常州",
        "code": 519
      }, {
        "name": "无锡",
        "code": 510
      }]
    }, {
      "name": "浙江",
      "city_list": [{
        "name": "杭州",
        "code": 571
      }, {
        "name": "湖州",
        "code": 572
      }, {
        "name": "嘉兴",
        "code": 573
      }, {
        "name": "舟山",
        "code": 580
      }, {
        "name": "宁波",
        "code": 574
      }, {
        "name": "绍兴",
        "code": 575
      }, {
        "name": "金华",
        "code": 579
      }, {
        "name": "台州",
        "code": 576
      }, {
        "name": "温州",
        "code": 577
      }, {
        "name": "丽水",
        "code": 578
      }, {
        "name": "衢州",
        "code": 570
      }]
    }, {
      "name": "安徽",
      "city_list": [{
        "name": "合肥",
        "code": 551
      }, {
        "name": "宿州",
        "code": 557
      }, {
        "name": "淮北",
        "code": 561
      }, {
        "name": "阜阳",
        "code": 558
      }, {
        "name": "蚌埠",
        "code": 552
      }, {
        "name": "淮南",
        "code": 554
      }, {
        "name": "滁州",
        "code": 550
      }, {
        "name": "马鞍山",
        "code": 555
      }, {
        "name": "芜湖",
        "code": 553
      }, {
        "name": "铜陵",
        "code": 562
      }, {
        "name": "安庆",
        "code": 556
      }, {
        "name": "黄山",
        "code": 559
      }, {
        "name": "六安",
        "code": 564
      }, {
        "name": "巢湖",
        "code": 565
      }, {
        "name": "池州",
        "code": 566
      }, {
        "name": "宣城",
        "code": 563
      }, {
        "name": "亳州",
        "code": 5581
      }]
    }, {
      "name": "福建",
      "city_list": [{
        "name": "福州",
        "code": 591
      }, {
        "name": "南平",
        "code": 599
      }, {
        "name": "三明",
        "code": 598
      }, {
        "name": "莆田",
        "code": 594
      }, {
        "name": "泉州",
        "code": 595
      }, {
        "name": "厦门",
        "code": 592
      }, {
        "name": "漳州",
        "code": 596
      }, {
        "name": "龙岩",
        "code": 597
      }, {
        "name": "宁德",
        "code": 593
      }, {
        "name": "福安",
        "code": 5930
      }, {
        "name": "邵武",
        "code": 5990
      }, {
        "name": "石狮",
        "code": 5950
      }, {
        "name": "永安",
        "code": 5980
      }, {
        "name": "武夷山",
        "code": 5991
      }, {
        "name": "福清",
        "code": 5995
      }]
    }, {
      "name": "江西",
      "city_list": [{
        "name": "南昌",
        "code": 791
      }, {
        "name": "九江",
        "code": 792
      }, {
        "name": "景德镇",
        "code": 798
      }, {
        "name": "鹰潭",
        "code": 701
      }, {
        "name": "新余",
        "code": 790
      }, {
        "name": "萍乡",
        "code": 799
      }, {
        "name": "赣州",
        "code": 797
      }, {
        "name": "上饶",
        "code": 793
      }, {
        "name": "临川",
        "code": 794
      }, {
        "name": "宜春",
        "code": 795
      }, {
        "name": "吉安",
        "code": 796
      }, {
        "name": "抚州",
        "code": 7940
      }]
    }, {
      "name": "山东",
      "city_list": [{
        "name": "济南",
        "code": 531
      }, {
        "name": "聊城",
        "code": 635
      }, {
        "name": "德州",
        "code": 534
      }, {
        "name": "东营",
        "code": 546
      }, {
        "name": "淄博",
        "code": 533
      }, {
        "name": "潍坊",
        "code": 536
      }, {
        "name": "烟台",
        "code": 535
      }, {
        "name": "威海",
        "code": 631
      }, {
        "name": "青岛",
        "code": 532
      }, {
        "name": "日照",
        "code": 633
      }, {
        "name": "临沂",
        "code": 539
      }, {
        "name": "枣庄",
        "code": 632
      }, {
        "name": "济宁",
        "code": 537
      }, {
        "name": "泰安",
        "code": 538
      }, {
        "name": "莱芜",
        "code": 634
      }, {
        "name": "滨州",
        "code": 543
      }, {
        "name": "菏泽",
        "code": 530
      }]
    }, {
      "name": "河南",
      "city_list": [{
        "name": "郑州",
        "code": 371
      }, {
        "name": "三门峡",
        "code": 398
      }, {
        "name": "洛阳",
        "code": 379
      }, {
        "name": "焦作",
        "code": 391
      }, {
        "name": "新乡",
        "code": 373
      }, {
        "name": "鹤壁",
        "code": 392
      }, {
        "name": "安阳",
        "code": 372
      }, {
        "name": "濮阳",
        "code": 393
      }, {
        "name": "开封",
        "code": 378
      }, {
        "name": "商丘",
        "code": 370
      }, {
        "name": "许昌",
        "code": 374
      }, {
        "name": "漯河",
        "code": 395
      }, {
        "name": "平顶山",
        "code": 375
      }, {
        "name": "南阳",
        "code": 377
      }, {
        "name": "信阳",
        "code": 376
      }, {
        "name": "济源",
        "code": 3910
      }, {
        "name": "周口",
        "code": 394
      }, {
        "name": "驻马店",
        "code": 396
      }]
    }, {
      "name": "湖北",
      "city_list": [{
        "name": "武汉",
        "code": 27
      }, {
        "name": "十堰",
        "code": 719
      }, {
        "name": "襄阳",
        "code": 710
      }, {
        "name": "荆门",
        "code": 724
      }, {
        "name": "孝感",
        "code": 712
      }, {
        "name": "黄冈",
        "code": 713
      }, {
        "name": "鄂州",
        "code": 711
      }, {
        "name": "黄石",
        "code": 714
      }, {
        "name": "咸宁",
        "code": 715
      }, {
        "name": "荆州",
        "code": 716
      }, {
        "name": "宜昌",
        "code": 717
      }, {
        "name": "恩施",
        "code": 718
      }, {
        "name": "仙桃",
        "code": 728
      }, {
        "name": "潜江",
        "code": 7281
      }, {
        "name": "随州市",
        "code": 722
      }, {
        "name": "广水",
        "code": 7221
      }, {
        "name": "天门",
        "code": 7282
      }]
    }, {
      "name": "湖南",
      "city_list": [{
        "name": "长沙",
        "code": 731
      }, {
        "name": "张家界",
        "code": 744
      }, {
        "name": "常德",
        "code": 736
      }, {
        "name": "益阳",
        "code": 737
      }, {
        "name": "岳阳",
        "code": 730
      }, {
        "name": "株洲",
        "code": 733
      }, {
        "name": "湘潭",
        "code": 732
      }, {
        "name": "衡阳",
        "code": 734
      }, {
        "name": "郴州",
        "code": 735
      }, {
        "name": "永州",
        "code": 746
      }, {
        "name": "邵阳",
        "code": 739
      }, {
        "name": "怀化",
        "code": 745
      }, {
        "name": "娄底",
        "code": 738
      }, {
        "name": "吉首",
        "code": 743
      }]
    }, {
      "name": "广东",
      "city_list": [{
        "name": "广州",
        "code": 20
      }, {
        "name": "深圳",
        "code": 755
      }, {
        "name": "清远",
        "code": 763
      }, {
        "name": "韶关",
        "code": 751
      }, {
        "name": "河源",
        "code": 762
      }, {
        "name": "梅州",
        "code": 753
      }, {
        "name": "潮州",
        "code": 768
      }, {
        "name": "汕头",
        "code": 754
      }, {
        "name": "揭阳",
        "code": 663
      }, {
        "name": "汕尾",
        "code": 660
      }, {
        "name": "惠州",
        "code": 752
      }, {
        "name": "东莞",
        "code": 769
      }, {
        "name": "珠海",
        "code": 756
      }, {
        "name": "中山",
        "code": 760
      }, {
        "name": "江门",
        "code": 750
      }, {
        "name": "佛山",
        "code": 757
      }, {
        "name": "茂名",
        "code": 668
      }, {
        "name": "湛江",
        "code": 759
      }, {
        "name": "阳江",
        "code": 662
      }, {
        "name": "云浮",
        "code": 766
      }, {
        "name": "肇庆",
        "code": 758
      }]
    }, {
      "name": "广西",
      "city_list": [{
        "name": "南宁",
        "code": 771
      }, {
        "name": "桂林",
        "code": 773
      }, {
        "name": "柳州",
        "code": 772
      }, {
        "name": "贺州",
        "code": 774
      }, {
        "name": "玉林",
        "code": 775
      }, {
        "name": "钦州",
        "code": 777
      }, {
        "name": "北海",
        "code": 779
      }, {
        "name": "防城港",
        "code": 770
      }, {
        "name": "百色",
        "code": 776
      }, {
        "name": "河池",
        "code": 778
      }, {
        "name": "贵港",
        "code": 7750
      }, {
        "name": "梧州",
        "code": 7740
      }, {
        "name": "崇左市",
        "code": 7711
      }, {
        "name": "来宾市",
        "code": 284
      }]
    }, {
      "name": "海南",
      "city_list": [{
        "name": "海口",
        "code": 898
      }, {
        "name": "三亚",
        "code": 899
      }, {
        "name": "儋州",
        "code": 890
      }, {
        "name": "琼海",
        "code": 8901
      }, {
        "name": "文昌",
        "code": 8902
      }, {
        "name": "万宁",
        "code": 8903
      }, {
        "name": "五指山",
        "code": 8904
      }, {
        "name": "东方",
        "code": 8905
      }]
    }, {
      "name": "四川",
      "city_list": [{
        "name": "成都",
        "code": 28
      }, {
        "name": "广元",
        "code": 839
      }, {
        "name": "绵阳",
        "code": 816
      }, {
        "name": "德阳",
        "code": 838
      }, {
        "name": "南充",
        "code": 817
      }, {
        "name": "广安",
        "code": 826
      }, {
        "name": "遂宁",
        "code": 825
      }, {
        "name": "内江",
        "code": 832
      }, {
        "name": "乐山",
        "code": 833
      }, {
        "name": "自贡",
        "code": 813
      }, {
        "name": "泸州",
        "code": 830
      }, {
        "name": "宜宾",
        "code": 831
      }, {
        "name": "攀枝花",
        "code": 812
      }, {
        "name": "巴中",
        "code": 827
      }, {
        "name": "达州",
        "code": 818
      }, {
        "name": "资阳",
        "code": 8320
      }, {
        "name": "雅安",
        "code": 835
      }, {
        "name": "西昌",
        "code": 834
      }, {
        "name": "阿坝州",
        "code": 837
      }, {
        "name": "眉山市",
        "code": 828
      }, {
        "name": "凉山州",
        "code": 281
      }, {
        "name": "甘孜州",
        "code": 282
      }]
    }, {
      "name": "贵州",
      "city_list": [{
        "name": "贵阳",
        "code": 851
      }, {
        "name": "六盘水",
        "code": 858
      }, {
        "name": "遵义",
        "code": 852
      }, {
        "name": "毕节",
        "code": 857
      }, {
        "name": "铜仁",
        "code": 856
      }, {
        "name": "安顺",
        "code": 853
      }, {
        "name": "凯里",
        "code": 855
      }, {
        "name": "都匀",
        "code": 854
      }, {
        "name": "兴义",
        "code": 859
      }, {
        "name": "黔东南州",
        "code": 243
      }, {
        "name": "黔南州",
        "code": 244
      }, {
        "name": "黔西南州",
        "code": 245
      }]
    }, {
      "name": "云南",
      "city_list": [{
        "name": "昆明",
        "code": 871
      }, {
        "name": "曲靖",
        "code": 874
      }, {
        "name": "玉溪",
        "code": 877
      }, {
        "name": "丽江",
        "code": 888
      }, {
        "name": "昭通",
        "code": 870
      }, {
        "name": "普洱",
        "code": 879
      }, {
        "name": "临沧",
        "code": 883
      }, {
        "name": "保山",
        "code": 875
      }, {
        "name": "潞西",
        "code": 692
      }, {
        "name": "泸水",
        "code": 886
      }, {
        "name": "中甸",
        "code": 887
      }, {
        "name": "大理",
        "code": 872
      }, {
        "name": "楚雄",
        "code": 878
      }, {
        "name": "个旧",
        "code": 873
      }, {
        "name": "文山",
        "code": 876
      }, {
        "name": "景洪",
        "code": 691
      }, {
        "name": "红河",
        "code": 8730
      }, {
        "name": "德宏州",
        "code": 286
      }, {
        "name": "迪庆州",
        "code": 287
      }, {
        "name": "西双版纳州",
        "code": 288
      }, {
        "name": "怒江州",
        "code": 289
      }]
    }, {
      "name": "西藏",
      "city_list": [{
        "name": "拉萨",
        "code": 891
      }, {
        "name": "那曲",
        "code": 896
      }, {
        "name": "昌都",
        "code": 895
      }, {
        "name": "林芝",
        "code": 894
      }, {
        "name": "乃东",
        "code": 893
      }, {
        "name": "日喀则",
        "code": 892
      }, {
        "name": "噶尔",
        "code": 897
      }, {
        "name": "阿里地区",
        "code": 8971
      }, {
        "name": "山南地区",
        "code": 900
      }, {
        "name": "樟木口岸",
        "code": 800
      }]
    }, {
      "name": "陕西",
      "city_list": [{
        "name": "西安",
        "code": 29
      }, {
        "name": "延安",
        "code": 911
      }, {
        "name": "铜川",
        "code": 919
      }, {
        "name": "渭南",
        "code": 913
      }, {
        "name": "咸阳",
        "code": 910
      }, {
        "name": "宝鸡",
        "code": 917
      }, {
        "name": "汉中",
        "code": 916
      }, {
        "name": "榆林",
        "code": 912
      }, {
        "name": "商洛",
        "code": 914
      }, {
        "name": "安康",
        "code": 915
      }]
    }, {
      "name": "甘肃",
      "city_list": [{
        "name": "兰州",
        "code": 931
      }, {
        "name": "嘉峪关",
        "code": 937
      }, {
        "name": "白银",
        "code": 943
      }, {
        "name": "天水",
        "code": 938
      }, {
        "name": "酒泉",
        "code": 9370
      }, {
        "name": "张掖",
        "code": 936
      }, {
        "name": "金昌",
        "code": 935
      }, {
        "name": "庆阳",
        "code": 934
      }, {
        "name": "平凉",
        "code": 933
      }, {
        "name": "定西",
        "code": 932
      }, {
        "name": "陇南",
        "code": 939
      }, {
        "name": "临夏",
        "code": 930
      }, {
        "name": "甘南藏族",
        "code": 941
      }, {
        "name": "武威市",
        "code": 9350
      }]
    }, {
      "name": "宁夏",
      "city_list": [{
        "name": "银川",
        "code": 951
      }, {
        "name": "石嘴山",
        "code": 952
      }, {
        "name": "吴忠",
        "code": 953
      }, {
        "name": "固原",
        "code": 954
      }, {
        "name": "中卫市",
        "code": 248
      }]
    }, {
      "name": "青海",
      "city_list": [{
        "name": "西宁",
        "code": 971
      }, {
        "name": "平安",
        "code": 972
      }, {
        "name": "海晏",
        "code": 970
      }, {
        "name": "共和",
        "code": 974
      }, {
        "name": "同仁",
        "code": 973
      }, {
        "name": "玛沁",
        "code": 975
      }, {
        "name": "玉树",
        "code": 976
      }, {
        "name": "德令哈",
        "code": 977
      }, {
        "name": "果洛藏族自治州",
        "code": 236
      }, {
        "name": "海北藏族自治州",
        "code": 237
      }, {
        "name": "海东地区",
        "code": 238
      }, {
        "name": "海南藏族自治州",
        "code": 239
      }, {
        "name": "海西蒙古族藏族自治州",
        "code": 240
      }, {
        "name": "黄南藏族自治州",
        "code": 241
      }]
    }, {
      "name": "新疆",
      "city_list": [{
        "name": "乌鲁木齐",
        "code": 991
      }, {
        "name": "克拉玛依",
        "code": 990
      }, {
        "name": "石河子",
        "code": 993
      }, {
        "name": "喀什",
        "code": 998
      }, {
        "name": "阿克苏",
        "code": 997
      }, {
        "name": "和田",
        "code": 903
      }, {
        "name": "吐鲁番",
        "code": 995
      }, {
        "name": "哈密",
        "code": 902
      }, {
        "name": "阿图什",
        "code": 908
      }, {
        "name": "博乐",
        "code": 909
      }, {
        "name": "昌吉",
        "code": 994
      }, {
        "name": "库尔勒",
        "code": 996
      }, {
        "name": "伊犁",
        "code": 999
      }, {
        "name": "奎屯",
        "code": 992
      }, {
        "name": "塔城",
        "code": 901
      }, {
        "name": "阿勒泰",
        "code": 906
      }, {
        "name": "巴音郭楞蒙古自治州",
        "code": 904
      }, {
        "name": "博尔塔拉蒙古自治州",
        "code": 905
      }, {
        "name": "克孜勒苏柯尔克孜自治州",
        "code": 907
      }, {
        "name": "伊犁哈萨克自治州",
        "code": 989
      }]
    }]
    }
  }
}
</script>

<style scoped>
.ivu-collapse-content-box{
  padding:0;
}
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
  z-index:1001;
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
  width:29%;
  line-height: 2.5rem;
  text-align: center;
  border-radius: 5px;
  margin: 2.16%;
}
.alpha-city-title{
    padding-left: 1rem;
}
.alpha-city-block{
  background-color: white;
  border-bottom: 1px solid #e9eaec;
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 1rem;
}
.city-content .alpha-city-block:last-child{
    border-bottom: transparent;
}
</style>
