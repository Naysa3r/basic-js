const { NotImplementedError } = require('../extensions/index.js');

/**
 * Calculate turns number and time (in seconds) required
 * to solve puzzle
 * 
 * @param {Number} disks number of disks
 * @param {Number} turnsSpeed speed (in turns/hour)
 * @return {Object} object with props turns (number of turns)
 * and seconds (time in seconds)
 *
 * @example
 * 
 * calculateHanoi(9, 4308) => { turns: 511, seconds: 427 }
 *
 */
function calculateHanoi(disksNumber, turnsSpeed) {
  let turnspeed = turnsSpeed / 3600; // turns per second
  let minSteps = Math.pow(2, disksNumber) - 1; // minimal steps
  let result = {};
  result["turns"] = minSteps;
  result["seconds"] = Math.floor(minSteps / turnspeed);
  return result;
}

module.exports = {
  calculateHanoi
};
