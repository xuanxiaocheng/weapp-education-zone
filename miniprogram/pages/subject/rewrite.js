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
  title:wx.getStorageSync('temquestion').title,
  text:wx.getStorageSync('temquestion').text,
  temtitle:wx.getStorageSync('temquestion').title,
  temtext:wx.getStorageSync('temquestion').text

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
      url: serverUrl3+'/question/'+wx.getStorageSync('temquestionid'),
      method:'PUT',
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
    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html:"<p>"+wx.getStorageSync('temquestion').title+"</p>"   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                      //that.data.content 是我存在 data 里面的数据
                      //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
      });
    }).exec()
  
    wx.createSelectorQuery().select('#editor2').context(function(res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html:"<p>"+wx.getStorageSync('temquestion').body+"</p>"   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                      //that.data.content 是我存在 data 里面的数据
                      //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
      });
    }).exec()
  
  },

  delete(){

    wx.request({
      url: serverUrl3+'/question/'+wx.getStorageSync('temquestionid'),
      method:'DELETE',
      success: (res) => {
        wx.navigateBack({
          delta: 2,
        })
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