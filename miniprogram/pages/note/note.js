// pages/note/note.js
// pages/subject/subject.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  answer: function (options) {
   
    wx.navigateTo({
      url: '/pages/note/notewrite/notewrite',
    })

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
    db.collection('note').doc(that.data.temnoteid).update({
      // data 传入需要局部更新的数据
      data: {
        notetext:that.data.notetext,
        notetitle:that.data.notetitle
      },
      success: function(res) {
        db.collection('note').get({
          success: function(res) {
            // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
            console.log(res.data)
            that.setData({
              noteall:res.data,
              note3:false,
            })
           
            console.log(that.data.noteall)
            
          }
        })
      }
    })

  },
  

notedelete:function(event){
  var that=this
  var id= event.currentTarget.dataset.id
  console.log(id)
  db.collection('note').doc(id).remove({
    success: function(res) {
   
    
      db.collection('note').get({
        success: function(res) {
          // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
          console.log(res.data)
        that.setData({
          noteall:res.data
        })
          console.log(that.data.noteall)
        }
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
    
    var logindata=wx.getStorageSync('logindata')

    var that=this
    db.collection('note').where({
      openid:logindata.openid
    }).get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({
          noteall:res.data
        })
        console.log(that.data.noteall)
      }
    })

  },

  notetext: function (event) {
    var index= event.currentTarget.dataset.num
    console.log(index)
  
    var id=event.currentTarget.dataset.id
  

    var temdatanote=[{
      temindex:index,
      notetitle:this.data.noteall[index].notetitle,
      notetext:this.data.noteall[index].notetext,
      temnoteid:id
    }]

    wx.setStorageSync('temdatanote', temdatanote)


   
    wx.navigateTo({
      url: '/pages/note/notetext/notetext',
    })

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