class Watcher {
    cb;
    constructor(cb) {
        this.cb = cb;
    }

    call(data, ...args) {
        this.cb(data, ...args);
    }
}

class Subject {
    watcherList = [];

    regist(expression) {
        this.watcherList.push(expression);
    };

    callListener(data, ...args) {
        const watcherListTemp = [...this.watcherList];
        for(let i = 0; i < watcherListTemp.length; i++) {
            watcherListTemp[i].call(data, ...args);
        };
    };
}

const sub = new Subject();
sub.regist(new Watcher(() => console.log(`张三被通知`)));
sub.regist(new Watcher(() => console.log(`李四被通知`)));

// sub.callListener();

// 职责链模式 将请求和处理分开 请求者不需要知道谁去处理 处理者也不需要知道请求的全貌  提高系统的灵活性 
// 新增处理器到整个链条中的代价是非常小的；
// 降低系统性能， 每个请求需要从链头走到链尾；
// 当这个链比较长的时间，性能会大幅度下降
class Handler {
    nextHandler;
    setNextHandler(nextHandler) {
        this.nextHandler = nextHandler;
    };
};

class Leader extends Handler {
    process(info) {
        if (info > 0 && info < 10) {
            console.log('Leader 处理')
        } else {
            this.nextHandler.process(info);
        }
    }
};

class Boss extends Handler {
    process(info) {
       if (info >= 10) console.log('boss 处理');
    }
};

let level1 = new Leader();
let level2 = new Boss();

level1.setNextHandler(level2);

level1.process(9);
level1.process(11);

// 滚动 > 10px => 停留时间 > 100ms => 滚动距离 >= 10px
let expressionStore = {
    unit: "distance",
    unitValue: "10",
    unitOperator: "ge",
    eventKey: "scroll",
    combo: {
        unit: "cssSelector",
        unitValue: "#detail-table > div.next-loading.next-loading-inline > div > div.table-custom > div > div > div > div > div > div.next-table-body.ps.ps--active-y > table > tbody > tr:nth-child(16) > td:nth-child(8) > div > div > button",
        unitOperator: "selectorIn",
        eventKey: "click",
        combo: {
            unit: "distance",
            unitVale: "10",
            unitOperator: "ge",
            eventKey: "scroll"
        }
    }
};

class ScrollSubject extends Subject {
    constructor() {
        document.addEventListener('scroll', (e) => {
            const { startScroll, endScroll } = e.target;
            const distance = endScroll.y - startScroll.y;
            super.callListener({ "scroll": distance });
        })
    };
};

class ClickSubject extends Subject {
    number;

    constructor() {
        document.addEventListener('scroll', (e) => {
            const { startScroll, endScroll } = e.target;
            const distance = endScroll.y - startScroll.y;
            super.callListener({ "distance": distance });
        })
    };
};

class Expression extends Watcher {
    eventSubjectMap; // 事件监听池
    _isPassed; // 代表当前表达式是否命中
    parent; // 前驱节点
    combo; // 后继节点
    passSubject = new Subject(); // 表达式通过的节点
    // 责任链模式
    compute(unitOperator, currentValue, orderValue) {
        // case when
        return currentValue > orderValue
    }
    constructor({ config, parent, eventSubjectMap }) {
        super((unitValue) => {
            try {
                // 回调判断是否命中表达式
                let orderValue = this.config.unitValue;
                let currentValue = unitValue[this.config.unit];
                let isCurrentPass = this.compute(this.config.unitOperator, currentValue, orderValue);

                if (isCurrentPass) {
                    // 当前表达式匹配通过 需要更改表达式的通过状态
                    this.pass(unitValue);
                };

            } catch (e) {
                throw new Error(e);
            }
        });

        try {
            this.config = config;
            this.parent = parent;

            const { combo, eventSubjectMap } = config;

            if (combo) {
                this.combo = new Expression({
                    config: combo,
                    parent: this,
                    eventSubjectMap
                });
            };

            if (!this.parent) {
                // 起点 需要监听
                const _head = this;
                const passWatcher = new Watcher(() => {
                    if (_head.isPass()) {
                        // todo
                    }
                });

                this.passSubject.regist(passWatcher);
                this.comboPassRegist(passWatcher);
            };

            if (eventSubjectMap) {
                const { eventKey } = this.config;
                const watcher = eventSubjectMap[eventKey];
                if (watcher) {
                    watcher.regist(this);
                    this.eventSubject = watcher;
                } else {
                    console.log('watch not found')
                }
            }
            

        } catch (e) {
            throw new Error(e);
        }
    };

    comboPassRegist(fn) {
        this.combo && this.combo.passSubject.regist(fn);
        this.combo && this.combo.comboPassRegist(fn);
      }

    pass(unitVale) {
        // 父节点pass 才允许子节点pass 
        const isParentPass = !this.parent || this.parent.isPass();

        if (this._isPassed) {
            // 已经校验通过
            console.log('has already pass')
        } else if (isParentPass) {
            // 前驱节点pass 当前节点才允许pass
            this.setPass(true);
            // 触发计算头节点和所有combo节点的pass状态
            this.passSubject.callListener(this);
        } else {
            console.log('parent not pass!');
        }

    };

    setPass(isPassed) {
        this._isPassed = isPassed;
    }

    // 从头节点开始校验行为表达式是否通过
    isComboPass() {
        // 责任链模式
        const next = this.combo;
        const comboAllPass = next ? next.isPass() && next.isComboPass() : true;
        return comboAllPass;
    };
    isPass() {
        return this._isPassed && this.isComboPass()
    };
};



class ExpressionEngne {
    config; // 表达式配置 - 实例属性
    expressionList;

    constructor(expressionList) {
        this.eventSubjectMap = {
            'scroll': new ScrollSubject(),
            'click': new ClickSubject()
        };

        this.expressionList = expressionList.map(expConfig => {
            const expInstance = new Expression({
                config: expConfig,
                eventSubjectMap: this.eventSubjectMap,
            });

            return expInstance;
        });
    };

    init() {

    }
}

const init = () => {
    const config = [expressionStore];
    let engine = new ExpressionEegine(config);
    engine.init();
};

