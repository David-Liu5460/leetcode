class EventBus {
    constructor() {
      this.events = {};
      this.multiEventHandlers = {};
    }
  
    on(event, callback) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
  
    off(event, callback) {
      if (!this.events[event]) {
        return;
      }
      this.events[event] = this.events[event].filter(
        (eventCallback) => eventCallback !== callback
      );
    }
  
    emit(event, ...args) {
      if (!this.events[event]) {
        return;
      }
      this.events[event].forEach((callback) => {
        callback(...args);
      });
      this.handleMultiEvent(event, ...args);
    }
    
    handleMultiEvent(event, ...args) {
      const handlerKeys = Object.keys(this.multiEventHandlers);
      handlerKeys.forEach((key) => {
        const { events, callback, triggeredEvents } = this.multiEventHandlers[key];
        triggeredEvents.add(event);
        
        // 如果所有事件都被触发，则执行回调函数，并重置triggeredEvents。
        if (events.every(e => triggeredEvents.has(e))) {
          callback(...args);
          this.multiEventHandlers[key].triggeredEvents = new Set();
        }
      });
    }
    
    subscribeMulti(events, callback) {
      const key = events.join('+');
      this.multiEventHandlers[key] = {
        events,
        callback,
        triggeredEvents: new Set()
      };
      
      events.forEach((event) => {
        this.on(event, () => {});
      });
    }
  }
  
  // 使用示例
  const eventBus = new EventBus();
  
  const multiCallback = () => console.log('All events triggered!');
  
  eventBus.subscribeMulti(['event1', 'event2'], multiCallback);
  
  eventBus.emit('event1'); // 不会输出任何东西，因为event2尚未触发。
  eventBus.emit('event2'); // 输出: All events triggered!
  
  eventBus.emit('event1'); // 再次不会输出任何东西，因为event2尚未再次触发。
  eventBus.emit('event2'); // 输出: All events triggered!
  