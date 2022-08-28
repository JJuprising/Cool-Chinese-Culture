const db = wx.cloud.database()
const _ = db.command
Page({
    data: {
        video:[]
    },
    onLoad: function (){
        this.getData()
    },
    getData(){
        let that=this;
        db.collection('Video').get({
            success(res) {
                that.setData({
                    video:res.data
                }) 
            },
        })
    }
})
