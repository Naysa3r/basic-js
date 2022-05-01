const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  
  if (!Array.isArray(arr)) {
    throw new Error("\'arr\' parameter must be an instance of the Array!");
  }
  
  let resultArr = [];

    for (let i = 0 ; i < arr.length; i++) {
      if (arr[i] === '--double-next' && arr[i + 1] !== undefined) {
          resultArr.push(arr[i + 1]);
      } else if (arr[i] === '--double-prev' && arr[i - 1] !== undefined) {
          resultArr.push(arr[i - 1]);
      } else if (arr[i] === '--discard-next' && arr[i + 1] !== undefined) {
            i = i + 2;
      }
       else if (arr[i] === '--discard-prev' && resultArr.length > 0 && arr[i - 1] !== undefined) {
          resultArr.pop();
      } else resultArr.push(arr[i]);
  

    }
    if (resultArr[0] === '--discard-prev' || resultArr[0] === '--double-prev') {
      resultArr.shift();
    }
    if (resultArr[resultArr.length - 1] == "--double-next" || resultArr[resultArr.length - 1] == "--discard-next") {
      resultArr.pop();
    }

  return resultArr;
}

module.exports = {
  transform
};
