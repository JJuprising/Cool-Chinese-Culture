const db = wx.cloud.database()
const _ = db.command
var QuestionData= require('../question/data/data.js');
Page({
    data: {
        Selected:0,
        Count:1,
        Right:0,
        Max:10,
        Standard:5,
        isShow:false,
        FirstTry:true,
        hasUserInfo: false,
        hasUserOpenid: false,
        userInfo: {},
        openId: '',
        isFirstUpload:false,
        hasFlower:false,
        Seed:[(Math.random()*100).toFixed(0)%10+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1,
            (Math.random()*120).toFixed(0)%30+1
        ]
    },
    //加载json数据
    onLoad: function () {
        this.setData({
        Question:QuestionData["Question"]
        });
        this.getOpenId()
    },
    radioChange(e) {
        console.log('Select:',e.detail.value)
        this.setData({
            Selected:e.detail.value
        }) 
      },
    isCorrect(e){
        if(this.data.Selected==this.data.Question[this.data.Seed[this.data.Count-1]].truth){
            if(!this.data.FirstTry)
            {
                this.setData({
                    Right:this.data.Right-1,
                })
            }
            this.setData({
                Right:this.data.Right+1,
                Selected:0,
                isShow:true,
            }) 
        }
        else{
            this.setData({
                isShow:true,
                FirstTry:false,
            }) 
        }
      },
    Next(e){
        this.setData({
            Count:this.data.Count+1,
            isShow:false,
            Selected:0,
            FirstTry:true,
        })
    },
    refresh(){
        wx.navigateBack()
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
    getUserProfile() {
        if (!this.data.hasUserInfo) {
            wx.getUserProfile({
                desc: '用于展示在排行榜',
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
                title: '无需重复登录',
              })
        }
    },
    AddRankPoint(){
        let that=this
        if(this.data.isFirstUpload){
                if(this.data.hasUserInfo){
                    this.NewRankProfile()
                }
                else{
                    wx.showToast({
                        title: '未登录',
                      })
                    return;
                }
        }
        else{
        db.collection('Rank').where({
            _openid: this.data.openId
        }).update({
            data: {
                Point: _.inc(1)
            },
            success: function () {
                that.setData({
                    hasFlower:true
                })
                wx.showToast({
                    title: '获取成功！',
                  })
            }
        })
        
        }
    },
    checkRank(){
        this.doRankExist();
        setTimeout(this.AddRankPoint,300)
    },
    NewRankProfile(){
        if (this.data.hasUserInfo&&this.data.hasUserOpenid&&this.data.isFirstUpload) {
            db.collection('Rank').add({
                data: {
                    Point: 1,
                    userInfo: this.data.userInfo,
                },
                success()
                {
                    this.setData({
                        isFirstUpload:false,
                        hasFlower:true,
                    })
                }
            })
        }
        else {
            wx.showToast({
              title: '未登录或已有数据，请重试',
            })
            return
        }
    },
    doRankExist(){
        let that=this;
        db.collection('Rank').where({
            _openid: this.data.openId
        }).get({
            success(res) {
                if (!res.data.length) {
                    that.setData({
                        isFirstUpload:true
                    })
                } 
            },
        })
    },
})