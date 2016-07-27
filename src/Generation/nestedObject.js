/**
 * Helper functions to work with nested objects
 */

/**
 * search sub object via path
 * @param  {object} parentObj
 * @param  {array}  path
 * @return {object | undefined}
 */
export function find(parentObj, path) {
  //dive into parent object to find sub object
  let subObj = parentObj;

  for (let i = 0; i < path.length; i++) {
    let pathPart = path[i];
    subObj = subObj[pathPart];
    //object can't be found
    if (subObj == undefined) return undefined;
  }

  return subObj;
}

/**
 * returns property value of sub object which can be found by specified pass
 * @param  {object} parentObj
 * @param  {array}  path
 * @param  {string} prop
 * @return {any}
 */
export function getProperty(parentObj, path, prop) {
  let subObj = find(parentObj, path);

  //subObject can't be found
  if (subObj == undefined) return null;

  return subObj[prop];
}

function recursion(obj, path, i, fieldKey, value) {
  if (i === path.length)
    return Object.assign({}, obj, {
      [fieldKey]: value
    });

  const pathPart = path[i];
  if (obj[pathPart] == undefined)
    obj[pathPart] = {};

  return Object.assign( {}, obj, { 
    [ path[i] ]: recursion(obj[ pathPart ], path, i + 1, fieldKey, value)
  });
}

export function setProperty(parentObj, path, prop, value) {
  return recursion(parentObj, path, 0, prop, value);
}