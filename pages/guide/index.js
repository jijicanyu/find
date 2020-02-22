//index.js
var app = getApp()
var rts = require("../../utils/rts.js");

Page({
  data:{
    checked:false
  },
  onLaunch: function () {
    console.log(app)
  },
  getUserInfo: function(e) {
    const that = this;
    //初始化用户登录信息，并容错尝试
    rts.initLogin(app.globalData,function (res) {
      console.log(res);
      //同步更新本地登录状态数据，并缓存
      wx.switchTab({
        url: '../home/index',
      })
    });
  },
  onCheck:function(e){
    console.log(e)
    const that = this;
     that.setData({
      checked:!that.data.checked
    })
  },
  goPrivate(){
    wx.navigateTo({
      url: '../components/private/index',
    })
  },
  goAggrement(){
    wx.navigateTo({
      url: '../components/agreement/index',
    })
  },
  // 打开权限设置页提示框
  showSettingToast: function(e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
})