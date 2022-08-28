// pages/v1/video/video.js
Page({

    data: {
        url:'',
        detail:'',
        title:'',
    },

    onLoad(options) {
        this.setData({
            url:options.url,
            detail:options.detail,
            title:options.title
        })
    },

})