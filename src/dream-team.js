const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} members names of the members 
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  let teamname = '';
  const sort = str => str.split('').sort((a, b) => a.localeCompare(b)).join('');
  if (!Array.isArray(members)) {
      return false;
  }
  members.forEach((name) => {
      if (typeof name === 'string') {
        let checkchar = 0;
        while (checkchar !== name.length - 1){
          if (name.charAt(checkchar) !== ' ') {
            teamname = teamname.concat(name.charAt(checkchar));
            break;
          }
          checkchar++;
        }
      }
  })
  return sort(teamname).toUpperCase();
}

module.exports = {
  createDreamTeam
};
