const app = getApp();
var rts = require("../../../utils/rts.js");
var upload = require("../../../utils/upload.js");
Page({
  data: {
    avatorList: [
      {
        id:'1',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575091526741&di=a0dfebcef265676e6367d241055c3ce8&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-21%2F5a13811b89d42.jpg'
      },
      {
        id:'2',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575456779989&di=38372adf83a57820eef3e4ff36044ddf&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F1c950a7b02087bf47316cb8ff3d3572c10dfcfda.jpg'
      },
      {
        id:'3',
        image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575456779989&di=38372adf83a57820eef3e4ff36044ddf&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F9vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F1c950a7b02087bf47316cb8ff3d3572c10dfcfda.jpg'
      },
      {
        id:'4',
        image:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1900841044,2531099183&fm=26&gp=0.jpg'
      },
      {
        id:'5',
        image:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1900841044,2531099183&fm=26&gp=0.jpg'
      },
      {
        id:'6',
        image:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1900841044,2531099183&fm=26&gp=0.jpg'
      },
    ],    // 全部照片列表
    avatorUrl: '', // 头像大图
    avatorRightUrlArr:[], // 页面右边显示头像
    avatorBottomUrlArr:[],// 页面底部显示头像
    nickName:'', // 用户昵称
    sex:1, // 性别
    birthday: '2018-12-25', // 我的生日
    region: ['上海市', '上海市', '浦东新区'], // 所在城市
    address:'', //我的家乡
    heightIndex: 5, // 身高
    heights: ['155','156','157','158','159','160','161','162','163','164','165','166','167','168','169','170','171',
    '182','183','184','185','186','187','188','189','190'],
    school:'', //我的学校
    education:'', //我的学历
    educationIndex:0,
    // educations: ['博士', '硕士', '本科','专科'],
    educations: [
      { id: 1, name: '博士' },
      { id: 2, name: '硕士' },
      { id: 3, name: '本科' },
      { id: 4, name: '专科' },
    ],
    company:'', //我的就职公司或行业
    occupation:'', // 我的职业
    wechatNumber:'', // 我的微信号
    description:'', // 自我描述
    forward:'', // 期待认识这样
    hobby:'', // 我的日常和爱好
    wish:'', //我的心愿和理想的生活  
    hobbyTags:[],
    evaluationTags:[],
    otherTags:[],
    params:'', // 跳转标签传参数
    hobbys:[],  // 页面显示标签
    evaluations:[],  // 页面显示标签
    others:[],  // 页面显示标签
  },
  /**生命周期函数--监听页面加载*/
  onLoad: function (option) { 
    console.log(option)
    const that = this;
    that.userInfo();
  },
  /**生命周期函数--监听页面显示*/
  onShow: function () {
    var that = this;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    console.log(that.data.params)
    if(that.data.params === 'hobby'){
      that.setData({
        hobbys: currPage.data.hobbyTags.length > 3?currPage.data.hobbyTags.slice(0,3):currPage.data.hobbyTags,
        hobbyTags: currPage.data.hobbyTags,
      })
    }
    if(that.data.params === 'evaluation'){
      that.setData({
        evaluations: currPage.data.evaluationTags.length > 3?currPage.data.evaluationTags.slice(0,3):currPage.data.evaluationTags,
        evaluationTags: currPage.data.evaluationTags
      })
    }
    if(that.data.params === 'other'){
      that.setData({
        others: currPage.data.otherTags.length > 3?currPage.data.otherTags.slice(0,3):currPage.data.otherTags,
        otherTags: currPage.data.otherTags,
      })
    }
    if(that.data.params === 'upload'){
      const avatorList = wx.getStorageSync("imageUrlArr");
      console.log(avatorList)
      that.setData({
        avatorList:avatorList,
        avatorUrl: avatorList[0].image,
      })
      if( 1 < avatorList.length <= 3){
        that.setData({
          avatorRightUrlArr: avatorList.slice(1),
        })
      }
      if( 3 < that.data.avatorList.length){
        that.setData({
          avatorBottomUrlArr: avatorList.slice(3),
        })
      }
    }
  },
  // 请求用户信息接口
  userInfo: function () {
    const that = this;
    const userId = '123'
    console.log('userInfo')
    rts.rtGet(app.globalData.apiUrl + 'user/getByUserId/' + userId, function (res){
      console.log(res)
      let avators = [
        {
          imgIndex: '1',
          userId:1223,
          image:res.data.mainFigure,
        },
        ...res.data.otherFigures
      ]
      that.setData({
        avatorUrl: avators[0].image,
        avatorList: avators
      })
      if( 1 < avators.length <= 3){
        that.setData({
          avatorRightUrlArr: avators.slice(1),
        })
      }
      if( 3 < avators.length){
        that.setData({
          avatorBottomUrlArr: avators.slice(3),
        })
      }
    }, function (err) {
      console.log(err)
    })
  },
  // 提交个人信息
  submitInfo: function (e) {
    var that = this;
    // if (app.globalData.session==null||app.globalData.session.unionId==null){
    //   wx.showToast({ title: '数据错误', icon: 'loading', duration: 1000 });
    //   return;
    // }
    if (that.data.nickName) {
      var data = {
        // openId: app.globalData.session.openId,
        appId: app.globalData.wxappId,
        // unionId: app.globalData.session.unionId,
        nickName: that.data.nickName,
        avatorList: that.data.avatorList,
        sex:that.data.sex, 
        birthday:that.data.birthday,
        region: that.data.region,
        address:that.data.address,
        height: that.data.height,
        school:that.data.school,
        education:that.data.education,
        company:that.data.company,
        occupation:that.data.occupation,
        wechatNumber:that.data.wechatNumber,
        description:that.data.description,
        forward:that.data.forward,
        Hobby:that.data.Hobby,
        wish:that.data.wish, 
      }
      console.log(data)
      rts.rtPostAll(app.globalData.apiUrl + 'wx/wxapp-uaa', data, function (res) {
        console.log(res)
      })
    } else {
      wx.showToast({
        title: '请填写完整',
        icon: 'none',
        duration: 2000
      })
    }
  },
   //添加上传图片
  chooseImageTap: function (type,id) {
    const that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            if(type === 'mainImage'){
              wx.navigateTo({
                url: '../../components/cropper/cropper?from=album&type=' + type + '&id=' + id
              })
              return;
            }
            that.uploadImage('album', id)
          } else if (res.tapIndex == 1) {
            if(type === 'mainImage'){
              wx.navigateTo({
                url: '../../components/cropper/cropper?from=camera&type=' + type + '&id=' + id
              })
              return;
            }
            that.uploadImage('camera', id)
          }
        }
      }
    })
  },
  // 上传图片
  uploadAvator(e) {
    const that = this;
    wx.setStorageSync("imageUrlArr",that.data.avatorList);
    const type = e.currentTarget.dataset.type;
    const id = e.currentTarget.dataset.id;
    this.setData({
      params:'upload'
    },() => {
      that.chooseImageTap(type,id);
    })
    return;
    // var that = this;
    // wx.chooseImage({
    //   count: 1,
    //   sourceType: ['camera','album'],
    //   success: function (res) {
    //     console.log(res)
    //     for (var i = 0; i < res.tempFilePaths.length; i++) {
    //       var filePath = res.tempFilePaths[i];
    //       var formData = {
    //         'path': filePath,
    //         'type': "img"
    //       };
    //       upload.uploadfile(filePath, formData, function (imageUrl) {
    //         wx.hideLoading();
    //         that.setData({
    //           avatorUrl: imageUrl,
    //         })
    //         // var img = that.data.tempFilePaths;
    //         // if (imageUrl !== undefined && imageUrl !== null) {
    //         //   img.push(imageUrl);
    //         // }
    //         // that.setData({
    //         //   tempFilePaths: img,
    //         // })
    //       })
    //     }
    //   }
    // })
  },
  uploadImage(type,id) {
    const that = this;
    wx.chooseImage({
      count: 5,
      sourceType: type,
      success: function (res) {
        console.log(res)
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          var filePath = res.tempFilePaths[i];
          var formData = {
            id: id,
            userId:1223,
            imageType:'PORTRAIT',
          };
          let avatorList = wx.getStorageSync("imageUrlArr");
          upload.uploadfile(filePath, formData,'otherImage', function (imageUrl) {
            // wx.hideLoading();
            // that.setData({
            //   avatorUrl: imageUrl,
            // })
            let data = {
              id: id,
              userId:1223,
              image:imageUrl,
            }
            for (let i = 0; i < avatorList.length; i++) {
              if(avatorList[i].id === formData.id){
                avatorList.splice(i,1);
              }
            }
            avatorList.push(data);
            avatorList.sort(that.compare("id",true))
            wx.setStorageSync("imageUrlArr",avatorList);
          })
        }
      }
    })
  },
  compare(property,desc) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        if(desc==true){
            // 升序排列
            return value1 - value2;
        }else{
            // 降序排列
            return value2 - value1;
        }
    }
  },
   // 用于input值改变，
  // 传入形参，返回值
  getValue(e) {
    var that = this;
    var key = e.currentTarget.dataset.name;
    that.setData({
      [key]:e.detail.value,
    })
    console.log(that)
  },
  // 生日选择
  birthdayChange(e) {
    this.setData({
      birthday: e.detail.value
    })
  },
   // 所在城市
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  // 我的身高选择
  heightChange(e) {
    var that = this;
    var height = ''
    for (let i = 0; i < that.data.heights.length; i++) {
      if(i === Number(e.detail.value)){
        height = that.data.heights[i];
        this.setData({
          heightIndex: e.detail.value,
          height:height
        })
        return;
      }
    }
  },
  // 我的学历选择
  educationChange(e) {
    var that = this;
    var education = ''
    for (let i = 0; i < that.data.educations.length; i++) {
      if(i === Number(e.detail.value)){
        education = that.data.educations[i].name;
        this.setData({
          educationIndex: e.detail.value,
          education:education
        })
        return;
      }
    }
  },
  toTag(e){
    const that = this;
    const value = e.currentTarget.dataset.value;
    let userTags = []
    if(value === 'hobby'){
      userTags = [...that.data.hobbyTags];
    }
    if(value === 'evaluation'){
      userTags = [...that.data.evaluationTags];
    }
    if(value === 'other'){
      userTags = [...that.data.otherTags];
    }
    this.setData({
      params:value
    },()=>{
      wx.navigateTo({
        url: '../tag/tag?params=' + value + '&userTags=' + JSON.stringify(userTags),
      })
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
