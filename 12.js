// // 手写驼峰转换
// let obj = {
//     UserName: "toutiao",
//     Group: {
//         GroupName: "douyin"
//     }
// }

// function toSnakeCase(obj){
//    let newObj = {};
//    for(let key in obj) {
//        let s = key.replace(/([A-Z])/g, "_$1").toLowerCase();
//        if(s.charAt(0) === "_") {
//           s = s.substring(1);
//        }
//        if(typeof obj[key] !== "object") {
//           newObj[s] = obj[key];
//        } else {
//           newObj[s] = toSnakeCase(obj[key]);
//        }
//    }
//    return newObj;
// }

// // output:
// // {
// //     user_name: "toutiao",
// //     group: {
// //         group_mame: "douyin"
// //     }
// // }

// console.log(toSnakeCase(obj));

// 手写驼峰转换
let input =  {
    user_name: "toutiao",
    group_name : {
        first_products: "douyin",
    }
}

function toCase(obj) {
    let newObj = {};
    for(let key in obj) {
        let s = key.split("_"); // ['user', 'name']
        // for(let i = 0; i < s.length; i++) {
        //     s[i] = s[i].charAt(0).toUpperCase() + s[i].substring(1);
        // }
        let newStrArr = s.map(i => { return ( i.charAt(0).toUpperCase() + i.substring(1)) })
        let newStr = newStrArr.join("");
        console.log(s);
        if(typeof obj[key] !== "object") {
            newObj[newStr] = obj[key];
        } else {
            newObj[newStr] = toCase(obj[key]);
        }
    }
    return newObj;
}

console.log(toCase(input));


