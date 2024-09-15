const asyncAdd = async (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return Promise.reject('Argumenty muszą mieć typ number!');
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a + b);
      }, 100);
    });
  };
  
  const asyncSum = async (...args) => {
    if (args.length === 0) return 0;
    if (args.length === 1) return args[0];
  
    const sumArray = async (arr) => {
      if (arr.length === 1) return arr[0];
  
      const promises = [];
      for (let i = 0; i < arr.length; i += 2) {
        if (i + 1 < arr.length) {
          promises.push(asyncAdd(arr[i], arr[i + 1]));
        } else {
          promises.push(Promise.resolve(arr[i]));
        }
      }
      
      const results = await Promise.all(promises);
      return sumArray(results);
    };
  
    return sumArray(args);
  };
  
  const measureTime = async (fn, ...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    return {
      result,
      time: end - start
    };
  };
  
  const testFunction = async () => {
    const data = Array.from({ length: 100 }, (_, i) => i + 1);
  
    const { result, time } = await measureTime(asyncSum, ...data);
  
    console.log(`Result: ${result}`);
    console.log(`Time: ${time} ms`);
  };
  
  testFunction();
  