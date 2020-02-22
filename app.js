var rts = require("/utils/rts.js");
//app.js
App({
  //全局变量
  globalData: {
    apiUrl: "http://106.75.232.173:8089/redcord/", 
    uploadUrl: "http://106.75.232.173:8089/redcord/",       // 图片上传地址
    wxappId: "wxdf8ac6f53cd51e7d",                //小程序id
    user: {
      sex:''
    },                                     //用户信息
    isServer:0,                                   //服务是否正常 0正常 1服务异常 2UAA异常
    session: null,                                //鉴权域key(一次获取，减少解密请求)
    imgCropperSrc:'',                              //头像裁剪
  },
  onLaunch: function () {
    var that = this;
    const session = wx.getStorageSync("session");
    const isServer = wx.getStorageSync("isServer");
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          if(session !== null && isServer !== 1){
            // wx.switchTab({
            //   url: '/pages/home/index'
            // })
            // that.checkSession((data)=>{
            //   console.log('data:',data)
            //   that.goHome();
            // });
             wx.navigateTo({
              url: '/pages/home/filter/index',
            })
          }
        } else {
          console.log("未授权")
          that.openConfirm()
        }
      }
    })
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        console.log(capsule)
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function () {
    
  },
  //再次获取授权
  //当用户第一次拒绝后再次请求授权
  openConfirm: function () {
    wx.showModal({
      content: '检测到您没打开此小程序的授权请求，是否去设置打开？',
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
  goHome() {
    wx.switchTab({
      url: '/pages/home/index'
    })
  },

  //更新session域
  // upSession: function (session) {
  //   var that = this;
  //   if (session != null && session.openId != null && session.token != null) {
  //     wx.setStorageSync('session', session);
  //     that.globalData.session = wx.getStorageSync("session");
  //   }
  // },
  //用户在线状况
  // isOnline: function (cb) {
  //   var that = this;
  //   if (that.globalData.session == null || that.globalData.isServer == 1) {
  //     console.log(44)
  //     // rts.initLogin(that.globalData, function () { //登录授权信息
  //     //   that.globalData.session = wx.getStorageSync("session");
  //     // }, function () {
  //     //   that.globalData.isServer = wx.getStorageSync('isServer');
  //     //   that.globalData.user = wx.getStorageSync("user");
  //     //   if (that.globalData.session == null || that.globalData.isServer ==1) {
  //     //     rts.initLogin(that.globalData, function () { //2次容错
  //     //       that.globalData.session = wx.getStorageSync("session");
  //     //     }, function () { if (typeof cb == "function") { cb(); } });
  //     //   } else { if (typeof cb == "function") { cb(); } }
  //     // });
  //   } else {
      
  //   }
  // },

  checkSession:function(cb){
    const that = this;
    wx.checkSession({  //session登录态检测
      success: function (success) {
        console.log('success:',success)
        cb('success')
      }, fail: function (err) {  //session失效重连
        console.log('err:',err)
        rts.initLogin(that.globalData, function () { //登录授权信息
          that.globalData.session = wx.getStorageSync("session");
        }, function () {
          that.globalData.isServer = wx.getStorageSync('isServer');
          that.globalData.user = wx.getStorageSync("user");
          if (that.globalData.session == null || that.globalData.isServer == 1) {
            rts.initLogin(that.globalData, function () { //2次容错
              that.globalData.session = wx.getStorageSync("session");
            }, function () { if (typeof cb == "function") { cb(); } });
          } else { if (typeof cb == "function") { cb(); } }
        });
      }, complete: function () {
        that.globalData.user = wx.getStorageSync("user");
        that.globalData.session = wx.getStorageSync("session");
        that.globalData.isServer = wx.getStorageSync('isServer');
      }
    })
  },

  onShow: function () {
    //console.log('App Show')
  },
  onHide: function () {
    //console.log('App Hide')
  }
});

