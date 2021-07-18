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
    id:'',
    key:'',
    showiddata:false,
    academy:'',
    aclass:'',
    gender: '',
    majoy: '',
    name: '',
    sid:''
  },

  tips(){
    wx.showToast({
      title: '请输入账号与密码',
      icon: 'none',
      duration: 2000
    })
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

  name:function(event){
   this.setData({
     name:event.detail
   })
   console.log(this.data.name)
  },

  academy:function(event){
    this.setData({
      academy:event.detail
    })
  
   },

   majoy:function(event){
    this.setData({
      majoy:event.detail
    })

   },

   aclass:function(event){
    this.setData({
      aclass:event.detail
    })

   },

   gender:function(event){
    this.setData({
      gender:event.detail
    })

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


  enter:function(){

    var me = this;
    var that = this;
    var uid= that.data.id;
    console.log(uid)
  

  
        wx.setStorageSync('idtype', 'student')
   
        var stuid={
          "academy": me.data.academy,
          "aclass": me.data.aclass,
          "gender": me.data.gender,
          "majoy": me.data.majoy,
          "xsname1":me.data.name,
          "sid": me.data.id,
        }

        wx.setStorageSync('stuid',stuid )
    
        wx.request({
          url: serverUrl+'/student/joinApp',
          method:'POST',
          data:{
            "academy": me.data.academy,
            "aclass": me.data.aclass,
            "gender": me.data.gender,
            "majoy": me.data.majoy,
            "name":me.data.name,
            "sid": me.data.id,
          },
          success:function(e){
              console.log('e')
              //把用户名与密码缓存到本地。
               wx.setStorageSync("uid", that.data.id);
               //wx.setStorageSync("pwd", that.data.key);
              wx.switchTab({
                url: '/pages/index/index',
              })      
              console.log(e)
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

     }
     // 成功回调
   })


  },
  

  bindGetUserInfo:function(){


    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        wx.setStorage({
          data: res.userInfo,
          key: 'userInfo',
        })

        var util=require('RSA.js');
        util.setMaxDigits();
        var newpwd = util.encryptedString(encodeURIComponent(this.data.key)); //利用RSA.js对密码进行非对称加密。

        var that=this
        console.log(this.data.id)
        console.log(this.data.key)

        wx.showLoading({
          title: '加载中',
        })

         wx.request({
           url: 'http://212.64.73.25:8999/python/login', //仅为示例，并非真实的接口地址
           method:'POST',
           data: {
             uid: that.data.id,
             pwd: newpwd
           },
           header: {
             'content-type': 'application/json' // 默认值
           },
           success (res) {
             console.log(res)
             wx.hideLoading()
             if(res.data==5){
       
               wx.showToast({
                 title: '登录成功',
                 icon: 'success',
               })

               that.setData({
                 showiddata:true
               })
            
             }else {
               wx.showToast({
                 title: '账户或密码不正确',
                 icon: 'none',
               })
             }
     
           }
         })
       
      }
    })
    
  
    },


    teacherlogin(){

      wx.redirectTo({
        url: '/pages/teacher/login',
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