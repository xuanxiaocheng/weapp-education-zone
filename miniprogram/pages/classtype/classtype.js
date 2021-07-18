// pages/classtype/classtype.js
var app = getApp();
var serverUrl=app.globalData.serverUrl

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    coursemessage:[],
    type:[{title:'计算机',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E8%AE%A1%E7%AE%97%E6%9C%BA.png?sign=340ce9d964950eb6a2cabcc781d3a504&t=1612775117'},
  {title:'人文',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E4%BA%BA%E6%96%87.png?sign=b2fdfd887f3fcbdd7a392fbf164936ff&t=1612775292'},
{title:'法学',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E6%B3%95%E5%AD%A6.png?sign=2f1189e553dfd7820d6a0746ba9ad85b&t=1612775334'},
{title:'艺术',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E8%89%BA%E6%9C%AF.png?sign=cdb0fb845c0e98d9b960a1c4527e179d&t=1612775374'},
{title:'理工',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E7%90%86%E5%B7%A5.png?sign=281cf0113d0fbf23bb3cea5751f52e93&t=1612775405'},
{title:'农林',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E5%86%9C%E6%9E%97.png?sign=9c61e4a507fea4b3d3d83faffc73eee3&t=1612775458'},
{title:'管理',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E7%AE%A1%E7%90%86.png?sign=fcc851d286f2f3a25ee9c712ea23d19e&t=1612775491'},
{title:'动物科学',url:'https://776f-work-uoll7-1300843182.tcb.qcloud.la/%E6%95%99%E5%8A%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E7%A7%91%E7%9B%AE%E5%88%86%E7%B1%BB/%E5%8A%A8%E7%89%A9%E7%A7%91%E5%AD%A6.png?sign=cb974575ab37be480441907edb7e8e82&t=1612775520'}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {



    wx.request({
      url: serverUrl+'/course/1350443797946204162',
      success: (res) => {
        console.log(res.data.data.courseInfo)
      
        this.setData({
          coursemessage: res.data.data.courseInfo,
        })
  
       
      },
    })
  

  },

  subject: function (e) {
    var id=e.currentTarget.dataset.id
    console.log(id)

    if(wx.getStorageSync('uid')!=''){
      
    wx.setStorageSync('temcourseid',id)
    
    wx.navigateTo({
      url: '/pages/subject/subject',
    })
    }

    
    if(wx.getStorageSync('uid')==''){
      
      wx.showToast({
        title: '请登录,解锁更多',
        icon: 'none',
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
   var that=this
    this.setData({

      id:wx.getStorageSync('courseid')
      })
    
      console.log(this.data.type[this.data.id].title)


      wx.request({
        url: serverUrl+'/course/searchTypeCourse', //仅为示例，并非真实的接口地址
        method:'POST',
        data: {
          searchContent:this.data.type[this.data.id].title
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success (res) {
          console.log(res)
          that.setData({
            course:res.data.data.list
          })
          console.log(that.data.course)
        }
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