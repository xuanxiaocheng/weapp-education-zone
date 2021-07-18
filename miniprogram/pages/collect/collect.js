// miniprogram/pages/collect/collect.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
const db = wx.cloud.database()

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
    var that=this
    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
    })

  },


  subject:function(e){
    var id=e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.id)
    wx.setStorageSync('temcourseid',id)

    wx.navigateTo({
      url: '/pages/subject/subject',
    })
  
  },


  keepdelete:function(e){
    var id=e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.id)
    var that=this
    wx.showToast({
         title: '已取消收藏',
         icon: 'success',
         duration: 2000
       })

       wx.request({
         url: serverUrl+'/student/cancelCollectCourse/'+wx.getStorageSync('uid')+'/'+id,
         method:'DELETE',
         success: (res) => {
         console.log(res)
         const pages = getCurrentPages()
         //声明一个pages使用getCurrentPages方法
         const perpage = pages[pages.length - 1]
         //声明一个当前页面
         perpage.onShow()  
         //执行刷新
         },
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
    var that=this
    if(this.data.userInfo!=''){
      wx.request({
        url: serverUrl+'/student/getCollectionList/'+wx.getStorageSync('uid'),
        success: (res) => {
         console.log(res.data)
         if(res.data.message=="出错了.."){
          that.setData({
            collection:[]
          })
          wx.setStorageSync('joincourse', [])
         }
      
         if(res.data.message=="成功"){
         that.setData({
          collection:res.data.data.list
         })
        
        }
        },
      })
  }
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