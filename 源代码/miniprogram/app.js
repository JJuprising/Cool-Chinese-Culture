//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options){
    wx.cloud.init({
      env:"cloud1-1gpvcmkxcfc0794d"
    })
  },
  onShow: function(options){

  },
  onHide: function(){ 

  },
  onError: function(msg){

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options){

  },
  globalData: {
    
  }
});
