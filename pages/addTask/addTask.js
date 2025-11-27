// pages/addTask/addTask.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // labels:["工作","学习","生活"],
    taskList:[],
    labels : [
      ['工 作', { icon: '/asset/label/kehu.png', color: '#4A90E2' }],
      ['生 活', { icon: '/asset/label/shui.png', color: '#50C14D' }],
      ['学 习', { icon: '/asset/label/xuexi.png', color: '#FF8C42' }]
    ],
    CurrentLabelIndex:0,
    priorities:['低','中','高',],
    CurrentPrioritiesIndex:0,
    CurrentPriority:'低',
    CurrentLabel:['工 作', { icon: '/asset/label/kehu.png', color: '#4A90E2' }],
    newTaskContent:''
  },
  
  chooseLabel(){
    if(this.data.CurrentLabelIndex >= 2){
      this.setData({
        CurrentLabel:this.data.labels[0],
        CurrentLabelIndex:0
      })
    }
    else{
      this.setData({
        CurrentLabel:this.data.labels[this.data.CurrentLabelIndex+1],
        CurrentLabelIndex:this.data.CurrentLabelIndex+1
      })
    }
    wx.setStorageSync('CurrentLabel', this.data.CurrentLabel)
    wx.setStorageSync('CurrentLabelIndex', this.data.CurrentLabelIndex)
    
    
  },

  choosePriority(){
    if(this.data.CurrentPrioritiesIndex >= 2){
      this.setData({
        CurrentPriority:this.data.priorities[0],
        CurrentPrioritiesIndex:0
      })
    }
    else{
      this.setData({
        CurrentPriority:this.data.priorities[this.data.CurrentPrioritiesIndex+1],
        CurrentPrioritiesIndex:this.data.CurrentPrioritiesIndex+1
      })
    }
    wx.setStorageSync('CurrentPriority', this.data.CurrentPriority)
    wx.setStorageSync('CurrentPrioritiesIndex', this.data.CurrentPrioritiesIndex)
  },

  handleInut(res){

    this.setData({
      newTaskContent:res.detail.value
    })
    wx.setStorageSync('TempContent', this.data.newTaskContent)
    console.log(this.data.newTaskContent)
  },

  addTask(){
    if(this.data.newTaskContent != ''){
      const taskCount = Number(wx.getStorageSync('totalTaskCount')) + 1
      this.setData({
        taskList:[...this.data.taskList,{id:taskCount,text:this.data.newTaskContent,Selected:false,condition:"待完成",label:this.data.CurrentLabel,priority:this.data.CurrentPriority}],
        totalTaskCount:taskCount,
        newTaskContent:""
      })
    wx.setStorageSync('totalTaskCount', taskCount)
    wx.setStorageSync('taskList', this.data.taskList)
    wx.setStorageSync('TempContent', this.data.newTaskContent)
    
    wx.showToast({
      title: '添加成功',
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
  else{
    wx.showToast({
      title: '内容不能为空',
      icon:"error"
    })
  }
  console.log(this.data.taskList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const newList = wx.getStorageSync('taskList')
    const content = wx.getStorageSync('TempContent')
    const priority = wx.getStorageSync('CurrentPriority') || '低'
    const priorityIndex = wx.getStorageSync('CurrentPrioritiesIndex') || 0
    const label = wx.getStorageSync('CurrentLabel') || ['工 作', { icon: '/asset/label/kehu.png', color: '#4A90E2' }]
    const LabelIndex = wx.getStorageSync('CurrentLabelIndex') || 0
      this.setData({
        taskList:newList,
        newTaskContent:content,
        CurrentPriority:priority,
        CurrentPrioritiesIndex:priorityIndex,
        CurrentLabel:label,
        CurrentLabelIndex:LabelIndex
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
})