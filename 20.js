// function TreeNode (val, left, right) {
//     this.val = val;
//     this.left = left;
//     this.right = right;
// };



// 定义一个二叉树的节点类
class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  // 构建一棵二叉树
  function buildBinaryTree() {
    // 创建根节点
    const root = new TreeNode(1);
    
    // 创建左子树
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
  
    // 创建右子树
    root.right = new TreeNode(3);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
  
    // 返回根节点，代表整棵树
    return root;
  }
  
  // 使用函数构建二叉树
  const myTree = buildBinaryTree();
  
  // 输出树结构到控制台
  console.log(JSON.stringify(myTree, null, 2));

  /**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    // 高度和深度
    let height = 0;
    let depth = 0;
    // 递归计算高度和深度
    function calculateHeightAndDepth(node) {
        if (node === null) {
            return { height: 0, depth: 0 };
        }
        const left = calculateHeightAndDepth(node.left);
        const right = calculateHeightAndDepth(node.right);
        const maxChildDepth = Math.max(left.depth, right.depth) + 1;
        const maxChildHeight = Math.max(left.height, right.height);
        return {
            height: maxChildHeight + 1,
            depth: maxChildDepth
        };
    }
    const { height: maxHeight, depth: maxDepth } = calculateHeightAndDepth(root);
    return maxHeight <= maxDepth + 1;

    

};
