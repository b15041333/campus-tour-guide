var config = require('../../config/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    title:'',
    description:'',
    latitude:0,
    longitude:0,
    comment:[],
    userInfo:{},
    optionData:{},
    pageId:''
  },

  openLocation: function () {
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.title,
    })
  },

  bindFormSubmit(e){
    let tableID = config.TABLE_ID.MAP;
    let Map = new wx.BaaS.TableObject(tableID);
    let pageID = this.data.pageId;
    let record = Map.getWithoutData(pageID);
    record.append('comment', e.detail.value.textarea);
    record.update().then(res => {
      wx.showToast({
        title: '评论成功！',
        icon: 'success',
        duration: 2000
      });
    },err => {
      wx.showToast({
        title: '评论失败！',
        icon: 'fail',
        duration: 2000
      });
    });
    this.onLoad(this.data.optionData);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;

    this.data.optionData = option;
    this.data.pageId = option.id;
    // options.id记录的是在guideIndex选取的地点id（通过url传递）。
    let pageID = this.data.pageId;

    // 通过标记点id查询map表获取标记点信息
    let tableID = config.TABLE_ID.MAP;
    let Map = new wx.BaaS.TableObject(tableID);
    Map.get(pageID).then(res=>{
      that.setData({
        title:res.data.title,
        description:res.data.description,
        imgUrls:res.data.image,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        comment:res.data.comment
      })
    },err=>{
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})