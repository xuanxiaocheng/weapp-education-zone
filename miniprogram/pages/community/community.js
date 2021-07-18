const app = getApp()
const db = wx.cloud.database()

// miniprogram/pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    //定义一个数据，主要是放集合结果的
    current: 'tab1',
    current_scroll: 'tab1',
    ne: [],
    showbottom: false,
    remain:[],
    jpgurl:"",
    hide:true,
    value: '',
    cardCur: 0,
    isshow: "0",
    show: false,
    title:"0",
    currentname:[
    {
        id:0,
        name:"理工",
        data:[]
   },
   {
    id:1,
    name:"农林"
    },
    {
    id:2,
    name:"人文"
    }
  ],


    swiperList: [{
      id: 0,
      url: 'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E8%80%83%E7%A0%94%E5%B0%81%E9%9D%A2.png?sign=93af19c73063a8ef9fefc4d8b0ed4d48&t=1598184312',
      src: ''
    }, {
      id: 1,
        url: 'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E4%B9%A6%E7%B1%8D%E5%B0%81%E9%9D%A2.png?sign=1e0185b73c383f3e7877876041680f2a&t=1598185017',
      src: ''
    },
    {
      id: 2,
      url: 'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E5%B0%81%E9%9D%A2%E5%88%86%E4%BA%AB.png?sign=3c5d9be47913d15ef873a16f80e829ce&t=1598185143',
      src: ''
    }

    ],




  },

    
  showPopupbottom(e) {
    let data = e.currentTarget.dataset.data;
    console.log(data)
    this.setData({ 
      showbottom: true, 
      temdata:data
    });
    console.log(this.data.temdata.jpgfilearr)
  },

  onClosebottom() {
    this.setData({ showbottom: false });
  },



  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },


  onChange(event) {

 

    this.setData({
      title:event.detail.name,
     
    });
    console.log(this.data.title)
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //1、引用数据库
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称
      env: 'work-uoll7'
    })

    db.collection('question').orderBy('time', 'desc').where({
      _openid:wx.getStorageSync('logindata').openid
    }).get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          my: res.data
        })
        console.log(res.data)
      }
    })
  


    //2、开始查询数据了  news对应的是集合的名称
    db.collection('question').orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
       
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          ne: res.data
        })
       console.log(res.data)
      }

    }),
    db.collection('competition').get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          new: res.data
        })
        console.log(res.data)
      }
    }),

    db.collection('question').orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          question: res.data
        })
        console.log(res.data)
      }
    }),

    db.collection('huati').get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          huati: res.data
        })
        console.log(res.data)
      }
    }),

    //导入理工类提问
    db.collection('question').where({
      subject: "理工"
    }).orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
        let index = 0
        let currentname = this.data.currentname;
        currentname[index].data = res.data
        this.setData({
          currentname: currentnamettttttttttt
        })
       
        console.log(res.data)
      }
    }),
     //导入农林类提问
     db.collection('question').where({
      subject: "农林"
    }).orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
        let index = 1
        let currentname = this.data.currentname;
        currentname[index].data = res.data
        this.setData({
          currentname: currentname
        })
       
        console.log(res.data)
      }
    }),
     //导入人文类提问
     db.collection('question').where({
      subject: "人文"
    }).orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
        let index = 2
        let currentname = this.data.currentname;
        currentname[index].data = res.data
        this.setData({
          currentname: currentname
        })
       
        console.log(res.data)
      }
    })
    

  },

