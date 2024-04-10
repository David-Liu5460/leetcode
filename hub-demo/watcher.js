class Watcher {
    cb;
    constructor(cb) {
        this.cb = cb;
    };

    call(...args) {
        this.cb(...args);
    }
};

class Subject {
    
    constructor() {
        this.watcherList = [];
    };

    regist(watcher) {
        this.watcherList.push(watcher);
    };

    callListener(...args) {
        this.watcherList.map(watcher => {
            watcher.call(null, ...args);
        })

    }
}

let watcher1 = new Watcher(() => {
    console.log('张三')
});

let watcher2 = new Watcher(() => {
    console.log('李四')
});

let sub = new Subject();

sub.regist(watcher1);
sub.regist(watcher2);

sub.callListener();


class Hander {
    nextHandler;
    setNextHandler(nextHandler) {
        this.nextHandler = nextHandler;
    };
};

class Leader extends Hander {
    process(info) {
        if (info > 0 && info < 10) {
            console.log('Leader处理');
        } else {
            this.nextHandler.process(info);
        };
    };
}

class Boss extends Hander {
    process(info) {
        if (info > 10) {
            console.log('boss 处理');
        }
    }
}

// let level1 = 
let level1 = new Leader();
let level2 = new Boss();

level1.setNextHandler(level2);

level1.process(9);
level1.process(11);





class ClickSubject extends Subject {
    // 
}

const config = {
    eventKey: 'click',
    operator: 'selecedIn',
    combo: {
        eventKey: 'scroll',
        operator: 'ge',
        eventValue: '100',
        unit: 'px',

        combo: {

        }
    }
}

class Expression extends Watcher {
    eventMap; // 事件map
    _isPassed; // 表达式是否通过
    parent; // 前驱节点；
    combo; // 后继节点

    constructor() {

        super(() => {


        })

    }

    isPass() {
        const combo = this.combo;
        const isPass = 

    }

    setPass() {
        this._isPassed = true;

    };
}
