// index.js

Page({
  data: {
    taskList:[],
    showTaskList:[],
    newTaskContent: '',
    isAllSelected: false,
    // totalTaskCount:0, //累计创建的任务(包括已删除)
    conditions:['待完成','进行中','已完成'],
    choosefilterList:[
      ['标签','工 作','生 活','学 习'],
      ['优先级','低','中','高']
    ],

    // filterObj:{
    //   label:['标签','工 作','生 活','学 习'],
    //   priorities:['低','中','高']
    // },
    searchValue:'',
    pickIndex:[0,0],
    isFilter:false
    },
    onLoad(){
      const newList = wx.getStorageSync('taskList')
      const newTaskCount = wx.getStorageSync('totalTaskCount')
      this.setData({
        taskList:newList,
        totalTaskCount:newTaskCount,
        showTaskList:newList
      })
    },
    onShow(){
      const newList = wx.getStorageSync('taskList')
      const newTaskCount = wx.getStorageSync('totalTaskCount')
      this.setData({
        taskList:newList,
        totalTaskCount:newTaskCount,
        showTaskList:newList
      })
      console.log(newList)
    },

    searchInput(res){
      console.log(res.detail.value)
      this.setData({
        searchValue:res.detail.value
      })
    },
    searchTask(){
      const oldList = wx.getStorageSync('taskList');
      const searchVal = this.data.searchValue;
      var newList = [];
      for(var i=0;i<oldList.length;i++){
        if(oldList[i].text.includes(searchVal)){
          newList.push(oldList[i])
        }
      }
      this.setData({
        taskList:newList
      })
    },

    JumpeditDetail(e){
      console.log(e)
      wx.redirectTo({
        url: '/pages/editDetail/editDetail?id=' + e.currentTarget.dataset.taskid
      })
    },
    

    // 全选函数
    allSelect(){
      const newList = this.data.taskList;
      const allSelect = !this.data.isAllSelected
      for (let index = 0; index < newList.length; index++) {
        newList[index].Selected = allSelect
        
      }
      this.setData({
        taskList:newList,
        isAllSelected:allSelect
      })
      wx.setStorageSync('taskList', this.data.taskList)
    },

    allDelete(){
      wx.showModal({
        title: '提示',
        content: '确定要批量删除？',
        complete: (res) => {
          if (res.cancel) {
            console.log("删除取消")
          }
          if (res.confirm) {
            const newList = [];
            const oldList = this.data.taskList;
            for (let index = 0; index < oldList.length; index++) {
              if(oldList[index].Selected != true){
              newList.push(oldList[index])
              }
            }
            this.setData({
            taskList:newList
            })
            wx.setStorageSync('taskList', this.data.taskList);
            wx.showToast({
              title: '删除完成',
            })
          }
        }
      })
      
    },
    JumpaddTask(){
      wx.navigateTo({
        url: '/pages/addTask/addTask',
      })
    },

    // 过滤选择器值改变
    filterSelectorChange(e){
      
      console.log(e)
      if(e.detail.value[0]==0 && e.detail.value[1]==0){
        this.setData({
          taskList:wx.getStorageSync('taskList'),
          isFilter:false,
          pickIndex:[0,0]
        })
        return
      }
      var newList = wx.getStorageSync('taskList')
      console.log(newList)
      const filterLabel = this.data.choosefilterList[0][e.detail.value[0]]
      const filterPriority = this.data.choosefilterList[1][e.detail.value[1]]
      if(e.detail.value[0] != 0){
        newList = newList.filter(item => item.label[0] == filterLabel)
      }
      if(e.detail.value[1] != 0){
        newList = newList.filter(item => item.priority == filterPriority)
      }
      console.log(newList)
      this.setData({
        pickIndex:e.detail.value,
        taskList:newList,
        
      })
    },

    changeCondition(e){
      var newList = wx.getStorageSync('taskList')
      var fnewList = this.data.taskList
      const findId = e.currentTarget.dataset.taskid
      for(var i=0;i<newList.length;i++){
        if(newList[i].id == findId){
          newList[i].condition = this.data.conditions[e.detail.value]

        }
      }
      for(var i=0;i<fnewList.length;i++){
        if(fnewList[i].id == findId){
          fnewList[i].condition = this.data.conditions[e.detail.value]

        }
      }
      this.setData({
        taskList:fnewList
      })
      wx.setStorageSync('taskList', newList)
    },
    // 单个选择
    toggleTaskStatus(e){
      console.log(e)
      const newList = this.data.taskList;
      for (let index = 0; index < newList.length; index++) {
        if(newList[index].id == e.currentTarget.dataset.taskid){
          newList[index].Selected = !newList[index].Selected
        }
      }
      this.setData({
        taskList:newList
      })
      wx.setStorageSync('taskList', this.data.taskList)
    },
    deleteTask(e){
      console.log(e)
      const delId = e.currentTarget.dataset.taskid;
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        complete: (res) => {
          if (res.cancel) {
            console.log("删除取消")
          }
      
          if (res.confirm) {
            const newtaskList = [];
            const oldList = this.data.taskList;
            for (let index = 0; index < oldList.length; index++) {
              if( oldList[index].id != delId){
                newtaskList.push(oldList[index])
              }
            }
            this.setData({
              taskList:newtaskList
            })
            wx.setStorageSync('taskList', newtaskList)
            wx.showToast({
              title: '删除成功',
            })
          }
        }
      })
    }
})
