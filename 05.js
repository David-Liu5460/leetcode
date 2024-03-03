// 展平

/** 数组结构数据 */
const arrayData = [
    { id: 2, title: '中国', parent_id: 0 },
    { id: 3, title: '广东省', parent_id: 2 },
    { id: 4, title: '广州市', parent_id: 3 },
    { id: 5, title: '天河区', parent_id: 4 },
    { id: 6, title: '湖南省', parent_id: 2 },
    { id: 1, title: '俄罗斯', parent_id: 0 }
];

// output
// 
// var buildTree = () => {
//     const tree = [];
//     const map = {};
//     arrayData.forEach(node => {
//       const { id, title, parent_id } = node;
//       map[id] = node;
//       if (!map[parent_id]) {
//         tree.push(node);
//       } else {
//         map[parent_id].children = map[parent_id].children || [];
//         map[parent_id].children.push(node);
//       }
//     });
//     return tree;
    
// }

/**
 * 递归查找添加children
 * @param {数组数据} data 
 * @param {存放返回结果} result 
 * @param {父id} pid 
 */
function getChildren(data, result, pid) {
    for (const item of data) {
      if (item.parent_id === pid) {
        const newItem = { children: [], ...item }
        result.push(newItem)
        getChildren(data, newItem.children, item.id)
      }
    }
  }
  
  /**
   * 转化方法
   * @param {数组数据} data 
   * @param {父id} pid 
   * @returns 
   */
  function arrayToTree(data, pid) {
    let result = []
    getChildren(data, result, pid)
    return result
  }
  
  console.log(arrayToTree(arrayData, 0));
  

// var buildTree = (array) => {
//     const tree = [];
//     const map = {};
//     array.forEach(node => {
//       const { id } = node;
//       map[id] = node;
//     });

//     array.forEach(item => {
//         if()
//     })
// }

const buildTree = (arrayData) => {
    // const obj = {};
    const obj = arrayData.reduce((prev, cur, index, arr) => {
        prev[cur.id] = cur;
        return prev;
    }, {});

    // debugger

    const result = [];

    for(let i = 0; i < arrayData.length; i++ ) {
        const item = arrayData[i];
       
        if (item.parent_id == 0) {
            result.push(item);
            continue;
        };
        
        // let obj = { 1: {}, 2: {}} xxx
        if (item.parent_id in obj) {
            // debugger
            const parentId = item.parent_id;
            if(!obj[parentId].children) (
                obj[parentId].children = []
            )
            obj[parentId].children.push(item);
        }
    }
    return result
}

console.log(buildTree(arrayData));

let flatten = (arr) => {
    if(!Array.isArray(arr)) return [];
    return arr.reduce((prev, cur, index, arr) => {
        const { children, ...rest } = cur;
        return prev.concat([{...rest}], flatten(children));
        // if (children) {
        //     prev.push(...flatten(children));

        // } else {
        //     prev.push(rest);
        // }
    }, [])
}

// console.log(flatten(buildTree(arrayData)));

const arrayData1 = [
    { id: 2, title: '中国', parent_id: 0 },
    { id: 3, title: '广东省', parent_id: 2 },
    { id: 4, title: '广州市', parent_id: 3 },
    { id: 5, title: '天河区', parent_id: 4 },
    { id: 6, title: '湖南省', parent_id: 2 },
    { id: 1, title: '俄罗斯', parent_id: 0 }
];

const buildNewTree = (arrayData) => {
    let res = [];
    // 递归 去data里面找parent_id为pid的节点并且加到res数组;
    getChildren(arrayData, res, 0);
    return res;
}

// 递归：去data里面找parent_id为pid的节点并且加到其children数组;
const getChildren = (arrayData, res, pid) => {
    arrayData.forEach(item=> {
        if (item.parent_id === pid) {
            const newItem = { children: [], ...item }
            res.push(newItem)
            getChildren(arrayData, newItem.children, item.id);
        } else {
            return
        }
    });
} 
  