// pages/message/message.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl3=app.globalData.serverUrl3
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userHead:[],
    user:[],
  },


  comment(){
    var that=this

    wx.request({
      url: serverUrl3+'/question/myQuestionResult/'+wx.getStorageSync('uid'),
      success: (res) => {
   
          console.log(res.data.data.list)
          that.setData({
            myQuestions:res.data.data.list.reverse()
          })
          wx.hideTabBarRedDot({
            index: 1,
          })
          var num=0
          for(var i=0;i<res.data.data.list.length;i++){
          console.log(res.data.data.list)
          num=num+res.data.data.list[i].question.unReadCount
          console.log(num)
        
            if(num>0){
              wx.showTabBarRedDot({
                index: 1,
              })
             i=res.data.data.list.length
          }
          
          }
      },
    })
  },

  question: function (e) {

    var temquestionid=e.currentTarget.dataset.temquestionid
    wx.setStorageSync('temquestionid', temquestionid)
    console.log(temquestionid)

        wx.navigateTo({
          url: '/pages/subject/question',
        })
    

  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(wx.getStorageSync('idtype')=='student'){
    this.comment()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  teacher(){
  var that=this
//教师所有课程
wx.request({
  url: serverUrl+'/course/getTeacherCourse/'+wx.getStorageSync('uid')+'/',
  success: (res) => {
  console.log(res)
  let promise = new Promise( function ( resolve, reject ) {
    if(res.data.data.list.length!=0){
  that.setData({
    teachercourse:res.data.data.list
  })
  console.log(res)
}

if(res.data.data.list.length==0){
  that.setData({
    teachercourse:[]
  })

}

  resolve();
});

if(that.data.teachercourse.length!=0){
promise.then( function () {

  that.setData({
    userHead:[],
  })

 for(var i=0;i<that.data.teachercourse.length;i++){
  let s = new Promise((resolve, reject) => {
    wx.request({
      url: serverUrl3+'/question/teacher/'+that.data.teachercourse[i].courseId,
      method: 'GET',
      success(res) {
        console.log(res)
        resolve(res.data.data.count)
      },
    })
  });
  that.data.userHead.push(s);
  that.setData({
    userHead: that.data.userHead,
  });
  console.log(that.data.userHead)

};

 
 for (let j = 0; j < that.data.userHead.length;j++){
   console.log(j)
  that.data.userHead[j].then(v=>{
    that.data.teachercourse[j].data=v;

  
      that.setData({
        isloading:false,
        teachercourse2: that.data.teachercourse,
      });
      
  })
  console.log(that.data.teachercourse)
}
 }
);

}

if(that.data.teachercourse.length==0){
  that.setData({
    isloading:false,
    teachercourse2: [],
  });
}

  },
})

 
  },


  subjectteacher: function (event) {
  
    wx.setStorageSync('active', 3)
   

    wx.setStorageSync('temcourseid', event.currentTarget.dataset.temcourseid)
  
      wx.navigateTo({
        url: '/pages/teacher/subject',
      })
    
  
    },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

   var that=this
   this.setData({
    loginid:wx.getStorageSync('idtype'),
    isloading:true
   })  
 
   if(wx.getStorageSync('idtype')=='student'){

    if(wx.getStorageSync('uid')!=''){
      this.comment()
  }


  }
  
  if(wx.getStorageSync('idtype')==''){
    wx.redirectTo({
      url: '/pages/login/login',
    })
  }

    if(wx.getStorageSync('idtype')=='teacher'){
    
      this.teacher()
      
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
  this.comment()
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