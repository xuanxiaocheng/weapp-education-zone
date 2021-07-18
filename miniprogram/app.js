//app.js
App({

 
 

  onLaunch: function () {



    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.cloud.init({
      env: 'work-uoll7'
    })

  },

  


  globalData: {
    userInfo: null,
    serverUrl0: "http://212.64.73.25",// IP地址 【公网】
    serverUrl: "http://212.64.73.25:9001",// IP地址 【公网】
    serverUrl2: "http://212.64.73.25:8999",// IP地址 【公网】
    serverUrl3: "http://212.64.73.25:9101",// IP地址 【公网】
  }


  
})