App({
  onLaunch(){
    // 小程序初始化完成时

    // 引入知晓云SDK
    require('./utils/sdk-wechat.2.0.8-a.js');

    // 初始化SDK
    let clientID = '6e705761cd0ce5005a8f';
    wx.BaaS.init(clientID,{autoLogin:true});
    // 此处与SDK版本有关系，高版本还有一个参数{autoLogin:true}
  },

  // 设置全局数据
  globalData:{
    categoryID:0,
    pageID:''
  }
})
