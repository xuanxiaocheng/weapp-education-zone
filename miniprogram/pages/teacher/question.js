// pages/subject/question.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl3=app.globalData.serverUrl3
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  temtext:'',

  },

  clickme: function () {
    this.showModal();
  },

   //显示对话框
   showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },


  delete(){
    var that=this
    wx.request({
      url: serverUrl3+'/question/'+wx.getStorageSync('temquestionid'),
      method:'DELETE',
      success: (res) => {
        wx.navigateBack({
          delta: 1,
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.setData({
      id:wx.getStorageSync('uid')
    })
    var that=this
    wx.request({
      url: serverUrl3+'/question/'+wx.getStorageSync('temquestionid'),
      success: (res) => {
        console.log(res.data.data.question)
        that.setData({
          question:res.data.data.question
        })
      },
    })

    wx.request({
      url: serverUrl3+'/comment/list/'+wx.getStorageSync('temquestionid'),
      success: (res) => {
        that.setData({
          commentList:res.data.data.commentList.reverse()
        })
        console.log(that.data.commentList)
      },
    })
  },

  commont(){

    var that=this
    wx.request({
      url: serverUrl3+'/comment/new',
      method:'POST',
      data:{
  
          "content": this.data.temtext,
          "questionId": wx.getStorageSync('temquestionid'),
          "replyUserId": wx.getStorageSync('uid'),
          "replyUserName":wx.getStorageSync('teacherdata').name+'老师',
          "headUrl":wx.getStorageSync('teacherdata').avatar
        
      },
      success: (res) => {
        console.log(res)
        that.hideModal()
        wx.request({
          url: serverUrl3+'/comment/list/'+wx.getStorageSync('temquestionid'),
          success: (res) => {
            that.setData({
              commentList:res.data.data.commentList.reverse()
            })
            console.log(that.data.commentList)
          },
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

  answertext(e){
    this.setData({
      temtext:e.detail
    })
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

  },

  showPopupbottom(e) {

    let user=e.currentTarget.dataset.user;

    if(user==wx.getStorageSync('uid')){
    let commentid = e.currentTarget.dataset.commentid;
    console.log(commentid)
  
    this.setData({ 
      showbottom: true, 
      temcommentid:commentid
    });
  }
  },

  onClosebottom() {
    this.setData({ showbottom: false });
  },


  unknow(){
   var that=this
    console.log(wx.getStorageSync('temquestionid'))

 
        wx.request({
          url: serverUrl3+'/question/unKnown/'+wx.getStorageSync('temquestionid')+'/'+wx.getStorageSync('uid'),
          method:'PUT',
          success: (res) => {
            console.log(res)
            if(res.data.message=="成功"){
            wx.request({
              url: serverUrl3+'/question/'+wx.getStorageSync('temquestionid'),
              success: (res) => {
                console.log(res.data.data.question)
                that.setData({
                  question:res.data.data.question
                })
              },
            })
          }
          else{
            wx.showToast({
              title: '你已经点击过啦！',
              icon: 'success',
              duration: 2000
            })
          }
      },
    })

    
  },

  delete(){
    var that=this
    console.log(this.data.temcommentid)

     wx.request({
       url: serverUrl3+'/comment/'+that.data.temcommentid,
       method:'DELETE',
       success: (res) => {
         that.onClosebottom()
        wx.request({
          url: serverUrl3+'/comment/list/'+wx.getStorageSync('temquestionid'),
          success: (res) => {
            that.setData({
              commentList:res.data.data.commentList.reverse()
            })
            console.log(that.data.commentList)
          },
        })
       },
     })
   },

   rewrite(){

   wx.setStorageSync('temquestion', this.data.question)
   
   wx.navigateTo({
    url: '/pages/subject/rewrite',
  })


   }
 


})