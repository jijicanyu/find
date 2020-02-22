var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    avatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    const that = this;
    console.log(that)
    const user = wx.getStorageSync("user");
    const avatarUrl = user.userInfo.avatarUrl;
    that.setData({
      avatarUrl: avatarUrl
    })
  },
  toUserDetail(){
    wx.navigateTo({
      url: './detail/index'
    })
  },

  toFocusList(){
    wx.switchTab({
      url: '../message/index'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
  
})