export interface IntentionConfig {
    key: string
    weight: number
    expressionKeyList: string[]
    unionExpressionKeyList?: string[]
    handleKeyList: string[]
    handleWeight?: {
      [handleKey: string]: number
    }
    //  逻辑数据
    currentHandle: HandleConfig //  根据达成情况计算当前 handle event
}

export interface HandleConfig {
    key: string //  自定义事件
    weight: number
    expressionKeyList: string[] //  “或”逻辑，满足一条即可
    ext?: Object //  扩展配置，将通知到客户端
    isWeightBlock: boolean //  提供 weight 强制阻塞开关，控制被疲劳度命中后，是否需要继续后续handle的触达，便于分步骤渐进表单这类场景
    mode?: UberEnum.HandleMode //  
    //  父子 handle 机制，便于统一管控
    child?: string[]
    // parent?: string
  
    //  逻辑数据
    triggerCount: number //  被触发次数
    isComplete: boolean //  是否成功达成
    effectIf?: ExpressionConfig //  handle 生效条件
    loader?: LoaderConfig
  }

  export interface ExpressionConfig {
    key?: string
    unit: UberEnum.ExpressionUnit
    unitValue: any
    unitOperator: UberEnum.Operator
    // type?: ExpressionType
    repeat?: ExpressionConfig//  重复条件
    combo?: ExpressionConfig//  多级条件
    union?: ExpressionConfig//  联动条件
    ext?: {
      activeHandleKey?: string //  用于 同一前置表达式，在同站点不同handle区别配置
    }
    // eventKey?: BehaviorEvent | AccessEvent //  combo 中可为空
    eventKey?: BehaviorEvent  //  combo 中可为空
  
    //  逻辑数据
    isActive?: boolean //  多级条件的情况下，标记已匹配层级情况
    match: matchUnit[]
    isTrack?: boolean //  是否开启采集模式
  }

  export enum BehaviorEvent {
    click = 'click',
    input = 'input',
    drag = 'drag',
    selectWord = 'selectWord',
    scroll = 'scroll',
    stay = 'stay',
    relativeStay = 'relativeStay',
    entry = 'entry',
    handleNotice = 'handleNotice',
    handleComplete = 'handleComplete',
    repeat = 'repeat',
    operate = 'operate',
    device = 'device',
    EXPORT_IN = "exportIn",
    EXPORT_OUT = "exportOut",
    SELECTION_TEXT = 'selectionText',
    FOCUS = 'focus',
    BLUR = 'blur',
    PAGE_VISIBLE = 'pageVisible',
    PAGE_HIDDEN = 'pageHidden',
  }