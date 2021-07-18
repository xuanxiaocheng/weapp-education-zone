// miniprogram/pages/teacher/mynote.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
var serverUrl3=app.globalData.serverUrl3
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  name:[],
  dest:[],
  isnull:false,
  isloading:true
  },


  showPopupbottom(e) {
    let id = e.currentTarget.dataset.id;
    console.log(id)
    this.setData({ 
      showbottom: true, 
      temid:id
    });
   
  },

  onClosebottom() {
    this.setData({ showbottom: false });
  },


  delete(){
    var that=this
    wx.request({
      url: serverUrl+'/teacherannounce/'+that.data.temid,
      method:'DELETE',
      success: (res) => {
        that.dealnote()
        
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
   this.dealnote()
  },

  dealnote(){
    var that=this
    wx.request({
      url: serverUrl+'/teacherannounce/'+wx.getStorageSync('uid')+'/1/1000',
      success: (res) => {
      console.log(res)
      if(res.data.data.total!=0){

  let promise = new Promise( function ( resolve, reject ) {
      for (var j = 0; j <res.data.data.rows.length; j++){
  
        var char = res.data.data.rows[j].courseName
        var charArr = that.data.name
        var index = charArr.indexOf(char)
        if (index <0){
          that.data.name.push(char)
          that.data.dest.push({
            name:char,
            data:[res.data.data.rows[j]]
          })
          console.log('数组里面没有这个元素')
          that.setData({
            name:that.data.name,
            dest:that.data.dest
          })
          console.log(that.data.dest)
        }else{
          console.log('数组里面有这个元素')
          console.log(index)
          that.data.dest[index].data.push(res.data.data.rows[j])
          that.setData({
            name:that.data.name,
            dest:that.data.dest
          })
          console.log(that.data.dest)

          
      }

      resolve();

       }
      })

      promise.then( function () {
      
      that.setData({
        isloading:false
      })

      })

      }

      if(res.data.data.total==0){
        that.setData({
          dest:[],
          isnull:true,
          isloading:false
        })
      }
      },
    })
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
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