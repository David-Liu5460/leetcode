// promise retry 重试

const fetch = url => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // reject('success');
        reject('error')
      }, 2000);
    })
  }
  
  function retry(func, max, timeout) {
    return (...args) => { 
      let count = 0
      return new Promise((resolve, reject) => {
        const attempt = () => func(...args).then(resolve).catch((error) => {
          console.log(`第${count}次尝试`)
          setTimeout(() => {
            if (count < max) {
              attempt();
              count++;
            } else {
              reject(error)
            }
          }, timeout)
          
        });
        attempt();
      });
    };
  }
  
  let retryFunc = retry(fetch, 3, 1000);
  retryFunc('https://alibaba.com').catch((error) => {
    // reject(error);
    console.log(error);
  });
  
  
  
  