
Page({

    data: {
        userInfo:{},
        hasUserInfo: false,
        openId:''
    },
    getUserProfile() {
        if (!this.data.hasUserInfo) {
            wx.getUserProfile({
                desc: '用于绑定用户',
                success: (res) => {
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
        else{
            wx.showToast({
                icon:'error',
                title: '无需重复登录',
              })
        }
    },
    getOpenId() {
        wx.cloud.callFunction({
            name: 'getOpenId',
            config: {
                env: this.data.envId
            },
            data: {
                type: 'getOpenId'
            }
        }).then((resp) => {
            this.setData({
                hasUserOpenid: true,
                openId: resp.result.openid
            });
        })
    },
    onLoad(options) {
        this.getOpenId();
    },
})