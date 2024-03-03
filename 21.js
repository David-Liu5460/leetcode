class Subject {
    constructor() {
        this.watchers = [];
    }

    regist(watcher) {
        this.watchers.push(watcher);
    };

    notify(data, ...args) {
        this.watchers.forEach(watcher => {
            watcher.call(data, ...args);
        });
    }
}

class Watcher {
    constructor(cb) {
        this.cb = cb;
    }
    call(data, ...args) {
        this.cb(data, ...args);
    };
}

let sub = new Subject();
let watcher1 = new Watcher(data => {
    console.log(data, 11);
});
let watcher2 = new Watcher(data => {
    console.log(data, 22);
});
sub.regist(watcher1);
sub.regist(watcher2);


sub.notify('hello');


// 发布订阅管理器
var pubSub = {
    subscribers: {},
  
    subscribe: function(eventType, callback) {
      // 订阅事件
      if (!this.subscribers[eventType]) {
        this.subscribers[eventType] = [];
      }
      this.subscribers[eventType].push(callback);
    },
  
    unsubscribe: function(eventType, callback) {
      // 取消订阅
      if (this.subscribers[eventType]) {
        this.subscribers[eventType] = this.subscribers[eventType].filter((subscriberCallback) => {
          return subscriberCallback !== callback;
        });
      }
    },
  
    publish: function(eventType, data) {
      // 发布事件
      if (this.subscribers[eventType]) {
        this.subscribers[eventType].forEach((subscriberCallback) => {
          subscriberCallback(data);
        });
      }
    }
  };
  
  // 使用发布订阅模式
  function handleEvent1(data) {
    console.log("Event 1 received, data:", data);
  }
  
  function handleEvent2(data) {
    console.log("Event 2 received, data:", data);
  }
  
  pubSub.subscribe("eventType1", handleEvent1);
  pubSub.subscribe("eventType2", handleEvent2);
  
  pubSub.publish("eventType1", { message: "Hello from event 1!" });
  pubSub.publish("eventType2", { message: "Hello from event 2!" });
  
  pubSub.unsubscribe("eventType1", handleEvent1);
  
  pubSub.publish("eventType1", { message: "This will not be logged." });
  pubSub.publish("eventType2", { message: "This will still be logged." });