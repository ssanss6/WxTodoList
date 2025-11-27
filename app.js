// app.js
App({
  onLaunch() {
    // 检查本地存储是否有taskList，若无则初始化为空数组（wx.setStorageSync('taskList', [])）。
    if(wx.getStorageSync('taskList') == null){
      wx.setStorageSync('taskList', [])
    }
    if(wx.getStorageSync('totalTaskCount') == null){
      wx.setStorageSync('totalTaskCount', 0)
    }

    
  },
  globalData: {
    userInfo: null
  }
})
