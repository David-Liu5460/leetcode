// 快照沙箱 进入沙箱 记录原来的window快照，将上一次沙箱覆盖到window
// 退出沙箱 还原window 同时对比沙箱环境和window快照，并将对比结果记录下来

class SnapshotSandbox {
    windowSnapshot = {}
    modifiedMap = {}
    proxy = window;
  
    constructor() {
    }
  
    active() {
      // 记录 window 旧的 key-value
      Object.entries(window).forEach(([key, value]) => {
        this.windowSnapshot[key] = value;
      })
  
      // 恢复上一次的 key-value
      Object.keys(this.modifiedMap).forEach(key => {
        window[key] = this.modifiedMap[key];
      })
    }
  
    inactive() {
      this.modifiedMap = {};
  
      Object.keys(window).forEach(key => {
        // 如果有改动，则说明要恢复回来
        if (window[key] !== this.windowSnapshot[key]) {
          // 记录变更
          this.modifiedMap[key] = window[key]; // 备份
          window[key] = this.windowSnapshot[key]; // 还原
        }
      })
    }
  }
  
  module.exports = SnapshotSandbox;
  