//搜索功能
search: function (e) {
    var that=this
    let key = e.detail;
    console.log(e.detail, key)

    const db = wx.cloud.database();
    const _ = db.command
    if(key==''){
      var _this = this;
      //1、引用数据库
      const db = wx.cloud.database({
        //这个是环境ID不是环境名称
        env: 'work-uoll7'
      })
      db.collection('question').orderBy('time', 'desc').get({
        //如果查询成功的话
        success: res => {
          //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
          this.setData({
            question: res.data
          })
          console.log(res.data)
        }
      })


    }


    if(key!=''){
    db.collection('question').where(_.or([{
        'interviwe.text': db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        name: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).get({
      success: res => {
        console.log(res.data)
        that.setData({
          question:res.data
        })
        console.log(this.data.question)
      },
      fail: err => {
        console.log(err)
      }
    })
    }

},


allshow: function (e) {
  var _this = this;
  //1、引用数据库
  const db = wx.cloud.database({
    //这个是环境ID不是环境名称
    env: 'work-uoll7'
  })
  //2、开始查询数据了  news对应的是集合的名称
  db.collection('question').orderBy('time', 'desc').get({
    //如果查询成功的话
    success: res => {
      //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
      this.setData({
        ne: res.data
      })
    }
  })




},


web:function (e) {
  let src = e.currentTarget.dataset.src;
wx.setStorage({
  data: src,
  key: 'src',
})

wx.navigateTo({
  url: '/pages/competition/gongzhonghao/gongzhonghao',

})

},

  change: function() {

    if(wx.getStorageSync('uid')!=''){
    wx.navigateTo({
      url: '/pages/community/add/add',

    })}

    if(wx.getStorageSync('uid')==''){
      wx.showToast({
        title: '请登录',
        icon:"none",
        duration: 2000
      })
      
    }},

    class: function() {
      wx.FileSystemManager.getSavedFileList({
        success (res) {
          console.log(res)
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

    change0: function() {
      $Message({
        content: '需要授权',
        type: 'warning'
    });
      },



  


  downloadFile: function (e) {
    var that=this
    let url0 = e.currentTarget.dataset.url0;
    console.log(url0)
  
    that.setData({
      isshow: "1",
      show:true
     })

     $Toast({
       content: '加载中',
       type: 'loading',
       duration:0,
       mask: false
   });
 

    wx.cloud.getTempFileURL({
      
      fileList: [{
        fileID: url0,
        maxAge: 60 * 60, // one hour
      }]
    }).then(res => {

      that.setData({
       realurl:res.fileList[0].tempFileURL,
      })
  
      // get temp file URL
      console.log(res.fileList)
      console.log(that.data.realurl)
      wx.downloadFile({
        url: that.data.realurl,
        header: {},
        success: function (res) {
          var filePath = res.tempFilePath;
          console.log(filePath);
          wx.openDocument({
            filePath: filePath,
            showMenu:true,
            success: function (res) {
          
  

              console.log('打开文档成功')
              console.log(that.data.isshow)
              },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            
            }
          })
        },
        fail: function (res) {
          console.log('文件下载失败');
        },
        complete: function (res) { 
          that.setData({
            isshow:"0",
            show:false
           })
        },
  
      })

    }).catch(error => {
      // handle error
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

    this.setData({
    hide:wx.getStorageSync('hide'),
    islogin:wx.getStorageSync('uid'),
  })

  const pages = getCurrentPages()
  //声明一个pages使用getCurrentPages方法
  const perpage = pages[pages.length - 1]
  //声明一个当前页面
  perpage.onLoad()  
  //执行刷新

  var _this = this;
    //1、引用数据库
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称
      env: 'work-uoll7'
    })
    db.collection('question').orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          question: res.data
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




comment0 : function (e) {
  var that=this
  let commentid = e.currentTarget.dataset.id;
  console.log(commentid);
  wx.setStorage({
    key:"commentid",
    data:commentid
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

  },

  huati: function (e) {

    let topic = e.currentTarget.dataset.topic;
    console.log(topic);
    wx.setStorage({
      key: 'topic',
      data: topic
    })

    wx.navigateTo({
      url: '/pages/topic/topic',

    })
  },

  remove: function (e) {
  
   var that=this

    wx.showLoading({
      title: '正在删除',
    })

    console.log(that.data.temdata.jpgfilearr)

    db.collection('question').doc(that.data.temdata._id).remove({
      
      success: function(res) {
       
        wx.cloud.deleteFile({
  
          fileList: that.data.temdata.jpgfilearr
        
        }).then(res => { 

          that.setData({ showbottom: false });
          wx.hideLoading()
          const pages = getCurrentPages()
          //声明一个pages使用getCurrentPages方法
          const perpage = pages[pages.length - 1]
          //声明一个当前页面
          perpage.onLoad()  
          //执行刷新
      
        
        }).catch(error => {
          // handle error
        })

    

      }

    })


}

    


})


