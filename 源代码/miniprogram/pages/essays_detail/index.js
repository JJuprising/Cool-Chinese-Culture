
// pages/essays_detail/index.js
const db = wx.cloud.database()
const _ = db.command
var util = require('../../utils/util')
var day = util.formatTime(new Date()).split(" ")[0].split("/");
var eid=1;
let content=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //对象类型
        essaysObj:{},
        // 是否被收藏
        isCollect:false,
        comment:[],
        userInfo: {},
        hasUserInfo:false,
        date:day
    },
    // 文章对象
    EssaysInfo:{},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.getComment();
    },
    onShow: function () {
      let pages =  getCurrentPages();
      let currentPage=pages[pages.length-1];
      let options=currentPage.options;
     
        
        
        // 获取文章id
        eid=Number(options.essay_id);
        //获取文章内容
        let that=this;
        wx.cloud.init({
            env: 'cloud1-1gpvcmkxcfc0794d'
          });
          const db = wx.cloud.database()
          db.collection('essays_detail').where({
              dessay_id:eid
          }).get({
            success: res => {
              this.EssaysInfo=res.data[0];
              // console.log(this.EssaysInfo);
            // 添加到收藏夹缓存
            // 1 获取缓存中收藏数组
            let collect=wx.getStorageSync("collect")||[];
            // 2 判断当前商品是否被收藏
            let isCollect=collect.some(v=>v.dessay_id===this.EssaysInfo.dessay_id)
              this.setData({
                essaysObj:{
                  essay_id:res.data[0].dessay_id,
                  essay_img1:res.data[0].dessay_img1,
                  cat_id:res.data[0].dcat_id,
                  essay_src:res.data[0].dessay_src,
                  essay_title:res.data[0].dessay_title,
                  essay_detail:res.data[0].dessay_detail
                },
                isCollect
              })
            },
            fail(err){
              console.log("请求失败")
            }
          })
          
      
    },
    // 点击收藏图标
    handleCollect(){
      let isCollect=false;
      // 1 获取缓存中的收藏数组
      let collect=wx.getStorageSync("collect")||[];
      // 2 判断文章是否被收藏过
      let index=collect.findIndex(v=>v.dessay_id===this.EssaysInfo.dessay_id)
      // 3 当index!=-1 表示已经收藏过了
      if(index!==-1){
        // 已经收藏过了 在数组中删除
        collect.splice(index,1);
        isCollect=false;
        // 弹窗提示
        wx.showToast({
          title: '取消成功',
          icon: 'success',
          mask: true
        });
      }else{
        // 没有收藏过 添加
        collect.push(this.EssaysInfo);
        isCollect=true;
        // 弹窗提示
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          mask: true
          
        });
      }
      // 4 把数组存入到缓存中
      wx.setStorageSync("collect",collect);
      // 5 修改data中的属性 isCollect
      this.setData({
        isCollect
      })
    },
    getUserProfile() {
        if (!this.data.hasUserInfo) {
            wx.getUserProfile({
                desc: '用于发表评论',
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
    getContent(event){
        content=event.detail.value
    },
    uploadComment(){
        let that=this;
        db.collection('Comment').add({
            data:{
                UserInfo:this.data.userInfo,
                Content:content,
                Date:this.data.date,
                Essay_id:eid
            },
            success(){
                wx.showToast({
                  title: '发表成功！',
                })
                that.getComment();
                content=''
            }
        })
    },
    getComment(){
        let that=this;
        db.collection('Comment').where({
            Essay_id:eid
        })
        .orderBy('Date','desc')
        .get({
            success(res){
                that.setData({
                    comment:res.data,
                })
            }
        })
    },
    
    
    

    
})