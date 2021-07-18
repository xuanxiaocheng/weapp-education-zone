// miniprogram/pages/comment/comment.js
const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tipsshow:"0",
    show: false,
    isshow:"",
  jpgnumber:'',
  answertext:'',
  answernumber:"0",
  jpgarr:[],
  jpgfilearr:[],
  comment:[],
  circular: true,
  //是否显示画板指示点  
  indicatorDots: false,
  //选中点的颜色  
  indicatorcolor: "#000",
  //是否竖直  
  vertical: false,
  //是否自动切换  
  autoplay: true,
  //自动切换的间隔
  interval: 2500,
  //滑动动画时长毫秒  
  duration: 600,
  //所有图片的高度  
  imgheights: [],
  //图片宽度 
  imgwidth: 750,
  //默认  
  current: 0,
  id:wx.getStorageSync('logindata').openid
  },

  preventD() {
    return
  },

  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
      console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = 700;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
   
    let {current, source} = e.detail
    if(source === 'autoplay' || source === 'touch') {
    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
      this.setData({
        current: current
      })
    }


  },



  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  addjpg: function () {
    var that = this;
    wx.chooseImage({
      count: 9-that.data.jpgnumber,
    success: function(res) {
   
     //chooseImage方法调用成功
      that.setData({
        ischoose1: true,
        jpgarr: that.data.jpgarr.concat(res.tempFilePaths),
        jpgnumber:that.data.jpgarr.length
      });
      console.log(that.data.jpgarr);

      that.setData({
       jpgnumber:that.data.jpgarr.length
     });
    console.log(that.data.jpgnumber);
  

    

      
    },
    fail: function (res) { 
  
   },

   
})

},



  //上传文字
  update3: function (e) {
    



    //获取时间戳
    var that=this
    var M = parseInt((new Date()).getMonth().toString())+1; 
//日  
var D =  (new Date()).getDate().toString(); 
//时  
var h = (new Date()).getHours().toString(); 
//分  
var m = (new Date()).getMinutes().toString(); 

console.log("当前时间："+M+"-"+D+" "+h+":"+m);

var realtime=(M+"-"+D+" "+h+":"+m)
    const db = wx.cloud.database()
      var timestamp = Date.parse(new Date());
      console.log("当前时间戳为：" + timestamp);
  

      this.setData({
        nickName: wx.getStorageSync('userInfo'),
        avatarUrl: wx.getStorageSync('userInfo'),
      })

      console.log(that.data.nickName)
      var animation = wx.createAnimation({
        duration: 200,
        timingFunction: "linear",
        delay: 0
      })
      that.animation = animation
      animation.translateY(300).step()
      that.setData({
        animationData: animation.export(),
      })
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export(),
          showModalStatus1: false
        })
      }.bind(that), 200)


  

      var _this = this;
      //1、引用数据库
      const db1 = wx.cloud.database({
        //这个是环境ID不是环境名称
        env: 'work-uoll7'
      })
  
      //2、开始查询数据了  news对应的是集合的名称
      db1.collection('comment2').add({
        data: {
          id: wx.getStorageSync('commentid1'),
          time: timestamp,
          name:that.data.nickName.nickName,
          avatarUrl: that.data.avatarUrl.avatarUrl,
          answertext:that.data.answertext,    
        },
    
        //如果查询成功的话
        success: res => {
          

              console.log(res)
              const pages = getCurrentPages()
              //声明一个pages使用getCurrentPages方法
              const perpage = pages[pages.length - 1]
              //声明一个当前页面
              perpage.onLoad()  
              //执行刷新

             
              that.setData({
                isshow:'',
                tipsshow:"1"
              })
          
              wx.showToast({
                title: '提交成功',
                icon: 'success',
                duration: 2000
              })
              
        }
      })
  



    
        },








  //上传文字+图片
  update2: function () {
 
    wx.showLoading({
      title: '提交中...',
      mask:'true'
    })


    //获取时间戳
    var that=this
    var M = parseInt((new Date()).getMonth().toString())+1; 
//日  
var D =  (new Date()).getDate().toString(); 
//时  
var h = (new Date()).getHours().toString(); 
//分  
var m = (new Date()).getMinutes().toString(); 

console.log("当前时间："+M+"-"+D+" "+h+":"+m);

var realtime=(M+"-"+D+" "+h+":"+m)
    const db = wx.cloud.database()
      var timestamp = Date.parse(new Date());
      console.log("当前时间戳为：" + timestamp);
  

 

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



      this.setData({
        nickName: wx.getStorageSync('userInfo'),
        avatarUrl: wx.getStorageSync('userInfo'),
      })

      db.collection('comment').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          time: timestamp,
          name:this.data.nickName.nickName,
          avatarUrl: this.data.avatarUrl.avatarUrl,
          answertext:this.data.answertext,
          realtime:realtime,
          length:that.data.jpgnumber,
          commentid:wx.getStorageSync('commentid'),
          jpgfilearr:[],
          length:that.data.jpgnumber,
          comment:[]
        },


        
        success: function(res) {
          console.log(res)
          that.setData({
          jpgarrid:res._id
          })
        console.log(res)
      
        if (that.data.jpgnumber!=""){
          for (let i = 0; i < that.data.jpgnumber; i++) {

          console.log(i)

            wx.cloud.uploadFile({

              cloudPath: 'add/jpg/' +i+ (new Date()).getTime() +"name.png",
               // 上传至云端的路径
              filePath: that.data.jpgarr[i],// 小程序临时文件路径
            
    
              success: res => {
                
                that.setData({
                  jpgfilearr:that.data.jpgfilearr.concat(res.fileID)
                })

                console.log(that.data.jpgfilearr)

              

                db.collection('comment').doc(that.data.jpgarrid).update({
                  // data 传入需要局部更新的数据
                  data: {
                    jpgfilearr:that.data.jpgfilearr
                  },
                  success: function(res) {
                    console.log(res)
          

                    if (that.data.jpgfilearr.length==that.data.jpgnumber) {
            

                      that.setData({
                        isshow:'',
                        tipsshow:"1"
                      })  

                      wx.hideLoading({
                        success(res){
                          const pages = getCurrentPages()
                          //声明一个pages使用getCurrentPages方法
                          const perpage = pages[pages.length - 1]
                          //声明一个当前页面
                          perpage.onLoad()  
                          //执行刷新
                        }
                      })
                  
                  
            

                    
                      }


                  }
                })

               
               
              },
            })


          

          
          }
        }

        if(that.data.jpgnumber==""){
          that.setData({
            isshow:'',
            tipsshow:"1"
          })
      

          wx.hideLoading({
            success(res){
              const pages = getCurrentPages()
              //声明一个pages使用getCurrentPages方法
              const perpage = pages[pages.length - 1]
              //声明一个当前页面
              perpage.onLoad()  
              //执行刷新
            }
          })
      


        }
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
            db.collection('comment').where({
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


          
        seejpg1: function (e) {

         

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
        

  answertext: function (event) {
    this.setData({
      
      answertext:event.detail,
  
    });
    console.log(this.data.answertext);
  },

  showPopupbottom(e) {
    let deleteid = e.currentTarget.dataset.id;
    let deletejpg = e.currentTarget.dataset.jpg;

    this.setData({ 
      showbottom: true, 
      deleteid:deleteid,
      deletejpg:deletejpg 
    })

  },

  showPopupbottom2(e) {
    let deleteid2 = e.currentTarget.dataset.id;
    let deleteopenid = e.currentTarget.dataset.openid;

   if(deleteopenid==this.data.id){
    this.setData({ 
      showbottom2: true, 
      deleteid2:deleteid2,
      deleteopenid:deleteopenid 
    })
  }
  },

  onClosebottom() {
    this.setData({ showbottom: false });
  },

  onClosebottom2() {
    this.setData({ showbottom2: false });
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(this.data.id)
   
    var temcomment=[]
    var ne2=[]
    var that=this
    var _this = this;
    //1、引用数据库
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称
      env: 'work-uoll7'
    })
    //2、开始查询数据了  news对应的是集合的名称
    db.collection('question').where({
      _id: wx.getStorageSync('commentid')
    }).get({
      //如果查询成功的话
      success: res => {
        console.log(res)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          ne: res.data[0]
       
        })
     
      }

    }),

    db.collection('comment').where({
      commentid: wx.getStorageSync('commentid')
    }).orderBy('time', 'desc').get({
      //如果查询成功的话
      success: res => {
           

        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
        this.setData({
          ne1: res.data,
          answernumber:res.data.length
        })

        console.log(that.data.ne1)
       

          db.collection('comment2').orderBy('time', 'desc').get({
             //如果查询成功的话
             success: function(res)  {
              for(var i=0;i<that.data.ne1.length;i++){
              console.log(that.data.ne1[i])
              var temne1=that.data.ne1
               for (var j = 0; j <res.data.length; j++){
                var char =that.data.ne1[i]._id
                var charArr = res.data[j]
                var index = charArr.id.indexOf(char)
                if (index<0){
                
                }else{
                  temne1[i].comment.push(res.data[j])
                  console.log(temne1)
                  that.setData({
                    ne1:temne1
                  })
                }
               }
              }
         
             }
            })
          
          
         
        
  
        
        
      }
      

    })

  
   
    
  },

   //点击我显示底部弹出框
   clickme: function () {

    if(wx.getStorageSync('uid')!=''){
    this.showModal();
    }

    if(wx.getStorageSync('uid')==''){
      wx.showToast({
        title: '请登录',
        icon:"none",
        duration: 2000
      })
      }

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


  
   //点击我显示底部弹出框
   clickme1: function (e) {


    
    if(wx.getStorageSync('uid')!=''){
      
    this.showModal1();

      
    let commentid1 = e.currentTarget.dataset.commentid1;
    console.log(commentid1)

    wx.setStorage({
      key:"commentid1",
      data:commentid1
    })

    
      }


      if(wx.getStorageSync('uid')==''){
        wx.showToast({
          title: '请登录',
          icon:"none",
          duration: 2000
        })
        }

  

  },

  //显示对话框
  showModal1: function () {
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
      showModalStatus1: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal1: function () {
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
        showModalStatus1: false
      })
    }.bind(this), 200)
  },


