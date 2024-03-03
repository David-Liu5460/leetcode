// // 手写一个event bus类
// class EventBus {
//     constructor () {
//         this.events = {}; // 事件对象 {eventName: [fn1, fn2]} 事件名
//     }

//     on(eventName, fn) {
//         if (!this.events[eventName]) {
//             this.events[eventName] = {};
//         }
//         console.log(this.events);
//         this.events[eventName].push(fn);
//     };

//     emit(eventName, ...args) {
//         if (this.events[eventName]) {
//             // 获取对应的事件数组
//             this.events[eventName].forEach(callback  => callback(...args));
//         }
//     }

//     off (eventName, fn) {
//         console.log(this.events, 'off前');
//         if (this.events[eventName]?.length > 0) {
//             console.log('off0', this.events);
//             const callbacks = this.events[eventName];
//             const index = callbacks.indexOf(fn);
//             console.log(this.events[eventName][0] == fn)
//             // this.events[eventName] = this.events[eventName].filter(item => item !== fn);
//             console.log('off1',  index, this.events);
//         }
//     };

//     once(eventName, fn) {
//         console.log(fn)
//         this.on(eventName, (...args) => {
//             fn(...args);
//             this.off(eventName, fn)
//         });
//     }
// }

// const eventA = new EventBus();
// eventA.once('demo1', function abc() { 
//     console.log('demo1');
// });

// eventA.emit('demo1');
// eventA.emit('demo1');


class EventBus {
    constructor() {
      this.events = {};
    }
  
    on(eventName, callback) {
      if (!this.events[eventName]) {
        this.events[eventName] = [];
      }
      this.events[eventName].push(callback);
    }
  
    off(eventName, callback) {
      if (!this.events[eventName]) {
        return;
      }
      console.log(this.events, 'off前')
      this.events[eventName] = this.events[eventName].filter(cb =>  { cb !== callback });
      console.log(this.events, 'off后')
    }
  
    once(eventName, callback) {
      const onceCallback = (...args) => {
        callback(...args);
        this.off(eventName, onceCallback);
      };
      console.log(onceCallback, 111);
      this.on(eventName, onceCallback);
    }
  
    emit(eventName, ...args) {
      if (!this.events[eventName]) {
        return;
      }
      this.events[eventName].forEach(callback => callback(...args));
    }
  }
  
  // 使用示例
  const eventBus = new EventBus();
  
  // 订阅事件
  eventBus.on("click", () => {
    console.log("click event triggered");
  });
  
  // 发布事件
//   eventBus.emit("click"); // 输出: "click event triggered"
  
  // 取消订阅事件
//   const callback = () => {
//     console.log("callback function");
//   };
//   eventBus.on("customEvent", callback);
//   eventBus.off("customEvent", callback);
  
  // 只订阅一次事件
  eventBus.once("init", () => {
    console.log("init event triggered");
  });
  eventBus.emit("init"); // 输出: "init event triggered"
  eventBus.emit("init"); // 无输出
  