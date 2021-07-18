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
  index:0,
  text:'n',
  picker:'请选择...',
  show:false,
  },


  info(){
    wx.showToast({
      title: '选择某课群后，该课群下的全部学生将会收到该通知！',
      icon: 'none',
      duration: 3000
    })
  },
  

  
  text: function (event) {
    this.setData({      
      text:event.detail.html,
    });
    console.log(this.data.text);
  },



  picker(e){

  console.log(this.data.teachercourse[e.detail.value[0]].courseName)
  this.setData({
    index:e.detail.value[0]
  })
  },

  
  enter(){
    this.setData({
      picker:this.data.teachercourse[this.data.index].courseName,
      pickerid:this.data.teachercourse[this.data.index].courseId
    })
    console.log(this.data.teachercourse[this.data.index].courseId)
    this.onClose()
  },

  showPopup() {
    if(this.data.teachercourse.length!=0){
    this.setData({ show: true });
    }
    if(this.data.teachercourse.length==0){
      wx.showToast({
        title: '创建课群后才能发布通知',
        icon: 'none',
        duration: 2000
      })
      }
  },

  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this

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
    var that=this
//教师所有课程
wx.request({
  url: serverUrl+'/course/getTeacherCourse/'+wx.getStorageSync('uid')+'/',
  success: (res) => {
  console.log(res)
  if(res.data.data.list.length!=0){
  that.setData({
    teachercourse:res.data.data.list
  })
  console.log(that.data.teachercourse)
}
if(res.data.data.list.length==0){
  that.setData({
    teachercourse:[]
  })
}
  },
})

  },


  send(){
    var that=this
    wx.request({
      url: serverUrl+'/teacherannounce/publish',
      method:'POST',
      data:{
        "content": that.data.text,
        "courseId": that.data.pickerid,
        "teacherId": wx.getStorageSync('uid')
      
      },
      success: (res) => {
      
    wx.navigateBack({
      delta: 1,
    })
      },
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