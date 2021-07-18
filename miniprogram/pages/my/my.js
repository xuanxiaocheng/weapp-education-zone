// pages/my/my.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl3=app.globalData.serverUrl3
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
          
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    //判断微信是否授权
    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
    })

    //教师端
    if(wx.getStorageSync('idtype')=='teacher'){
      this.setData({
        teacher:wx.getStorageSync('teacherdata')
      })
     }

     
    //学生端
    if(wx.getStorageSync('idtype')=='student'){
    
      this.setData({
        xy: wx.getStorageSync('stuid').academy,
        zy: wx.getStorageSync('stuid').majoy,
        bj: wx.getStorageSync('stuid').aclss,
        mz: wx.getStorageSync('stuid').xsname1,
        uid: wx.getStorageSync('stuid').sid
      })
      console.log(this.data.mz)


    }

  },

  
  subject: function (event) {

  wx.setStorageSync('temcourseid', event.currentTarget.dataset.id)

    wx.navigateTo({
      url: '/pages/subject/subject',
    })
  

  },

      
  showPopupbottom(e) {
    let data = e.currentTarget.dataset.data;
    console.log(data)
    this.setData({ 
      showbottom: true, 
      temdata:data
    });
    console.log(this.data.temdata)
  },

  onClosebottom() {
    this.setData({ showbottom: false });
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
    this.setData({
      loginid:wx.getStorageSync('idtype')
    })

   
   //未登录
    if(wx.getStorageSync('idtype')==''){
      wx.redirectTo({
        url: '/pages/login/login',
      })
    }

    //学生端
    if(wx.getStorageSync('idtype')=='student'){
   

  if(wx.getStorageSync('latelycourse')!=''){
    this.setData({
      latelycourse:wx.getStorageSync('latelycourse').reverse()
    })
    console.log(this.data.latelycourse)
  }

  if(wx.getStorageSync('latelycourse')==''){
    this.setData({
      latelycourse:1
    })
   console.log(this.data.latelycourse)
  }

    this.setData({
      userInfo:wx.getStorageSync('userInfo'),
    })

  }
  },

  note: function (options) {
   
    wx.navigateTo({
      url: '/pages/note/note',
    })

  },

  collect: function (options) {
   
    wx.navigateTo({
      url: '/pages/collect/collect',
    })

  },

  loginout(){

    wx.request({
      url: serverUrl+'/student/cancellation/'+wx.getStorageSync('uid'),
      method:'GET',
      data:{
      },
      success:function(res){
      
        console.log(res)
        wx.clearStorage()

        wx.hideTabBarRedDot({
          index: 1,
        })
    
        wx.reLaunch({
          url: '/pages/login/login',
        })
    

      }
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