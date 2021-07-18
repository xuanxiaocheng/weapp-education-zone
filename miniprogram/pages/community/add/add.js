
const app = getApp();




// miniprogram/pages/question/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject:"",
    huatiicon:"",
    columns: ['理工', '农林', '人文'],
    tempFiles:[],
    ischoose:false,
    ischoose1:false,
    number :"",
    isshow: false,
    file:"",
    timeid:"",
    nickName:"",
    avatarUrl:"",
    interview:"",
    filename: "",
    file1:"",
    jpgarr:[],
    jpgnumber:"",
    jpgfilearr:[],
    filelength:"",
    filetem:[],
    filearr:[],
    filename:[],
    show: false,
    huati:[],
    actions4: [
     
      {
          name: '确认',
          color: '#ff9900'
      },
    
  ],
  
   
  },

  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    console.log(event.detail.value)    
    this.setData({ show: false });
    this.setData({ subject: event.detail.value });
    console.log(this.data.subject.value) 

    var _this = this;
   
    //1、引用数据库
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称
      env: 'work-uoll7'
    })

    db.collection('huati').where({
      id: event.detail.value
    }).get({
      //如果查询成功的话
      success: res => {
        this.setData({
          huatiicon: res.data[0].img
        })
        console.log(res.data[0].img)
      }
    })

  
  },

 
  handleOpen4 () {
    this.setData({
        visible4: true
    });
},

addfile () {
    this.setData({
        visible4: false
    });

    var that = this;
    wx.chooseMessageFile({
      type: 'file',
      count:3-that.data.filelength,
      success: function (res) {   //chooseImage方法调用成功
      
       
      
        that.setData({
          ischoose: true,
          filetem:that.data.filetem.concat(res.tempFiles),
         
        });

        that.setData({
          filelength:that.data.filetem.length
        });
        
        console.log(that.data.filelength);
        console.log(that.data.filetem);


        wx.showToast({
          title: '上传成功',
          icon: 'success',
        })
    
    
        

      },
      fail: function (res) {
        wx.showToast({
          title: '上传失败',
          icon: 'none',
        })
    
      }

    })

},


  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
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

    db.collection('huati').get({
      //如果查询成功的话
      success: res => {
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
           
          for (let i = 0; i < res.data.length; i++) {
            this.setData({
            huati:this.data.huati.concat(res.data[i].id)
          })
            console.log(this.data.huati)
          }
          
  
      }
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

  



  interview: function (event) {
    this.setData({
      
      interview:event.detail,
  
    });
    console.log(this.data.interview);
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
         

           
       
           wx.showToast({
            title: '上传成功',
            icon: 'success',
          })
      
      
           },
           fail: function (res) { 
            wx.showToast({
              title: '上传失败',
              icon: 'none',
            })
          },

          
  })

  },








//文字+照片
      update2: function () {
       
        var that=this

        var Y =  (new Date()).getFullYear().toString(); 
        var M = parseInt((new Date()).getMonth().toString())+1; 
    //日  
    var D =  (new Date()).getDate().toString(); 
    //时  
    var h = (new Date()).getHours().toString(); 
    //分  
    var m = (new Date()).getMinutes().toString(); 

    console.log("当前时间："+M+"-"+D+" "+h+":"+m);

    var realtime=(Y+" "+M+"-"+D+" "+h+":"+m)
        const db = wx.cloud.database()
          var timestamp = Date.parse(new Date());
          console.log("当前时间戳为：" + timestamp);
      

       

          this.setData({
            nickName: wx.getStorageSync('userInfo'),
            avatarUrl: wx.getStorageSync('userInfo'),
            isshow:'true'
          })

          wx.showLoading({
            title: '提交中...',
            mask:'true'
          })

          console.log(this.data.nickName)
      
          
          db.collection('question').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              time: timestamp,
              name:this.data.nickName.nickName,
              avatarUrl: this.data.avatarUrl.avatarUrl,
              interviwe:this.data.interview,
              realtime:realtime,
              jpgfilearr:[],
              length:that.data.jpgnumber,
              subject:this.data.subject,
              huatiicon:this.data.huatiicon
            },
            success: function(res) {
              console.log(res)
              that.setData({
              jpgarrid:res._id
              })

              
              console.log(that.data.jpgarrid)
              console.log(that.data.jpgarr)
              console.log(that.data.jpgnumber)
              
             
            if (that.data.jpgnumber!="") {
              console.log(that.data.jpgnumber)
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
      
                    
      
                      db.collection('question').doc(that.data.jpgarrid).update({
                        // data 传入需要局部更新的数据
                        data: {
                          jpgfilearr:that.data.jpgfilearr
                        },
                        success: function(res) {
                          console.log(res)
                
      
                          if (that.data.jpgfilearr.length==that.data.jpgnumber) {
                  
                            that.setData({
        
                              isshow:'false'
                            })
                        

                            wx.hideLoading()
              
                              wx.navigateBack({
                               delta: 1
                             })
      
                          
                            }
      
      
                        }
                      })
      
                     
                     
                    },
                  })
      
      
                
      
                
                }
            
            }

            if (that.data.jpgnumber=="") {
              that.setData({
        
                isshow:'false'
              })
          

              wx.hideLoading()

                wx.navigateBack({
                 delta: 1
               })

        
            
            }


            }
          })


       
  
    
          
            
            },






            deleteimg:function(event){

              var index= event.currentTarget.dataset.index
              
              
              this.data.jpgarr.splice(index,1)
              
              console.log(this.data.jpgarr)
              
              this.setData({
                jpgarr:this.data.jpgarr
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