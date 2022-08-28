Component({
    properties:{
      tabs:{
        type:Array,
        value:[]
      }
    },
    data: { 
      // curTab: 0,
      // current: 0,  
        
    }, 
    // selectTab(e) {
    //   let index = e.target.dataset.index;
    //   this.setData({
    //     curTab: index,
    //     current: index
    //   })
    // },
    // swiperChange(e) {
    //   let index = e.detail.current;
    //   this.setData({
    //     curTab: index,
    //     current: index
    //   })
    // },
    
    //组件.js存放事件回到函数在methods中
    methods:{  
      handleItemTap(e){
        /* 1  
        1 绑定点击事件 
        2 获取被点击的索引
        3 获取原数组
        4 对数组循环 
          1 给每一个循环性 选中属性 改为 false 
          2 给 当前的索引的 项添加激活选中效果就可以了
        */ 
        // 2 获取索引 
        const {index}=e.currentTarget.dataset; 
        // 传递事件给父组件
        this.triggerEvent("itemChange",{index});
        // 3 获取data中的数组
        // 解构 对 复杂类型进行结构 复制了一份 变量引用而已
        let {tabs}=this.data;
        // 4 循环数组 
        tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false )
          
        this.setData({
          tabs
        })
      },
    }
  })