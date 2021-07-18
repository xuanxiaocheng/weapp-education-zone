// pages/subject/subject.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl0=app.globalData.serverUrl0
var serverUrl3=app.globalData.serverUrl3
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    iskeep:false,//是否收藏
    isjoin:false,//是否加入课群
    ischange:'0',
    note2:false,
    note3:false,
    show:'1',
    note:false,
    show0: true,
    courseid:'',
    active: '',
    activeNames: ['1'],
    course:[],
    coursemessage:[],
    istouch:'0',
    videoSourceUrl:'',
    id:'',
    chosenid:'-1',
    title:'',
    notetitle:'',
    notetext:'',
    temindex:'1'
  },

 
   //显示对话框
showModal: function () {
 
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


    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(600).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true,
     
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
    this.setData({
      note2:false,
      note3:false
    })
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(600).step()
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



  //打开文档查看
  downloadFile: function (e) {

    wx.showLoading({
      title: '加载中',
      mask:'true'
    })

    let fileUrl=e.currentTarget.dataset.fileurl;
    console.log(e.currentTarget.dataset.fileurl)


  
    wx.downloadFile({
      // 示例 url，并非真实存在
      
      url:fileUrl,
      success: function (res) {
        const filePath = res.tempFilePath
        wx.openDocument({
          filePath: filePath,
          success: function (res) {
            console.log('打开文档成功')
            wx.hideLoading()
          }
        })
      }
    })

  },

//写入笔记
addnotecloud:function(){

  var that=this


  var logindata=wx.getStorageSync('logindata')

  db.collection('note').add({
    // data 字段表示需新增的 JSON 数据
    data: {
    notetitle:this.data.notetitle,
    notetext:this.data.notetext,
    openid:logindata.openid
    },

    success: function(res) {

      db.collection('note').get({
        success: function(res) {
          // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
          console.log(res.data)
          that.setData({
            noteall:res.data,
            note2:false,
           
          })
         
          console.log(that.data.noteall)
          
        }
      })

    }
  })




},

//判断笔记内容是否改变
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

interview:function(event){

console.log(event.detail)
this.setData({
  notetitle:event.detail
})

},


interview2:function(event){

  console.log(event.detail)
  this.setData({
    notetext:event.detail
  })
  
  },

noteadd:function(){




  this.setData({
    note2:true
  })
  

  const that = this
  wx.createSelectorQuery().select('#editor0').context(function(res) {
    that.editorCtx = res.context
    that.editorCtx.setContents({
      html:''   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                    //that.data.content 是我存在 data 里面的数据
                    //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
    });
  }).exec()

  wx.createSelectorQuery().select('#editor1').context(function(res) {
    that.editorCtx = res.context
    that.editorCtx.setContents({
      html:''   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                    //that.data.content 是我存在 data 里面的数据
                    //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
    });
  }).exec()

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


notesee:function(event){
  var index= event.currentTarget.dataset.num
  console.log(index)

  var id=event.currentTarget.dataset.id

  this.setData({
    note3:true,
    temindex:index,
    notetitle:this.data.noteall[index].notetitle,
    notetext:this.data.noteall[index].notetext,
    temnoteid:id
  })

  console.log(this.data.notetitle)
  console.log(this.data.temnoteid)
  console.log(this.data.notetext)
 

  const that = this
  wx.createSelectorQuery().select('#editor').context(function(res) {
    that.editorCtx = res.context
    that.editorCtx.setContents({
      html:that.data.noteall[index].notetitle.html   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                    //that.data.content 是我存在 data 里面的数据
                    //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
    });
  }).exec()

  wx.createSelectorQuery().select('#editor2').context(function(res) {
    that.editorCtx = res.context
    that.editorCtx.setContents({
      html:that.data.noteall[index].notetext.html   //这里就是设置默认值的地方（html 后面给什么就显示什么）
                    //that.data.content 是我存在 data 里面的数据
                    //注意是 this 赋值的 that，如果用 this 就把上面的 function 改成箭头函数
    });
  }).exec()



},


noteadd2:function(){
  this.setData({
    note2:false,
    note3:false
  })
},

playvideo: function (e) {

   this.setData({
     loading:true
   })

    let id=e.currentTarget.dataset.id;

    let videoSourceid=e.currentTarget.dataset.fileurl;
    console.log(videoSourceid)
    wx.request({
      url: serverUrl0+':9003/vod/getPlayUrl/'+videoSourceid,
      success: (res) => {
        console.log(res.data.data.playURL)     
        
       this.setData({
       videoSourceUrl:res.data.data.playURL,
       istouch:'1',
       chosenid:id
      })

      console.log(this.data.chosenid)
   
      },
    })

},

freshover(){
  this.setData({
    loading:false
  })
},


keep:function(){

  var that=this
  wx.showToast({
    title: '已成功收藏',
    icon: 'success',
    duration: 2000
  })

  wx.request({
    url: serverUrl+'/student/collectCourse/'+wx.getStorageSync('uid')+'/'+wx.getStorageSync('temcourseid'),
    success: (res) => {
      console.log(res)
      that.setData({
        iskeep:true
      })

    },
  })


},

join:function(){
       var that=this
        wx.showToast({
          title: '已成功加入',
          icon: 'success',
          duration: 2000
        })

        wx.request({
          url: serverUrl+'/course/join/'+wx.getStorageSync('uid')+'/'+wx.getStorageSync('temcourseid'),
          success: (res) => {
            console.log(res)
            that.setData({
              course: res.data.data.list,
              isjoin:true
            })
      
          },
        })
    


},

 
unkeep:function(){
  var that=this
     wx.showToast({
          title: '已退出课群',
          icon: 'success',
          duration: 2000
        })

        wx.request({
          url: serverUrl+'/student/cancelCollectCourse/'+wx.getStorageSync('uid')+'/'+wx.getStorageSync('temcourseid'),
          method:'DELETE',
          success: (res) => {
            console.log(res)
            that.setData({
              iskeep:false
            })
      
          },
        })
    
},

unjoin:function(){
    var that=this
     wx.showToast({
          title: '已退出课群',
          icon: 'success',
          duration: 2000
        })

        wx.request({
          url: serverUrl+'/course/quit/'+wx.getStorageSync('uid')+'/'+wx.getStorageSync('temcourseid'),
          success: (res) => {
            that.setData({
              course: res.data.data.list,
              isjoin:false
            })
      
          },
        })
    

 

},


onChange1(event) {
    

    this.setData({

      title: event.detail.name

    })
     
      console.log(this.data.title)
      
},


onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
},

answer: function (options) {
   
    wx.navigateTo({
      url: '/pages/subject/answer/answer',
    })

},

test: function (e) {
   
  var chaperid=e.currentTarget.dataset.chaperid;
  wx.setStorage({
    data: chaperid,
    key: 'chaperid',
  })

    wx.navigateTo({
      url: '/pages/subject/test/test',
    })

},


question: function (e) {

   var id=e.currentTarget.dataset.id
   wx.setStorageSync('temquestionid', id)

   wx.request({
    url: serverUrl3+'/question/read/'+id,
    method:'PUT',
    success: (res) => {
      console.log(res)
      wx.navigateTo({
        url: '/pages/teacher/question',
      })
    },
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

    var logindata=wx.getStorageSync('logindata')
    this.setData({
      courseid:wx.getStorageSync('temcourseid'),
      active: wx.getStorageSync('active'),

    })

 
  wx.request({
    url: serverUrl+'/chapter/list/'+this.data.courseid,
    success: (res) => {
      console.log(res.data.data.list)
    
      this.setData({
        course: res.data.data.list,
      })
      
      console.log(this.data.course[0])

    },

    

  
  })

  wx.request({
  
    url: serverUrl+'/course/'+this.data.courseid,
    success: (res) => {
      console.log(res.data.data.courseInfo)
    
      this.setData({
        coursemessage: res.data.data.courseInfo,
      })

      if(wx.getStorageSync('latelycourse')!=''){
        var a=0
        var latelycourse=wx.getStorageSync('latelycourse')
        for (var j = 0; j <latelycourse.length; j++){
          var char = res.data.data.courseInfo.courseId
          var charArr = latelycourse
          var index = charArr[j].courseId.indexOf(char)
          if (index <0){
            a++
            console.log('数组里面没有这个元素')
            if(a==latelycourse.length){
            latelycourse=latelycourse.concat(res.data.data.courseInfo)
            wx.setStorageSync('latelycourse', latelycourse)
            }
          }else{
            console.log('数组里面有这个元素')
            var temc=latelycourse[j]
            latelycourse.splice(j,1)
            latelycourse[latelycourse.length]=temc
            console.log(latelycourse)
            j=latelycourse.length
            wx.setStorageSync('latelycourse', latelycourse)
          }
         }
        }
      
        if(wx.getStorageSync('latelycourse')==''){
          var latelycourse=[]
          latelycourse=latelycourse.concat(res.data.data.courseInfo)
          wx.setStorageSync('latelycourse', latelycourse)
        }
        

     
    },

    

  
  })


  

  

wx.request({
  url: serverUrl3+'/question/list/'+wx.getStorageSync('temcourseid'),
  success: (res) => {
  that.setData({
    questionList:res.data.data.questionList.reverse()
  })
  console.log(res.data.data.questionList)
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