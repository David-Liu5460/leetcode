// 实现lodash.get
function get(object, path, defaultValue) {
    // 将路径转换为数组，支持点分割和方括号两种形式
    function toPath(path) {
      if (Array.isArray(path)) {
        return path;
      }
      console.log(path.replace(/\[(\w+)\]/g, '.$1').split('.').filter(Boolean), 211)
      return path.replace(/\[(\w+)\]/g, '.$1').split('.').filter(Boolean);
    }
  
    // 逐级获取路径上的值
    const pathArray = toPath(path);
    let result = object;
  
    for (let i = 0; i < pathArray.length; i++) {
      if (result == null) { // null 或 undefined
        return defaultValue;
      }
      result = result[pathArray[i]];
    }
  
    // 如果最终结果是 undefined，则返回默认值，否则返回结果
    return result === undefined ? defaultValue : result;
  }
  
  // 使用示例
  const object = { 'a': [{ 'b': { 'c': 3 } }] };
  console.log(get(object, 'a[0].b.c')); // 输出: 3
  console.log(get(object, ['a', '0', 'b', 'c'])); // 输出: 3
  console.log(get(object, 'a.b.c', 'default')); // 输出: 'default'
  