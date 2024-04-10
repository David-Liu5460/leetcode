/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// function ListNode(val, next) {
//     this.val = (val === undefined) ? 0 : val;
//     this.next = (next === undefined) ? null : next;
// };

// let arr = [1,2,4,2,1];
// function createList(arr) {
//     let start = new ListNode(-1);
//     let cur = start;
//     for(let i = 0; i < arr.length; i++) {
//         cur.next = new ListNode(arr[i]);
//         cur = cur.next;
//     };
//     return start.next;
// };

// function printList(head) {
//     console.log(head);
//     let res = '';
//     let cur = head;
//     while(cur) {
//         res += `${cur.val}->`;
//         cur = cur.next;
//     };
//     return res;
// }

// console.log(printList(createList(arr)));

// function findCenter (head) {
//     let slow = fast = head;
//     while(fast && fast.next != null && fast.next.next) {
//         slow = slow.next;
//         fast = fast.next.next;
//     }
//     return slow;
// };
// function reverse(head) {
//     let pre = null, cur = head;
//     while(cur != null) {
//         let temp = cur.next;
//         cur.next = pre;
//         pre = cur;
//         cur = temp;
//     };
//     return pre;
// };

// var isPalindrome = function(head) {
//     let mid = findCenter(head);
//     console.log(mid.val, mid.next, 233);
//     let newHead = mid.next;
//     mid.next = null;
//     let transverse = reverse(newHead);
//     console.log(printList(head), printList(transverse), 564);

//     while(head && transverse) {
//         // console.log(head.val, newHead.val)
//        if (head.val != transverse.val) {
//         return false;
//        }
//        head = head.next;
//        transverse = transverse.next;
//     };
//     return true;
// };

// console.log(isPalindrome(createList(arr)));

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  let res = [];

  function backtracking(root, sum) {
    if (root.left == null && root.right == null && sum == 0) return true;
    if (root.left == null && root.right == null && sum !== 0) return false;

    if (root.left) {
      sum -= root.left.val;
      if (backtracking(root.left, sum)) return true;
      sum += root.left.val;
    }

    if (root.right) {
      sum -= root.right.val;
      if (backtracking(root.right, sum)) return true;
      sum += root.right.val;
    }

    return false;
  }

  return backtracking(root, targetSum - root.val);
};

console.log(
  hasPathSum(
    new TreeNode(
      5,
      new TreeNode(
        4,
        new TreeNode(11, new TreeNode(7), new TreeNode(2)),
        new TreeNode(8)
      ),
      new TreeNode(
        13,
        new TreeNode(4, new TreeNode(5), new TreeNode(1)),
        new TreeNode(3)
      )
    ),
    22
  )
);
