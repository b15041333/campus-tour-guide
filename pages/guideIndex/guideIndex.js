var config = require('../../config/config.js');
const app = getApp();//为了使用app.js中的全局数据

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategory:'',//当前激活的分类
    categoryData: ['景观区','学习区', '生活区','公寓楼','学科楼'],
    coreLongitude: '118.931070',//中心经度
    coreLatitude: '32.111790',//中心纬度
    scale: 15,//缩放级别
    markers: [],//标记点
    isSpread: true, //底部可滚动视图区域是否显示，true表示展开，false表示收缩
    scrollLeft: 0,//横向滚动条位置，默认为0
    itemsList: [],//某一分类下的所有标记点数据
    activeMerchantIndex:0//当前激活的标记点对应的index索引，默认为0
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;

    this.setData({
      activeCategory: config.CATEGORY
    })

    let categoryID = this.data.categoryData.indexOf(config.CATEGORY);
    console.log('默认选择的类别下标是'+categoryID);

    app.globalData.categoryID = categoryID;

    this.getCategory(config.CATEGORY, function(res){
      let itemsList = res.data.objects;
      that.setData({
        itemsList: itemsList 
      });

      console.log('该分类下的itemsList为');
      console.log(itemsList);

      that.setMarkers(itemsList);  
    });
  },

  // 将后端获取的标记点数据保存到本地变量
  setMarkers(itemsList) {
    let markers = [];
    let categoryID = app.globalData.categoryID;
    itemsList.forEach((item) => {
      let marker = {
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        iconPath: '../../resource/images/'+ categoryID +'.png',
        width: 18,
        height: 18
      }
      markers.push(marker);//将marker变量添加到markers数组中
    });

    this.setData({
      markers:markers
    })
  }, 

  categoryChange:function(e){
    // e为用户点击的category
    var that = this;
    var category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory:category
    })

    // 获取当前category下标
    let categoryID = this.data.categoryData.indexOf(category);
    console.log('当前选择的类别下标是'+ categoryID);

    app.globalData.categoryID = categoryID;

    // 显示被激活category下的景点分布
    this.getCategory(category, function (res) {
      let itemsList = res.data.objects;
      that.setData({
        itemsList: itemsList
      })
      that.setMarkers(itemsList);
    });
  },

  getCategory(name,cb){//按照name查询
    // 1.通过tableID实例化一个TableObject对象，操作该对象相当于操作对应的数据
    let tableID = 71973;
    let Map = new wx.BaaS.TableObject(tableID);

    // 2.实例化一个Query对象，在该对象上添加查询条件
    let query = new wx.BaaS.Query();
    query.in('category', [name]);
    Map.setQuery(query).find().then(res => cb(res), err => {
      // err
    })
  },

  switchMerchantsItems(e) {
    this.setData({
      isSpread: !this.data.isSpread
    })
  },

  markerTap:function(e){
    // 选中标记点后图标切换
    let markerId = e.markerId;
    let markers = this.data.markers;
    let categoryID = app.globalData.categoryID;
    let itemsList = this.data.itemsList;

    markers.forEach(item=>{
      if(item.id == markerId){
        item.iconPath = "../../resource/images/"+categoryID+"-choosed.png";
      }
      else{
        item.iconPath = "../../resource/images/"+categoryID+".png";
      }
    });

    // 将变动更新到markers数组中
    this.setData({
      markers
    });

    // 更新底部可滚动区域的横向滚动条位置
    let scrollLeft;
    itemsList.forEach((item,index)=>{
      if(item.id == markerId){
        scrollLeft = index * 127;
        this.setData({
          scrollLeft,
          activeMerchantIndex:index//给活跃元素加上边框
        })
      }
    });

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})