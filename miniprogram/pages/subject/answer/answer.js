// pages/answer/answer.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl3=app.globalData.serverUrl3
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
  title:'',
  text:''
  },

  
  title: function (event) {
    this.setData({
      title:event.detail.text,

    });
    console.log(this.data.title);
  },

  text: function (event) {
    this.setData({      
      text:event.detail.text,
    });
    console.log(this.data.text);
  },


  send:function(){

    console.log(wx.getStorageSync('stuid').xsname1)
    console.log(wx.getStorageSync('userInfo').avatarUrl)
    console.log(wx.getStorageSync('uid'))
    
    wx.request({
  
      url: serverUrl+'/course/'+wx.getStorageSync('temcourseid'),
      success: (res) => {
        console.log(res.data.data.courseInfo)
      
        wx.request({
          url: serverUrl3+'/question/new',
          method:'POST',
          data:{
          body:this.data.text,
          courseId:wx.getStorageSync('temcourseid'),
          createUserId:wx.getStorageSync('uid'),
          createUserName:wx.getStorageSync('stuid').xsname1,
          photoUrl:res.data.data.courseInfo.coverUrl,
          title:this.data.title
          },
          success: (res) => {
            wx.navigateBack({
              delta: 1,
            })
          },
        }) 
    
      }
    })


   
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