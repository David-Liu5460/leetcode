

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

function findCenter(head) {
    let slow = fast = head;

    while(fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    };

    return slow;
};
// l0 -> L1 -> ... -> Ln
// L0 -》 Ln -> ... -> 

function tanversal(head) {
    // L0 -> L1 -> L2 -> ....
    let mid = findCenter(head);

    let newHead = mid.next;
    mid.next = null;

    let reversedHead = reverse(newHead);
    // Ln -> Ln-1 -> ...

    let cur1  = head, cur2 = reversedHead;

    while(cur2.next) {
        let temp = cur1.next;
        cur1.next = cur2;
        cur1 = temp;

        temp = cur2.next;
        cur2.next = cur1;
        cur2 = temp;
    };

    return head;
}