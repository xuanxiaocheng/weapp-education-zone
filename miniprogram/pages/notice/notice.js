// miniprogram/pages/notice/notice.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl2=app.globalData.serverUrl2
var serverUrl3=app.globalData.serverUrl3

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that=this
    wx.request({
      url: serverUrl+'/studentannounce/myAnnounce/'+wx.getStorageSync('uid'),
      success: (res) => {
      console.log(res)
      that.setData({
        annonuceList:res.data.data.annonuceList.reverse()
      })
      },
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  
  text(e){
    var id=e.currentTarget.dataset.id
    var content=e.currentTarget.dataset.content
    console.log(id)
    wx.setStorageSync('temnotice', content)

    wx.request({
      url: serverUrl+'/studentannounce/markAnnouce/'+id,
      success: (res) => {
      console.log(res)
      },
    })

    wx.navigateTo({
      url: '/pages/notice/text',
    })
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