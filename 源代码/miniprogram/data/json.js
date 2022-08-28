// 本地模拟json数据
// 1文学 2艺术 3科技 4神话 5建筑
var json = [{
    "essay_id": 1,
    "cat_id": 2,  /* 分类*/ 
    "essay_title": "京剧——中国影响最大的戏曲剧种",
    "essay_src": "百度百科", 
    "essay_images":"https://s2.loli.net/2022/03/29/AxOUl5fwKNFmtaL.png"
  },
  { 
    "essay_id": 11,    
    "cat_id": 1, 
    "essay_title": "论语——中国儒家经典",  
    "essay_src": "百度百科",
    "essay_images":"https://bkimg.cdn.bcebos.com/pic/b17eca8065380cd745021af3a944ad3459828194?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxMTY=,g_7,xp_5,yp_5/format,f_auto"
  },
  {
    "essay_id": 21,
    "cat_id": 3,
    "essay_title": "穿越必备技之——造纸术",
    "essay_src": "百度百科",
    "essay_images":"https://bkimg.cdn.bcebos.com/pic/00e93901213fb80e8ab8d7713cd12f2eb938942f?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5/format,f_auto"
  },
  {
    "essay_id": 31,
    "cat_id": 4,
    "essay_title": "女娲补天",
    "essay_src": "百度百科",
    "essay_images":"https://bkimg.cdn.bcebos.com/pic/a8ec8a13632762d0bd477140a2ec08fa503dc6d0?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5/format,f_auto"
  },
  {
    "essay_id": 41,
    "cat_id": 5,
    "essay_title": "客家围屋——中国客家文化特色民居建筑",
    "essay_src": "百度百科",
    "essay_images":"https://bkimg.cdn.bcebos.com/pic/8644ebf81a4c510fd9f9a609a313322dd42a28340fc7?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5/format,f_auto"
  },
  {
    "essay_id": 32,
    "cat_id": 6,
    "essay_title": "盘古开天辟地",
    "essay_src": "百度百科",
    "essay_images":"https://bkimg.cdn.bcebos.com/pic/d1160924ab18972b3e2adafee1cd7b899e510af6?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U4MA==,g_7,xp_5,yp_5/format,f_auto"
  }
  ]
   
  // 定义数据出口
  module.exports = {
    essayList: json
  }
   