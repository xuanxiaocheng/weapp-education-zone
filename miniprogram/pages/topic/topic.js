// miniprogram/pages/huati/huati.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  topic:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      topic:wx.getStorageSync('topic')
    })

    console.log(this.data.topic)

    var _this = this;
   
    //1、引用数据库
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称
      env: 'work-uoll7'
    })

    db.collection('huati').where({
      id: this.data.topic
    }).get({
      //如果查询成功的话
      success: res => {
        this.setData({
          huati1:res.data[0]
        })
      console.log(res.data)
      }
    }),

  

 
    db.collection('question').where({
      subject: this.data.topic
    }).orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
     
        this.setData({
        
          question:res.data

        })
       
        console.log(res.data)
      }
    })
 

    

  },

  
seejpg: function (e) {

  var that=this
  let jpgid = e.currentTarget.dataset.jpgid;
  console.log(jpgid)

  var _this = this;
    //1、引用数据库
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称
      env: 'work-uoll7'
    })
    //2、开始查询数据了  news对应的是集合的名称
    db.collection('question').where({
      jpgfilearr: e.currentTarget.dataset.jpgid
    }).get({
      //如果查询成功的话
      success: res => {
        console.log(res.data[0].jpgfilearr)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          jpgarr: res.data[0].jpgfilearr
        })

        let jpgarr = this.data.jpgarr;
        console.log(jpgarr)
    
      wx.previewImage({
        current: jpgid,
        urls: jpgarr // 需要预览的图片http链接列表
        
      })  

      }
    })


  },


  comment:function(e){
    var that=this
    let commentid = e.currentTarget.dataset.id;
    console.log(commentid);
    wx.setStorage({
      key:"commentid",
      data:commentid
    })
    wx.navigateTo({
      url: '/pages/comment/comment',
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