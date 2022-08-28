const db = wx.cloud.database()
const _ = db.command
var util = require('../../../../utils/util')
var day = util.formatTime(new Date()).split(" ")[0].split("/");
let title=''
let content=''
Page({
    data: {
        date:day,
        doNewNote:false
    },
    newNote(){
        this.setData({
            doNewNote:true
        })
    },
    getTitle(event){
        title=event.detail.value
    },
    getContent(event){
        content=event.detail.value
    },
    uploadNote(){
        
        let that=this;
        db.collection('Report').add({
            data:{
                Title:title,
                Content:content,
                Date:this.data.date
            },
            success(){
                that.setData({
                    doNewNote:false
                })
                title=''
                content=''
                wx.showToast({
                  title: '感谢你的提交:D',
                })
             }
        })
    },
})