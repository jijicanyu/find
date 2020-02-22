const app = getApp();
Page({
  data: { },
  goAuthorize: function () { 
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.showToast({
            title: '您已授权',
            icon: 'none',
            duration: 1000
          })
        } else {
          console.log("未授权")
          that.openConfirm()
        }
      }
    })
  },
  //再次获取授权
  //当用户第一次拒绝后再次请求授权
  openConfirm: function () {
    wx.showModal({
      content: '是否前去授权此小程序的获取您的微信头像信息？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        //点击“确认”时打开设置页面
        if (res.confirm) {
          console.log('用户点击确认')
          wx.openSetting({
            success: (res) => {console.log(res) }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    });
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  
});
