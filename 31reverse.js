
//  Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val===undefined ? 0 : val)
  this.next = (next===undefined ? null : next)
}
 
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

function reverse(head) {
    let pre = null, cur = head;
    while(cur != null) {
        let temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp; 
    };

    return pre;
};

var reverseKGroup = function(head, k) {
    let dummy = new ListNode();

    dummy.next = head;
    
    // -1 -> 1 -> 2 -> 3 -> 4 -> 5
    // pre  start     end
    let pre = dummy, end = dummy;
    while(end.next) {
        for(let i = 0; i < k && end != null; i++) {
            end = end.next;
        }

        if (end == null) {
            break;
        }

        let next = end.next;
        end.next = null;
        
        let start = pre.next;
        pre.next = null;
        pre.next = reverse(start);

        start.next = next;

        pre = start;
        end = pre;
    }

    return dummy.next;
};

function createList(arr) {
    let head = new ListNode(arr[0]);
    let current = head;

    for(let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// 打印链表
function printList(head) {
    let current = head;
    let output = '';
    while (current) {
      output += current.val + ' -> ';
      current = current.next;
    }
    console.log(output + 'null');
  }
  
// 测试用例
const list = createList([1, 2, 3, 4, 5]);
const k = 2;
printList(list); // 1 -> 2 -> 3 -> 4 -> 5 -> null
const reversedList = reverseKGroup(list, k);
printList(reversedList); // 2 -> 1 -> 4 -> 3 -> 5 -> null