const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  const createAdditionArr = () => {
      let arr = [];
      if (options.additionRepeatTimes === undefined) {
          arr.push(options.addition === undefined ? '' : String(options.addition));
      } else {
          for (let i = 0; i < options.additionRepeatTimes; i++) {
              arr.push(String(options.addition));
          }
      }
      return arr;
  }
  const createStrArr = (str, additionArr) => {
      let arr = [];
      if (additionArr === undefined) additionArr = '';
      if (options.repeatTimes === undefined) {
          arr.push(String(str) + additionArr);
      } else {
          for (let i = 0; i < options.repeatTimes; i++) {
              arr.push(String(str) + additionArr);
          }
      }
      return arr;
  }

  if (options.separator === undefined) options.separator = '+';
  if (options.additionSeparator === undefined) options.additionSeparator = '|';

  let additionString = createAdditionArr().join(options.additionSeparator);
  let strString = createStrArr(str, additionString).join(options.separator);
  return strString;
}

module.exports = {
  repeater
};
