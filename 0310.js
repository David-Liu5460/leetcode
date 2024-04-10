let expressionStore = {
    unit: "distance",
    unitValue: "10",
    unitOperator: "ge",
    eventKey: "scroll",
    combo: {
        unit: "keepTime",
        unitValue: "100",
        unitOperator: "ge",
        eventKey: "relativeStay",
        combo: {
            unit: "distance",
            unitVale: "10",
            unitOperator: "ge",
            eventKey: "scroll"
        }
    }
};
// 如何实现多个事件顺序执行后触发
// function ListNode(val, next) {
//     this.val = val == undefined ? 0 : val;
//     this.next = next == null ? null: next;
// }

// function createList() {
//     let dummy = new ListNode(-1);
//     let cur = dummy;
//     for(let i = 0; i < 5; i++) {
//         cur.next = new ListNode(i);
//         cur = cur.next;
//     };
// };


function find(s, p) {
    // s  abc
    let len1 = s.length, len2 = p.length;
    let left = right = 0, res = [];
    
    if (len2 < len1) {
        return [];
    }

    let temp = new Array(26).fill(0);

    for(let i = 0; i < p.length; i++) {
        temp[p.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    };

    while(right < s.length) {
        temp[s.charCodeAt(right) - 'a'.charCodeAt(0)]--;

        while(temp[s.charCodeAt(right) - 'a'.charCodeAt(0)] < 0) {
            temp[s.charCodeAt(left) - 'a'.charCodeAt(0)]++
            left++;
        };

        if (right - left == len) {
            res.push(left);
        }
    };

    return res;
}
