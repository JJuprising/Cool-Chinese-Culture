const db = wx.cloud.database()
const _ = db.command
Page({
    data: {
        rankInfo:{}
    },
    onLoad(options) {
        this.getRankInfo()
    },
    getRankInfo(){
        let that=this;
        db.collection('Rank')
        .orderBy('Point','desc')
        .get({
            success(res){
                that.setData({
                    rankInfo:res.data,
                })
            }
        })
    }
})