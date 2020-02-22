
const app = getApp();
Page({
  data: {
    tagList: ['旅游','电影','唱歌','阅读','健身','摄影','猫咪','军事','代码','游戏','动漫','德扑','听歌','瑜伽','英文歌'],
  },
  onLoad: function () { },
  goEdit(){
  	wx.navigateTo({
      url: '../userInfo/userInfo'
    })	
  }
});
