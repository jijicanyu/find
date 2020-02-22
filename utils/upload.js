var app = getApp()
/** 相册选择 */
/* @param _imgSuccess 成功回调 */
function gerImageAlbum(imgcount,imgSuccess) {
    var _imgSuccess = imgSuccess;
    wx.chooseImage({
        count: imgcount,
        sourceType: ['album'],
        success: function (res) {
            var fileArr = [];
            var formData = {
                'path': filePath,
                'type': "img"
            };
            for (var i = 0; i < res.tempFilePaths.length; i++) {
                var filePath = res.tempFilePaths[i];
                var formData = {
                    'path': filePath,
                    'type': "img"
                };
                uploadFile(filePath, formData, function (imageUrl) {
                    fileArr.push(imageUrl);
                })
            }
            _imgSuccess(fileArr);
        }
    })
}

/** 相机拍照 */
/* @param _imgSuccess 成功回调 */
function gerImageCamera(imgSuccess) {
    var _imgSuccess = imgSuccess;
    wx.chooseImage({
        count: 1,
        sourceType: ['camera'],
        success: function (res) {
            var fileArr = [];
            var formData = {
                'path': filePath,
                'type': "img"
            };
            for (var i = 0; i < res.tempFilePaths.length; i++) {
                var filePath = res.tempFilePaths[i];
                var formData = {
                    'path': filePath,
                    'type': "img"
                };
                uploadFile(filePath, formData, function (imageUrl) {
                    fileArr.push(imageUrl);
                    _imgSuccess(fileArr)
                })
            }
        }
    })
}

function uploadFile(url, filedata, type, success) {
    console.log(url, filedata, type)
    wx.showLoading({
      title: '上传中',
    })
    var _success = success;
    //图片上传服务
    wx.uploadFile({
        url: app.globalData.uploadUrl + 'user/images',
        filePath: url,
        name: type,
        formData: filedata,
        header: {
          "Content-Type": "multipart/form-data",
          'token': '123456789'
        },
        success: function (res) {
            console.log(res)
            if (res.statusCode == 404 || res.statusCode == 500){
                wx.showToast({ title: '网络错误', icon: 'loading', duration: 1000 });
                wx.hideLoading();
            }
            wx.showToast({
                title: '图片上传完成',
                icon: 'none'
            })
            var data = JSON.parse(res.data);
            _success(data.imageUrl);
        },
        fail: function (error) {
            wx.showToast({
                title: '上传失败',
                icon: 'none',
                duration: 1000
            })
        }
      })
    // wx.uploadFile({
    //     url: app.globalData.uploadUrl + 'user/images',
    //     filePath: url,
    //     name: type,
    //     header: {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization': 'Bearer ' + wx.getStorageSync("session").token
    //     },
    //     formData: filedata,
    //     success: function (res) {
    //       if (res.statusCode == 404 || res.statusCode == 500){
    //         wx.showToast({ title: '网络错误', icon: 'loading', duration: 1000 });
    //         wx.hideLoading();
    //       }
    //         var data = JSON.parse(res.data);
    //         _success(data.imageUrl);
    //     },
    //     fail: function (error) {
    //         wx.showToast({
    //             title: '上传失败',
    //             icon: 'none',
    //             duration: 1000
    //         })
    //     }
    // })
}
//对外公开函数
module.exports = {
    album: gerImageAlbum,
    camera: gerImageCamera,
    uploadfile: uploadFile,
}  