var app = getApp()
var rts = require("../../utils/rts.js");
var formatTime = require("../../utils/util.js");
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    list: [
      {
        id:'1',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575091526741&di=a0dfebcef265676e6367d241055c3ce8&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-21%2F5a13811b89d42.jpg'
      },
      {
        id:'2',
        image:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2577692201,3232437109&fm=26&gp=0.jpg'
      },
      {
        id:'3',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576746098&di=73565a8f187ea6f3d75f70e7ab0c0bea&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.downza.xzstatic.com%2Fsoft%2Fzmgj-21%2F2016-08-17%2Fe7ecbf946982939151f2e763b278e8e4.png'
      },
      {
        id:'4',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576746126&di=8c9e5e690afe4ebef45d5ebe4f490f6e&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201304%2F08%2F20130408101930_S2CGH.jpeg'
      },
    ], 
    animation:'',
    modalName:false,
    modalShow:'true',
    swiperList: [{
      id: 0,
      title: '心动的TA, 关注一下',
      description:'每日21点整推荐5位适合你的 新朋友，快去认识TA们吧！',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      title: '互相答题, 加深了解',
      description:'遇到心动的人，点击照片任意位置，进入TA的主页回答TA的问题后，即可申请交换微信哦~',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      title: '真诚社交,精选推荐',
      description:'每日21点整推荐5位适合你的 新朋友，快去认识TA们吧！',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }],
    filterData:{},
    from:''
  },

  // 生命周期函数--监听页面加载
  onLoad: function (options) {  
    console.log(app)
  },
  onShow:function(){
    const that = this;
    const pages = getCurrentPages();
    const currPage = pages[pages.length - 1];
    const modalName = wx.getStorageSync("modalShow");
    if(modalName === ''){
      that.setData({
        modalName: true,
      })
    }
    if(that.data.from === 'filter'){
      const data = {
        openId:'1234',
        ...JSON.parse(currPage.data.filterData)
      }
      that.loadData(data)
      return;
    }
    const data = {
      openId:'1234'
    }
    that.loadData(data);
  },
  hideModal(){
    this.setData({
      modalName: false
    },()=>{
      wx.setStorageSync('modalShow', 'false');
    })
  },
  toDetail(e){
    wx.navigateTo({
      url: '../user/detail/index'
    })
  },
  // 心动关注
  favor(e){
    console.log(e);
    console.log(app);
    const that = this;
    const item = e.currentTarget.dataset.item;
    that.toggle(item);
    const data = {
      id:item.id
    }    
    rts.rtPostJson(app.globalData.apiUrl + 'favor',data, function (success) { //登录授权信息
      console.log(success)
    }, function (err) {
      console.log(err)
    });
  },
  // 不感兴趣
  pass(e){
    const item = e.currentTarget.dataset.item;
    const that = this;
    that.toggle(item);
  },
  toggle(item) {
    var that = this;
    that.setData({
      animation: 'slide-lefts'
    })
    if(that.data.list.length >= 1){
      for (let i = 0; i < that.data.list.length; i++) {
        if(that.data.list[i].id === item.id){
          that.data.list.splice(i,1);
        }
      }
    }
    setTimeout(function() {
      that.setData({
        animation: '',
        list:that.data.list
      })
    }, 700)
  },
  recommend(){
    wx.navigateTo({
      url: 'recommend/index'
    })
  },
  joinFind(){
    wx.navigateTo({
      url: 'qrcode/index'
    })
  },
  showFilter(e) {
    console.log(e)
    this.setData({
      from: 'filter'
    },()=>{
      wx.navigateTo({
        url: './filter/index?from=list',
      })
    })    
  },
  loadData(data) {
    var that = this;
    that.setData({
      loading: true,
    })
    rts.rtPostJson(app.globalData.apiUrl + 'people/list', data, function (res) {
      console.log(res)
    }, function (err) {
      console.log(err)
    })
  },
});
