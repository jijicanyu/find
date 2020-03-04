const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    editComplain1:false,
    editComplain1Value:'',

    editComplain2:false,
    editComplain2Value:'',

    editComplain3:false,
    editComplain3Value:'',

    editComplain4:false,
    editComplain4Value:'',

    editComplain5:false,
    editComplain5Value:'',
  },
  onLoad: function () { },
  editComplain1:function(){
    const that = this;
    that.setData({
      editComplain1:!that.data.editComplain1
    })
  },
  editComplain1Change:function(e){
    console.log(e)
    const that = this;
    that.setData({
      editComplain1Value:e.currentTarget.dataset.name
    })
  },
  editComplain2:function(){
    const that = this;
    that.setData({
      editComplain2:!that.data.editComplain2
    })
  },
  editComplain2Change:function(e){
    console.log(e)
    const that = this;
    that.setData({
      editComplain2Value:e.currentTarget.dataset.name
    })
  },
  editComplain3:function(){
    const that = this;
    that.setData({
      editComplain3:!that.data.editComplain3
    })
  },
  editComplain3Change:function(e){
    console.log(e)
    const that = this;
    that.setData({
      editComplain3Value:e.currentTarget.dataset.name
    })
  },
  editComplain4:function(){
    const that = this;
    that.setData({
      editComplain4:!that.data.editComplain4
    })
  },
  editComplain4Change:function(e){
    console.log(e)
    const that = this;
    that.setData({
      editComplain4Value:e.currentTarget.dataset.name
    })
  },
  editComplain5:function(){
    const that = this;
    that.setData({
      editComplain5:!that.data.editComplain5
    })
  },
  editComplain5Change:function(e){
    console.log(e)
    const that = this;
    that.setData({
      editComplain5Value:e.currentTarget.dataset.name
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
