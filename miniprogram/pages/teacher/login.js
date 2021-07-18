// pages/me/me.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,

  },

  onChange(event) {
    console.log(event.detail);
    this.setData(
    {
      id:event.detail
    }
    )
  },

  onChange1(event) {
    console.log(event.detail);
    this.setData(
      {
        key:event.detail
      }
      )
  },

  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  bindGetUserInfo:function(){
    var that=this
   console.log(this.data.id)
   console.log(this.data.key)
    wx.request({
      url: serverUrl+'/user/login', //仅为示例，并非真实的接口地址
      method:'POST',
      data: {
        password: this.data.key,
        username: this.data.id
      },
      success (res) {
      console.log(res.data)
      if(res.data.data.info=='用户名或密码错误，请重新输入！') {
        wx.showToast({
          title: '账户或密码不正确',
          icon: 'none',
        })
      }
      else{
      wx.setStorageSync('uid',res.data.data.token)
      wx.setStorageSync('idtype','teacher')
      wx.request({
        url: serverUrl+'/user/info', //仅为示例，并非真实的接口地址
        data: {
          token: res.data.data.token
        },
        success (res) {
        console.log(res.data.data)
        wx.setStorageSync('teacherdata',res.data.data)
        wx.switchTab({
          url: '/pages/index/index',
        }) 
        }
      })
      
    
      wx.cloud.callFunction({
        // 需调用的云函数名
        name: 'login',
        // 传给云函数的参数
        data: {
        },
        success: function(res) {
  
          wx.setStorageSync('logindata', res.result)
          wx.getSetting({
            success: function(res){
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function(res) {
                    console.log(res.userInfo)
                    wx.setStorage({
                      data: res.userInfo,
                      key: 'userInfo',
                    })
                    that.setData({
                        userInfo: wx.getStorageSync('userInfo'),
                    })
                  }
                })
              }
             
            }
          })
        
      
        }
        // 成功回调
      })

    }


  
    }
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