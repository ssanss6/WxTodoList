// pages/editDetail/editDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskContent:'',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const newList = wx.getStorageSync('taskList');
    const eid = options.id;
    var content=''
    for (let index = 0; index < newList.length; index++) {
      if(newList[index].id ==eid){
       content = newList[index].text;
      } 
    }
    this.setData({
      taskContent:content,
      id:eid
    })
  },
  handleInut(res){
    console.log(res.detail.value)
    this.setData({
      taskContent:res.detail.value
    })
  },

  saveBtn(){
    const newList = wx.getStorageSync('taskList')
    const id = this.data.id
    for (let index = 0; index < newList.length; index++) {
      if(newList[index].id == id){
        newList[index].text =  this.data.taskContent
      }
      
    }
    
    wx.setStorageSync('taskList', newList)
    wx.showToast({
      title: '保存成功',
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})