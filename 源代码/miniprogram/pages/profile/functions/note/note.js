const db = wx.cloud.database()
const _ = db.command
var util = require('../../../../utils/util')
var day = util.formatTime(new Date()).split(" ")[0].split("/");
let title=''
let content=''
Page({

    data: {
        doNewNote:false,
        doShowNote:false,
        notes:[],
        openId:'',
        date:day,
    },
    onLoad(options) {
        this.setData({
            openId:options.openId
        })
        setTimeout(this.getNote,500)
        
    },
    newNote(){
        this.setData({
            doNewNote:true
        })
    },
    showNote(){
        this.setData({
            doShowNote:true
        })
    },
    getTitle(event){
        title=event.detail.value
    },
    getContent(event){
        content=event.detail.value
    },
    uploadNote(){
        if(title.length>=2&&content.length>=5){
            let that=this;
            db.collection('Note').add({
                data:{
                    Title:title,
                    Content:content,
                    Date:this.data.date
                },
                success(){
                    that.setData({
                        doNewNote:false
                    })
                    that.getNote();
                    title=''
                    content=''

                }
            })
        }
        else {
            wx.showToast({
                icon:'none',
                title: '字数不足，再写多点叭',
            })
            return
        }
    },
    getNote(){
        let that=this;
        db.collection('Note').where({
            _openid: this.data.openId
        })
        .orderBy('Date','desc')
        .get({
            success(res){
                that.setData({
                    notes:res.data,
                })
            }
        })
    },
    deleteNote(e){
        let that=this;
        db.collection('Note').doc(e.currentTarget.dataset.info).remove({
            success(res){
                wx.showToast({
                  title: '删除成功',
                })
                that.getNote()
            }
        })
    }
    

    

})