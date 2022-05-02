const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {

  alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  constructor(notReverse = true) {
      this.notReverse = notReverse;
  }

  encrypt(message, key) {

    if (!message || !key) {
        throw new Error("Incorrect arguments!");
    }

      let mes = message.toUpperCase();
      let mesArrIndex = []; // -1 , when whitespace and undefined symbols
      let keyArrIndex = [];

      // generate mesArrIndex
      for (let i = 0; i < mes.length; i++) {
          mesArrIndex.push(this.alphabet.indexOf(mes[i]));
      }

      // create key by message value
      let testkey = message.match(/[^_\W]+/g).join('');
      if (key.length > testkey.length) {
          key = key.slice(0, testkey.length);
      } else if (key.length < testkey.length) {
        let keylength = key.length;
          for (let i = 0; i < testkey.length - keylength; i++) {
              key = key.concat(key[i]);
          }
      }

      key = key.toUpperCase();
      // generate keyArrIndex
      for (let i = 0; i < key.length; i++) {
          keyArrIndex.push(this.alphabet.indexOf(key[i]));
      }
      
      // Function for creating cypher
      let createCypher = (messageArray, keyArray) => {
          let fltMessageArray = messageArray.filter(function(e) { return e !== (-1) });
          let cypher = [];
          for (let i = 0; i < fltMessageArray.length; i++) {
              cypher.push(fltMessageArray[i] + keyArray[i] >= this.alphabet.length ? fltMessageArray[i] + keyArray[i] - this.alphabet.length : fltMessageArray[i] + keyArray[i])
          }
          return cypher;
      }

      let toCypherWord = (messageArray, cypher) => {
          let cypherWord = cypher.map(el => this.alphabet[el]);

          Array.prototype.insert = function ( index, item ) {
              this.splice( index, 0, item );
          };
          for (let i = 0; i < messageArray.length; i++) {
              if (messageArray[i] === -1) {
                  cypherWord.insert(i, mes[i])
              }
          }
          if (!this.notReverse) {
              cypherWord.reverse();
          }
          return cypherWord.join('');
      }
      // console.log(toCypherWord(mesArrIndex ,createCypher(mesArrIndex, keyArrIndex)));
      // console.log(this.alphabet.length)

      return toCypherWord(mesArrIndex ,createCypher(mesArrIndex, keyArrIndex));

  }
  decrypt(message, key) {

    if (!message || !key) {
        throw new Error("Incorrect arguments!");
    }

      let mes = message.toUpperCase();
      let mesArrIndex = []; // -1 , when whitespace and undefined symbols
      let keyArrIndex = [];

      // generate mesArrIndex
      for (let i = 0; i < mes.length; i++) {
          mesArrIndex.push(this.alphabet.indexOf(mes[i]));
      }

      // create key by message value
      let testkey = message.match(/[^_\W]+/g).join('');
      if (key.length > testkey.length) {
          key = key.slice(0, testkey.length);
      } else if (key.length < testkey.length) {
        let keylength = key.length;
          for (let i = 0; i < testkey.length - keylength; i++) {
              key = key.concat(key[i]);
          }
      }

      key = key.toUpperCase();
      // generate keyArrIndex
      for (let i = 0; i < key.length; i++) {
          keyArrIndex.push(this.alphabet.indexOf(key[i]));
      }

      // decode cypher
      let decodeCypher = (messageArray, keyArray) => {
          let fltMessageArray = messageArray.filter(function(e) { return e !== (-1) });
          let decode = [];
          for (let i = 0; i < fltMessageArray.length; i++) {
              decode.push(fltMessageArray[i] - keyArray[i] < 0 ? fltMessageArray[i] + this.alphabet.length - keyArray[i] : fltMessageArray[i] - keyArray[i]);
          }
          return decode;
      }

      let toDecodeWord = (messageArray, decode) => {
          let decodeWord = decode.map(el => this.alphabet[el]);

          Array.prototype.insert = function ( index, item ) {
              this.splice( index, 0, item );
          };
          for (let i = 0; i < messageArray.length; i++) {
              if (messageArray[i] === -1) {
                  decodeWord.insert(i, mes[i])
              }
          }
          if (!this.notReverse) {
              decodeWord.reverse();
          }
          return decodeWord.join('');
      }
      // console.log(toDecodeWord(mesArrIndex ,decodeCypher(mesArrIndex, keyArrIndex)));
      return toDecodeWord(mesArrIndex ,decodeCypher(mesArrIndex, keyArrIndex));
      // console.log(decodeCypher(mesArrIndex, keyArrIndex));
  }
}

module.exports = {
  VigenereCipheringMachine
};
