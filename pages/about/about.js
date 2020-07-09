// pages/about/about.js
var WxParse = require("../../utils/wxParse/wxParse.js");
var config = require('../../config/config.js');
// 用于富文本解析，将其保存在变量中

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],//轮播图
    schoolName:'',
    englishName:'',
    indicatorDots:true,
    autoplay:true,
    interval:3000
  },

  goToMap: function () {
    wx.navigateTo({
      url: '/pages/guideIndex/guideIndex'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tableID = config.TABLE_ID.SCHOOL;
    let recordID = '5cc061f209628e3148fea39e';

    let School = new wx.BaaS.TableObject(tableID);
    School.get(recordID).then(res=>{
      // success
      // 更新校园简介数据
      this.setData({
        schoolName:res.data.schoolName,
        englishName:res.data.englishName,
        imgUrls:res.data.image,//返回的数据中image正是一个由4个轮播图url构成的数组
      })
    },err=>{
      // err
    });

    // 请求内容库中关于学校介绍的富文本
    let contentGroupID = 1556111442560725;
    let richTextID = 1556111567458195;
    let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID);
    MyContentGroup.getContent(richTextID).then(res => {
      // success
      var content = res.data.content;
      WxParse.wxParse('content','html',content,this);
    },err => {
      // err
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