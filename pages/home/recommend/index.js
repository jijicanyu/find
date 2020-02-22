const app = getApp();
Page({
  data: {
    list: [
      {
        id:'1',
        name:'张三',
        birthday:'1992',
        school:'同济大学',
        occupation:'音乐老师',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575091526741&di=a0dfebcef265676e6367d241055c3ce8&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-21%2F5a13811b89d42.jpg'
      },
      {
        id:'2',
        name:'李四',
        birthday:'1992',
        school:'同济大学',
        occupation:'音乐老师',
        image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2577692201,3232437109&fm=26&gp=0.jpg'
      },
      {
        id:'3',
        name:'王五',
        birthday:'1992',
        school:'同济大学',
        occupation:'音乐老师',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576746098&di=73565a8f187ea6f3d75f70e7ab0c0bea&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.downza.xzstatic.com%2Fsoft%2Fzmgj-21%2F2016-08-17%2Fe7ecbf946982939151f2e763b278e8e4.png'
      },
      {
        id:'4',
        name:'赵六',
        birthday:'1992',
        school:'同济大学',
        occupation:'音乐老师',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576746126&di=8c9e5e690afe4ebef45d5ebe4f490f6e&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201304%2F08%2F20130408101930_S2CGH.jpeg'
      },
    ], 
  },
  onLoad: function () { },
  toUserDetail(){
    wx.navigateTo({
      url: '../../user/detail/index'
    })
  },
});
