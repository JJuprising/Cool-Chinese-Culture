//Page Object
var jsonData = require('../../data/json.js');
Page({
  data: {
    tabs: [{   
      id: 1,
      name: "推荐",
      isActive:true
    }, 
    {
      id: 2,
      name: "文创", 
      isActive:false
    },  
    {
      id: 3,
      name: "时装",
      isActive:false
    }, 
    {
      id: 4,
      name: "节目",
      isActive:false
    }
  ],
    essayList:[]
    
  },
  essayReady:[],
  // 总页数
  totalPages:2,
  pagenum:0,
  handleItemChange(e){
        const {index}=e.detail;
        let {tabs}=this.data;
        // 4 循环数组
        tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false )
        this.setData({
          tabs
        })
  },
  //引入本地json数据，这里引入的就是第一步定义的json数据
  //我们在这里加载本地json数据
  onLoad: function () {
    this.getessayList()
    
  },
  async getessayList(){
    wx.cloud.init({
      env: 'cloud1-1gpvcmkxcfc0794d'
    });
    const db = wx.cloud.database()
    db.collection('essays')
    .get({
      success: res => {
        
        // 获取总条数
        // const total=Number(res.data[0].total)+Number(res.data[1].total)+Number(res.data[2].total);
        
        // 获取总页数
        // this.totalPages=Math.ceil(total/this.QueryParams.pagesize)-1;
        this.essayReady=res.data||[];
        this.setData({
          essayList:res.data
          
        })
      },
      fail(err){
        console.log("请求失败")
      }
    })
  },
  onPullDownRefresh:function(){
    
    wx.stopPullDownRefresh()
  },
  /*判断有无下一页   
  1获取到总页数 =Math.cell(总条数 total / 页容量 pagesize)
  2获取到当前的页码 pagenum
  3判断一下当前页码是否大于等于总页数 表示没有下一页数据
  假设没有 弹出提示*/
  onReachBottom(){
    // 判断有没有下一页
    if(this.pagenum>=this.totalPages){
      // 没有下一页数据
      console.log("没有下一页");
    }else{
      // 还有下一页数据
      this.pagenum++;
    }
  },

 
  adddetial: function () {
 
    wx.navigateTo({
 
      url: '../question/question',
 
      success: function (res) { },
 
      fail: function (res) { },
 
      complete: function (res) { },
 
    })
 
  },
});
  