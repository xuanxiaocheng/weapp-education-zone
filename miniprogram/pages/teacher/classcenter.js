// pages/class/class.js
// pages/classtype/classtype.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommendlist:[],
    searching:false,
    swiperList2: [{
      id: 0, type: 'image', url: 'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E8%B5%84%E6%96%99%E5%88%86%E4%BA%AB/%E7%AB%96%E7%89%88%E2%80%94588ku%E8%8B%B1%E8%AF%AD%E5%9B%9B%E5%85%AD%E7%BA%A7banner.png?sign=decf4f91f283e4f37a62eff942f0e6ab&t=1607347121',
      title:"四六级专项辅导",teacher:"Mr.Li"
    },
    {
      id: 1, type: 'image', url: 'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E8%B5%84%E6%96%99%E5%88%86%E4%BA%AB/%E7%AB%96%E7%89%88%E2%80%94588ku%E8%8B%B1%E8%AF%AD%E5%9B%9B%E5%85%AD%E7%BA%A7banner.png?sign=decf4f91f283e4f37a62eff942f0e6ab&t=1607347121',
      title:"四六级专项辅导",teacher:"Mr.Li"
    },
    {
      id: 2, type: 'image', url: 'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E8%B5%84%E6%96%99%E5%88%86%E4%BA%AB/%E7%AB%96%E7%89%88%E2%80%94588ku%E8%8B%B1%E8%AF%AD%E5%9B%9B%E5%85%AD%E7%BA%A7banner.png?sign=decf4f91f283e4f37a62eff942f0e6ab&t=1607347121',
      title:"四六级专项辅导",teacher:"Mr.Li"
    },
  ]
  },

  inputing:function(event){

  console.log(event.detail.value)
  this.setData({
    searchinput:event.detail.value
  })

  if(event.detail.value==''){
    this.setData({
      searching:false
    })
  }

  if(event.detail.value!=''){
    
    var that=this
    wx.request({
      url: serverUrl+'/course/searchCourse', //仅为示例，并非真实的接口地址
      method:'POST',
      data: {
        searchContent:this.data.searchinput
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success (res) {
        console.log(res)
        that.setData({
          searching:true,
          searchtext:res.data.data.list
        })
        
      }
    })
  

  }

  },

  inputing2:function(event){

  
    this.setData({
      searchinput:'',
      searching:false
    })
  
    },

  subject: function (e) {
   
    wx.setStorageSync('active', 0)
    var id=e.currentTarget.dataset.id
    console.log(id)

    if(wx.getStorageSync('uid')!=''){
      
    wx.setStorageSync('temcourseid',id)
    
    wx.navigateTo({
      url: '/pages/teacher/subject',
    })
    }

    
    if(wx.getStorageSync('uid')==''){
      
      wx.showToast({
        title: '请登录',
        icon: 'none',
      })
  
    }
  },

  search:function(){

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that=this
    db.collection('recommend').get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data)
        that.setData({
          recommend:res.data
        })

        for(let i=0;i<that.data.recommend.length;i++){
          wx.request({
            url: serverUrl+'/course/'+that.data.recommend[i].courseId, //仅为示例，并非真实的接口地址
            method:'GET',
            success (res) {
              that.data.recommendlist.push(res.data.data.courseInfo)
              that.setData({
                recommendlist:that.data.recommendlist
              })
            }
          })
        
      
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

  classtype: function (event) {

    var id = event.currentTarget.dataset.id
    wx.setStorageSync('courseid', id) 

    wx.navigateTo({
      url: '/pages/teacher/classtype',
    })
  },

})