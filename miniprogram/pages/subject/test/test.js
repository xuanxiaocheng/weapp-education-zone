// pages/subject/test/test.js
// pages/subject/subject.js
var app = getApp();
var serverUrl=app.globalData.serverUrl
const db = wx.cloud.database()


Page({

  /**
   * 页面的初始数据
   */
  data: {
  tofing:false,
  mychoose:'',
  righttext:'',
  noquestion:false,
  current:0,
  choose: [{num:1,Y:'/img/AY.png',N:'/img/AN.png',data:''},
  {num:2,Y:'/img/BY.png',N:'/img/BN.png',data:''},
  {num:3,Y:'/img/CY.png',N:'/img/CN.png',data:''},
  {num:4,Y:'/img/DY.png',N:'/img/DN.png',data:''}
  ],
  choosecheckList: [{num:1,Y:'/img/AY.png',N:'/img/AN.png',data:'对'},
  {num:2,Y:'/img/BY.png',N:'/img/BN.png',data:'错'}
  ],
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
    console.log(event.detail)
    this.setData({
      mychoose:event.detail
    })
    console.log(this.data.rightAnswer)
 
  },

  onChange2(event) {
   var index=event.currentTarget.dataset.index
   var xuanxiang
   switch(index) {
    case 0:
       var xuanxiang='A'
       break;
    case 1:
       var xuanxiang='B'
       break;
    case 2:
       var xuanxiang='C'
       break;
    case 3:
      var xuanxiang='D'
        break;   
} 

console.log(this.data.rightAnswer)
console.log(xuanxiang)

  
   if(this.data.choose[index].num==false){
    this.data.choose[index].num=index+1
    this.setData({
      mychoose:this.data.mychoose.replace(xuanxiang,'')
    })
    console.log(this.data.mychoose)
    console.log(this.data.mychoose.length)
   }
   else{
    this.data.choose[index].num=false
    console.log(this.data.choose)
    this.setData({
      mychoose:this.data.mychoose+xuanxiang
    })
    console.log(this.data.mychoose)
   }
 
   this.setData({
     choose:this.data.choose
   })


 },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this

    wx.request({
      url: serverUrl+'/exam/getExam/'+wx.getStorageSync('chaperid'),
      success: (res) => {
        console.log(res.data.data)
        that.setData({
          allList:res.data.data
        })

        if(res.data.data.checkList.length==0&&res.data.data.singleChoiceList.length==0&&res.data.data.mutileChoiceList.length==0){
          this.setData({
            noquestion:true
          })
        }

        if(!this.data.noquestion){
        if(res.data.data.checkList.length!=0){
        that.setData({
        
          List:res.data.data.checkList,
          type:'checkList',
          allnum:res.data.data.checkList.length+res.data.data.mutileChoiceList.length+res.data.data.singleChoiceList.length,
          num:res.data.data.checkList.length,
          now:1,
   
         
        
        })
        console.log(that.data)}

        if(res.data.data.checkList.length==0&&res.data.data.singleChoiceList.length!=0){
          that.setData({
          
            List:res.data.data.singleChoiceList,
            type:'singleChoiceList',
            allnum:res.data.data.checkList.length+res.data.data.mutileChoiceList.length+res.data.data.singleChoiceList.length,
            num:res.data.data.singleChoiceList.length,
            now:1,
           
          
          })
          console.log(that.data)}

          if(res.data.data.checkList.length==0&&res.data.data.singleChoiceList.length==0&&res.data.data.mutileChoiceList.length!=0){
            that.setData({
             
              List:res.data.data.mutileChoiceList,
              type:'mutileChoiceList',
              allnum:res.data.data.checkList.length+res.data.data.mutileChoiceList.length+res.data.data.singleChoiceList.length,
              num:res.data.data.mutileChoiceList.length,
              now:1
            
            })
            
          }

          
       that.data.choose[0].data=that.data.List[that.data.now-1].answer1
       that.data.choose[1].data=that.data.List[that.data.now-1].answer2
       that.data.choose[2].data=that.data.List[that.data.now-1].answer3
       that.data.choose[3].data=that.data.List[that.data.now-1].answer4
      console.log(that.data.choose)
      that.setData({
        choose:that.data.choose,
        rightAnswer:that.data.List[that.data.now-1].rightAnswer,
        aexplain:that.data.List[that.data.now-1].aexplain
      })
         
      }
  
      }
  
    
    })
  
  },

finish(){
wx.navigateBack({
  delta: 1,
})
},

tof(){

  var that=this


  this.setData({
    tofing:true,
  })


  switch(this.data.type) {
    
    case "checkList":case "singleChoiceList":
      if(this.data.mychoose==this.data.rightAnswer){
        this.setData({
          istrue:'true'
        })
        
      }else{
        this.setData({
          istrue:'false'
      })
    }
    console.log(this.data.rightAnswer)
    if(this.data.rightAnswer==1){
      this.setData({
        righttext:'A'
      })
    }
    if(this.data.rightAnswer==2){
      this.setData({
        righttext:'B'
      })
    }
    if(this.data.rightAnswer==3){
      this.setData({
        righttext:'C'
      })
    }
    if(this.data.rightAnswer==4){
      this.setData({
        righttext:'D'
      })
    }

    
       break;

    case 'mutileChoiceList':
      var right=this.data.rightAnswer.replace(/[^a-zA-Z]/g,'')
      var a=0
      console.log(right)
      this.setData({
        righttext:this.data.rightAnswer
      })

      if(right.length!=this.data.mychoose.length){
        this.setData({
          istrue:'false'
      })
      }


      if(right.length==this.data.mychoose.length){

      for (var j = 0; j <this.data.mychoose.length; j++){
        var char = this.data.mychoose[j]
        var charArr = right
        var index = charArr.indexOf(char)
        if (index <0){
          console.log('数组里面没有这个元素')
          this.setData({
            istrue:'false'
        })
          j=this.data.mychoose.length
        }else{
          console.log('数组里面有这个元素')
          a++
          console.log(a)
          if(a==right.length){
            this.setData({
              istrue:'true'
          })
          }
         

        }
       }
      }



       break;
   
} 

},





next(){
  var that=this



  this.setData({
    radio: '',
    tofing:false,
    righttext:''
  })
console.log(this.data.tofing)

if(this.data.type=='checkList'&&this.data.now==this.data.num){
  that.setData({
    List:that.data.List.concat(that.data.allList.singleChoiceList),
    type:'singleChoiceList',
    num:that.data.allList.singleChoiceList.length+that.data.allList.checkList.length,
  })
}

if(this.data.type=='singleChoiceList'&&this.data.now==this.data.num){
  that.setData({
    List:that.data.List.concat(that.data.allList.mutileChoiceList),
    type:'mutileChoiceList',
    num:that.data.allList.singleChoiceList.length+that.data.allList.checkList.length+that.data.allList.mutileChoiceList.length,
  })
}


this.setData({
  current:this.data.current+1,
  now:this.data.now+1,
  rightAnswer:that.data.List[this.data.now].rightAnswer,
  aexplain:that.data.List[this.data.now].aexplain
})

console.log(this.data.List)
console.log(this.data.current)


that.data.choose[0].data=that.data.List[that.data.now-1].answer1
that.data.choose[1].data=that.data.List[that.data.now-1].answer2
that.data.choose[2].data=that.data.List[that.data.now-1].answer3
that.data.choose[3].data=that.data.List[that.data.now-1].answer4

that.data.choose[0].num='1'
that.data.choose[1].num='2'
that.data.choose[2].num='3'
that.data.choose[3].num='4'
console.log(that.data.choose)
that.setData({
  choose:that.data.choose,
  mychoose:''
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