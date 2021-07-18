// pages/note/notetext/notetext.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
const db = wx.cloud.database()



Page({

  /**
   * 页面的初始数据
   */
  data: {
   ischange:'0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  
ischangetitle:function(event){


  this.setData({
   ischange:'1'
  })

  console.log(event.detail)
  this.setData({
  notetitle:event.detail
})
  
  },

  ischangetext:function(event){


    this.setData({
     ischange:'1'
    })
  
    console.log(event.detail)
    this.setData({
    notetext:event.detail
  })
    
    },

  notecloudchange:function(){
    var that=this
    var logindata=wx.getStorageSync('logindata')

   
    db.collection('note').doc(that.data.temdatanote[0].temnoteid).update({
      // data 传入需要局部更新的数据
      data: {
        notetext:that.data.notetext,
        notetitle:that.data.notetitle
      },
      success: function(res) {
       
      }
    })

    wx.navigateBack({
      url: '/pages/note/note',
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
    
    this.setData({
      temdatanote: wx.getStorageSync('temdatanote')
    })

    console.log(this.data.temdatanote[0].notetitle)
   

    const that = this
    wx.createSelectorQuery().select('#editor').context(function(res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html:that.data.temdatanote[0].notetitle.html   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                      //that.data.content 是我存在 data 里面的数据
                      //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
      });
    }).exec()
  
    wx.createSelectorQuery().select('#editor2').context(function(res) {
      that.editorCtx = res.context
      that.editorCtx.setContents({
        html:that.data.temdatanote[0].notetext.html   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                      //that.data.content 是我存在 data 里面的数据
                      //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
      });
    }).exec()
  
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