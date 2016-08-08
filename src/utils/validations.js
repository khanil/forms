/**
 * Here is defined standart input value validation functions
 */


/**
 * checks if value type of integer
 * @param  {any}  value
 * @return {Boolean}
 */
export function isInteger(value) {
  return (/^[0-9]+$/).test(value);
};