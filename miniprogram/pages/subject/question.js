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
  recording:false,
  recordingtime:0,
  recordingend:false, 
  recordtemurl:'',
  tab:"second"
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
        if(res.data.data.question.createUserId==wx.getStorageSync('uid')){
          wx.request({
            url: serverUrl3+'/question/check/'+res.data.data.question.id,
            success: (res) => {
              console.log(res)
            },
          })
        }
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


  playrecord(){
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = this.data.recordtemurl
    //音频的数据链接，用于直接播放。支持云文件ID（2.2.3起）。
    innerAudioContext.play();
    innerAudioContext.onEnded(() => {
      console.log('结束播放')
      this.setData({
        isplaying:false
      })
    })
    this.setData({
      isplaying:true
    })

  },

  playrecord2(e){
  

    
    console.log(e.currentTarget.dataset.recordurl)

        const innerAudioContext = wx.createInnerAudioContext();
        innerAudioContext.src = e.currentTarget.dataset.recordurl
        //音频的数据链接，用于直接播放。支持云文件ID（2.2.3起）。
        innerAudioContext.autoplay = true//是否自动播放
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
        })
    
        innerAudioContext.onError((res) => {
          console.log(res.errMsg)
          console.log(res.errCode)
        })
       
  },


  stoprecord(){
    const innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.src = this.data.recordtemurl
    //音频的数据链接，用于直接播放。支持云文件ID（2.2.3起）。
    innerAudioContext.stop();

    this.setData({
      isplaying:false
    })
  },

  deleterecord(){
    this.setData({
      isplaying:false,
      recording:false,
      recordingend:false,
      recordtemurl:'',
      recordingtime:0
    })  
   
  
  },

  recording(){
 
    var that = this;

    //将计时器赋值给setInter
    that.data.setInter = setInterval(
        function () {
          that.setData({
            recordingtime:that.data.recordingtime+1
          })  
          console.log(that.data.recordingtime);
        }
  , 1000)

const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

  this.setData({
    recording:true
  })  

  const options = {
    duration: 60000,//指定录音的时长，单位 ms
    sampleRate: 16000,//采样率
    numberOfChannels: 1,//录音通道数
    encodeBitRate: 96000,//编码码率
    format: 'aac',//音频格式，有效值 aac/mp3
    frameSize: 50,//指定帧大小，单位 KB
  }
  //开始录音
  recorderManager.start(options);
  recorderManager.onStart(() => {
    console.log('开始录音')
  });
  //错误回调
  recorderManager.onError((res) => {
    console.log(res);
  })

  },


  recordend(){
    const recorderManager = wx.getRecorderManager()
    const innerAudioContext = wx.createInnerAudioContext()
    var that = this;
    //清除计时器  即清除setInter
    clearInterval(that.data.setInter)

    if(that.data.recordingtime<=2){
      this.setData({
        recording:false,
        recordingtime:0
      })
      wx.showToast({
        title: '说话时间太短',
        icon:"none"
      })  
      
    }

    if(that.data.recordingtime>2){
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      this.setData({
        recordtemurl:res.tempFilePath
      })
      const { tempFilePath } = res
    })

    this.setData({
      recording:false,
      recordingend:true    })  
    }

    },

  commont(){

    if(this.data.recordtemurl!=''){
      var that=this
      wx.cloud.uploadFile({
      
        cloudPath: 'add/record/' +that.data.recordingtime+that.data.tab+ (new Date()).getTime() +wx.getStorageSync('uid')+".aac",
         // 上传至云端的路径
        filePath: that.data.recordtemurl,// 小程序临时文件路径
        success: res => {
          console.log(res.fileID)
      wx.request({
        url: serverUrl3+'/comment/new',
        method:'POST',
        data:{
    
            "content": this.data.temtext,
            "questionId": wx.getStorageSync('temquestionid'),
            "replyUserId": wx.getStorageSync('uid'),
            "replyUserName":wx.getStorageSync('stuid').xsname1,
            "headUrl":wx.getStorageSync('userInfo').avatarUrl,
            "recordUrl":res.fileID
          
        },
        success: (res) => {
          that.deleterecord()
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

        }
      })
    }

    if(this.data.recordtemurl==''){
    var that=this
    wx.request({
      url: serverUrl3+'/comment/new',
      method:'POST',
      data:{
  
          "content": this.data.temtext,
          "questionId": wx.getStorageSync('temquestionid'),
          "replyUserId": wx.getStorageSync('uid'),
          "replyUserName":wx.getStorageSync('stuid').xsname1,
          "headUrl":wx.getStorageSync('userInfo').avatarUrl,
          "recordUrl":''
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
  }

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