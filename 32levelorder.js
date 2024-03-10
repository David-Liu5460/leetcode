function TreeNode(val, left, right) {
    this.val = val == undefined ? 0 : val;
    this.left = left == undefined ? null : left;
    this.right = right == undefined ? null : right;
}


function levelOrder(root) {
    let res = []
    if (root == null ) {
        return res;
    }

    let queue = [root];

    while(queue.length > 0) {
        let len = queue.length;
        let subRes = [];

        for(let i = 0; i < len; i++) {
            let node = queue.shift();
            subRes.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(subRes);
    }

    return res;
};

let left = new TreeNode(9);
let root = new TreeNode(3, left, new TreeNode(20, new TreeNode(15), new TreeNode(7)));

console.log(levelOrder(root));

