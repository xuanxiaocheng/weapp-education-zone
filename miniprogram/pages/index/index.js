// pages/index/index.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl2=app.globalData.serverUrl2
var serverUrl3=app.globalData.serverUrl3
const db = wx.cloud.database()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
   active: 0,
   unread:0,
   annonuceList:[{courseName:'暂无通知公告',content:''}],
   myclass:[],
   courseInfo:[],
   joincourse:[],
   coursemessage:[],
   show: false,
   temcourseid:'',
   botton:[
  {name:'在线课程',icon:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%AF%BE%E7%A8%8Bicon.png?sign=0f8cb7faf7f9fa3bf2a42b4e6014d52a&t=1606992690',bindtap:'classcenter'},
  {name:'加入课群',
   icon:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E5%8A%A0%E5%85%A5%E8%AF%BE%E7%BE%A4.png?sign=c952472b61afe4e333ca66199eed0005&t=1611641846',bindtap:'onClickShow'},
   {name:'学习交流',
    icon:"https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E4%BA%A4%E6%B5%81%E5%AE%A4icon.png?sign=ba2249c65ced541e6fe784cd8952d04f&t=1607093411",bindtap:'community'
   },           
   {name:'通知公告',
  icon:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%B5%84%E6%96%99icon.png?sign=c7ccc3441a17c4dc187a2b2a6c4fc885&t=1607093080',bindtap:'notice'},
  ],
  bottonteacher:[
    {name:'在线课程',icon:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%AF%BE%E7%A8%8Bicon.png?sign=0f8cb7faf7f9fa3bf2a42b4e6014d52a&t=1606992690',bindtap:'classcenterteacher'},
    {name:'发布通知',
     icon:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E5%8A%A0%E5%85%A5%E8%AF%BE%E7%BE%A4.png?sign=c952472b61afe4e333ca66199eed0005&t=1611641846',bindtap:'sendnote'},
     {name:'我的通知',
    icon:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%B5%84%E6%96%99icon.png?sign=c7ccc3441a17c4dc187a2b2a6c4fc885&t=1607093080',bindtap:'mynote'},
     {name:'学习交流',
      icon:"https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E4%BA%A4%E6%B5%81%E5%AE%A4icon.png?sign=ba2249c65ced541e6fe784cd8952d04f&t=1607093411",bindtap:'community'
     }
    ],
    
  
  

},

onClickShow() {

   if(wx.getStorageSync('uid')==''){
    wx.showToast({
      title: '请登录',
      icon: 'none',
    })

   }

   else{
  this.setData({ show: true });
   }
},

onClickHide() {
  this.setData({ show: false });
},

classcenter: function () {
  wx.navigateTo({
    url: '/pages/classcenter/classcenter',
  })
},

classcenterteacher: function () {
  wx.navigateTo({
    url: '/pages/teacher/classcenter',
  })
},


classnagavitor: function () {
  wx.navigateTo({
    url: '/pages/class/class',
  })
},

search: function () {

  wx.navigateTo({
    url: '/pages/search/search',
  })

},


  subject: function (event) {

  wx.setStorageSync('temcourseid', event.currentTarget.dataset.temcourseid)
  

    wx.navigateTo({
      url: '/pages/subject/subject',
    })
  

  },

  subjectteacher: function (event) {

    wx.setStorageSync('active', 0)
    wx.setStorageSync('ismyclass', true)
    wx.setStorageSync('temcourseid', event.currentTarget.dataset.temcourseid)
  
      wx.navigateTo({
        url: '/pages/teacher/subject',
      })
    
  
    },

community: function () {

  wx.navigateTo({
    url: '/pages/community/community',
  })

},


login:function(){
  wx.navigateTo({
    url: '/pages/login/login',
  })
},


notice:function(){
  wx.navigateTo({
    url: '/pages/notice/notice',
  })
},


sendnote(){
  wx.navigateTo({
    url: '/pages/teacher/addnote',
  })
},


mynote(){
  wx.navigateTo({
    url: '/pages/teacher/mynote',
  })
},



joincoursemain:function(){
  var that=this
  wx.setStorage({
    data: this.data.temcourseid,
    key: 'temcourseid',
  })


        var that=this

        wx.request({
          url: serverUrl+'/course/join/'+wx.getStorageSync('uid')+'/'+this.data.temcourseid,
          success: (res) => {
            console.log(res)
      
            wx.navigateTo({
              url: '/pages/subject/subject',
            })

            that.setData({
              show:false,
              temcourseid:''
            })
    
            wx.showToast({
              title: '加入成功',
              icon: 'success',
            })
          },
        })
  

     
  

},


join:function(){

  var that=this

  wx.request({
    url: serverUrl+'/course/join/2021/'+this.data.temcourseid,
    success: (res) => {
      console.log(res)
  
    if(res.data.data.info[0]=='加'){

 
wx.request({
  url: serverUrl2+'/course/getStudentCourseList/'+wx.getStorageSync('uid'),
  success: (res) => {
   console.log(res.data.message)
   if(res.data.message=='出错了..'){
    this.joincoursemain()
   }

   if(res.data.message=='成功'){
   var a=0
   for (var j = 0; j <res.data.data.list.length; j++){
    var char = that.data.temcourseid
    var charArr =res.data.data.list
    var index = charArr[j].courseId.indexOf(char)
    if (index <0){
      a++
      if(a==res.data.data.list.length){
      this.joincoursemain()
      }
    }else{
      wx.showToast({
        title: '已有此课程',
        icon: 'none',
      })
      j=res.data.data.list.length

    }
   }
  }
  },
})
        
      

    }

    if(res.data.data.info[0]=='该'){

      wx.showToast({
        title: '课群码错误',
        icon: 'none',
      })
  
      }



    }
})

},


joinnum:function(event){

this.setData({
  temcourseid:event.detail.value
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
    var that=this

    

    this.setData({
      userInfo:wx.getStorageSync('uid'),
      loginid:wx.getStorageSync('idtype')
    })

 
    if(wx.getStorageSync('idtype')=='student'){
    if(wx.getStorageSync('uid')!=''){

    this.noticenum()

    var logindata=wx.getStorageSync('logindata')
    console.log(logindata.openid)


//获取学生加入课程
wx.request({
  url: serverUrl2+'/course/getStudentCourseList/'+wx.getStorageSync('uid'),
  success: (res) => {
   console.log(res.data)
   if(res.data.message=="出错了.."){
    that.setData({
      courseInfo:[]
    })
    console.log(that.data.courseInfo.length)
    wx.setStorageSync('joincourse', [])
   }

   if(res.data.message=="成功"){
   that.setData({
     courseInfo:res.data.data.list
   })
   console.log(that.data.courseInfo)
  
  }
  },
})

//获取学生提出问题新消息数量 
wx.request({
  url: serverUrl3+'/question/myQuestionResult/'+wx.getStorageSync('uid'),
  success: (res) => {
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
  }else{
    wx.hideTabBarRedDot({
      index: 1,
    })
   
  }

  
  }
  },
})


    }
  }

if(wx.getStorageSync('idtype')=='teacher'){
//教师端
//查课程
wx.request({
  url: serverUrl+'/course/getTeacherCourse/'+wx.getStorageSync('uid')+'/',
  success: (res) => {
  console.log(res)
  if(res.data.data.list.length!=0){
  that.setData({
    teachercourse:res.data.data.list
  })
  this.teacher()
}
if(res.data.data.list.length==0){
  that.setData({
    teachercourse:[]
  })
}
  },
})


}
  },


  teacher(){
    var numteacher=0
    var that=this
  //教师所有课程
  wx.request({
    url: serverUrl+'/course/getTeacherCourse/'+wx.getStorageSync('uid')+'/',
    success: (res) => {
    console.log(res)
    let promise = new Promise( function ( resolve, reject ) {
    that.setData({
      teachercourse:res.data.data.list
    })
    console.log(res)
    resolve();
  });
  
  promise.then( function () {
  
    that.setData({
      userHead:[],
    })

       
    wx.hideTabBarRedDot({
      index: 1,
    })
   
   for(var i=0;i<that.data.teachercourse.length;i++){
  
      wx.request({
        url: serverUrl3+'/question/teacher/'+that.data.teachercourse[i].courseId,
        method: 'GET',
        success(res) {
       
          numteacher=numteacher+res.data.data.count
          if(res.data.data.count>0){
            wx.showTabBarRedDot({
              index: 1,
            })
           i=that.data.teachercourse.length
        }
        },
      })

  
  };
  
   

   }
  );
  
  
  
    },
  })
  
   
    },
  
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  noticenum(){
    var that=this
//通告
wx.request({
  url: serverUrl+'/studentannounce/myAnnounce/'+wx.getStorageSync('uid'),
  success: (res) => {


  console.log(res.data.data.annonuceList)

 if(res.data.data.annonuceList.length!=0){
  that.setData({
    annonuceList:res.data.data.annonuceList
  })
  var a=0
  for (var j = 0; j <res.data.data.annonuceList.length; j++){
    var char = 0
    var charArr = res.data.data.annonuceList
    var index = charArr[j].isRead.indexOf(char)
    if (index <0){
    console.log('没有')
    that.setData({
      unread:a
    })
    }else{
      console.log('有')
      a++
      that.setData({
        unread:a
      })
      console.log(that.data.unread)
    }
   }
  }
  },
})

  },

  text(e){
    var id=e.currentTarget.dataset.id
    var content=e.currentTarget.dataset.content
    console.log(id)
    wx.setStorageSync('temnotice', content)

    wx.request({
      url: serverUrl+'/studentannounce/markAnnouce/'+id,
      success: (res) => {
      console.log(res)
      },
    })

    wx.navigateTo({
      url: '/pages/notice/text',
    })
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