deleteimg:function(event){

var index= event.currentTarget.dataset.index


this.data.jpgarr.splice(index,1)

console.log(this.data.jpgarr)

this.setData({
  jpgarr:this.data.jpgarr,
  jpgnumber:this.data.jpgarr.length
})

},
  
remove2:function (e) {
  var that=this

  wx.showLoading({
    title: '正在删除',
  })


  db.collection('comment2').doc(that.data.deleteid2).remove({
    
    success: function(res) {
     
     
        that.setData({ showbottom2: false });
        wx.hideLoading()
        const pages = getCurrentPages()
        //声明一个pages使用getCurrentPages方法
        const perpage = pages[pages.length - 1]
        //声明一个当前页面
        perpage.onLoad()  
        //执行刷新
    

    }

  })
 
}, 

remove: function (e) {
  
  var that=this

   wx.showLoading({
     title: '正在删除',
   })

   if(that.data.deletejpg==[]){
   db.collection('comment').doc(that.data.deleteid).remove({
     
     success: function(res) {
      
      
         that.setData({ showbottom: false });
         wx.hideLoading()
         const pages = getCurrentPages()
         //声明一个pages使用getCurrentPages方法
         const perpage = pages[pages.length - 1]
         //声明一个当前页面
         perpage.onLoad()  
         //执行刷新
     
       
     
   

     }

   })
  }

  if(that.data.deletejpg!=[]){
    db.collection('comment').doc(that.data.deleteid).remove({
      
      success: function(res) {
       
        wx.cloud.deleteFile({
  
          fileList: that.data.deletejpg
        
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