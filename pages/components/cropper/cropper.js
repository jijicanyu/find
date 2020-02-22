// const util = require('../../utils/util.js')
var upload = require("../../../utils/upload.js");
//获取应用实例
const app = getApp()
Page({
  data: {
    src:'',
    width: 250,//宽度
    height: 300,//高度
    max_width: 400,
    max_height: 400,
    disable_rotate:true,//是否禁用旋转
    disable_ratio: true,//锁定比例
    limit_move: true,//是否限制移动
    type:'',
    id:'',
    from:''
  },
  onLoad: function (options) {
    console.log(options)
    const that = this;
    that.setData({
      type: options.type,
      id: options.id,
      from:options.from,
    })
    this.cropper = this.selectComponent("#image-cropper");
    this.cropper.upload(options.from);//上传图片
  },
  cropperload(e) {
    console.log('cropper加载完成');
  },
  loadimage(e){
    wx.hideLoading();
    console.log('图片');
    this.cropper.imgReset();
  },
  clickcut(e) {
    console.log(e.detail);
    //图片预览
    wx.previewImage({
      current: e.detail.url, // 当前显示图片的http链接
      urls: [e.detail.url] // 需要预览的图片http链接列表
    })
  },
  upload(){
    let that = this;
    that.chooseImageTap();
    // wx.chooseImage({
    //   count: 1,
    //   sizeType: ['original', 'compressed'],
    //   sourceType: ['album', 'camera'],
    //   success(res) {
    //     console.log(res)
    //     const tempFilePaths = res.tempFilePaths[0];
    //     //重置图片角度、缩放、位置
    //     that.cropper.imgReset();
    //     that.setData({
    //       src: tempFilePaths
    //     });
    //   }
    // })
  },
  //添加上传图片
  chooseImageTap: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#00000",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })
  },
  // 图片本地路径
chooseWxImage: function (type) {
  var that = this;
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function (res) {
      console.log(res)
      const tempFilePaths = res.tempFilePaths[0];
      //重置图片角度、缩放、位置
      that.cropper.imgReset();
      that.setData({
        src: tempFilePaths
      });
    }
  }) 
},
  setWidth(e){
    this.setData({
      width: e.detail.value < 10 ? 10 : e.detail.value
    });
    this.setData({
      cut_left: this.cropper.data.cut_left
    });
  },
  setHeight(e){
    this.setData({
      height: e.detail.value < 10 ? 10 : e.detail.value
    });
    this.setData({
      cut_top: this.cropper.data.cut_top
    });
  },
  switchChangeDisableRatio(e){
    //设置宽度之后使剪裁框居中
    this.setData({
      disable_ratio: e.detail.value
    });
  },
  setCutTop(e) {
    this.setData({
      cut_top: e.detail.value
    });
    this.setData({
      cut_top: this.cropper.data.cut_top
    });
  },
  setCutLeft(e) {
    this.setData({
      cut_left: e.detail.value
    });
    this.setData({
      cut_left: this.cropper.data.cut_left
    });
  },
  switchChangeDisableRotate(e) {
    //开启旋转的同时不限制移动
    if (!e.detail.value){
      this.setData({
        limit_move: false,
        disable_rotate: e.detail.value
      });
    }else{
      this.setData({
        disable_rotate: e.detail.value
      });
    }
  },
  switchChangeLimitMove(e) {
    //限制移动的同时锁定旋转
    if (e.detail.value){
      this.setData({
        disable_rotate: true
      });
    }
    this.cropper.setLimitMove(e.detail.value);
  },
  switchChangeDisableWidth(e) {
    this.setData({
      disable_width: e.detail.value
    });
  },
  switchChangeDisableHeight(e) {
    this.setData({
      disable_height: e.detail.value
    });
  },
  submit(){
    this.cropper.getImg((obj)=>{
      console.log(obj)
      const that = this;
      that.uploadImg(obj);
    });
  },
  uploadImg(image){
    const that = this;
    const type = that.data.type;
    const id = that.data.id;

    //---------//
    // let data = {
    //   id: id,
    //   userId:1223,
    //   image:image.url,
    // }
    // let avatorList = wx.getStorageSync("imageUrlArr");
    // for (let i = 0; i < avatorList.length; i++) {
    //   if(avatorList[i].id === data.id){
    //     avatorList.splice(i,1);
    //   }
    // }
    // avatorList.push(data);
    // avatorList.sort(that.compare("id",true))
    // wx.setStorageSync("imageUrlArr",avatorList);
    // wx.navigateBack({
    //   delta: -1
    // })
    // return;
    //---------------//


    const imageType = type === 'mainImage'?'PORTRAIT':'OTHER'
    const formData = {
      id: id,
      userId:1223,
      imageType:'PORTRAIT',
    };
    let avatorList = wx.getStorageSync("imageUrlArr");
    upload.uploadfile(image.url, formData, type, function (imageUrl) {
      // wx.hideLoading();
      // app.globalData.imgCropperSrc = imageUrl;
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
      // const wxCurrPage = getCurrentPages(); // 获取当前页面的页面栈
      // const wxPrevPage = wxCurrPage[wxCurrPage.length - 2]; // 获取上级页面的page对象
      // if (wxPrevPage) {
      //   // 修改上级页面的数据
      //   wxPrevPage.setData({
      //     avatorList: imageUrlArr, // baseData为上级页面的某个数据
      //   })
      // }
      // wx.navigateBack();
      // wx.setStorageSync("imageUrlArr",imageUrlArr);
      wx.navigateBack({
        delta: -1
      })
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
  rotate(){
    //在用户旋转的基础上旋转90°
    this.cropper.setAngle(this.cropper.data.angle+=90);
  },
  top(){
    this.data.top = setInterval(() => {
      this.cropper.setTransform({
        y: -3
      });
    }, 1000 / 60)
  },
  bottom(){
    this.data.bottom = setInterval(() => {
      this.cropper.setTransform({
        y: 3
      });
    }, 1000 / 60)
  },
  left(){
    this.data.left = setInterval(() => {
      this.cropper.setTransform({
        x: -3
      });
    }, 1000 / 60)
  },
  right(){
    this.data.right = setInterval(() => {
      this.cropper.setTransform({
        x: 3
      });
    }, 1000 / 60)
  },
  narrow() {
    this.data.narrow = setInterval(() => {
      this.cropper.setTransform({
        scale: -0.02
      });
    }, 1000 / 60)
  },
  enlarge() {
    this.data.enlarge = setInterval(() => {
      this.cropper.setTransform({
        scale: 0.02
      });
    }, 1000 / 60)
  },
  end(e) {
    clearInterval(this.data[e.currentTarget.dataset.type]);
  },
})
