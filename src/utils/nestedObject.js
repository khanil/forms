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
  if (i === path.length) {
    if (Array.isArray(obj)) {
      const newArray = obj.slice();
      newArray[fieldKey] = value;
      return newArray
    }

    return Object.assign({}, obj, {
      [fieldKey]: value
    });
  }

  const pathPart = path[i];
  if (obj[pathPart] == undefined)
    obj[pathPart] = {};

  if (Array.isArray(obj)) {
    const newArray = obj.slice();
    newArray[ path[i] ] = recursion(obj[ pathPart ], path, i + 1, fieldKey, value);
    return newArray;
  }

  return Object.assign( {}, obj, { 
    [ path[i] ]: recursion(obj[ pathPart ], path, i + 1, fieldKey, value)
  });
}

export function setProperty(parentObj, path, prop, value) {
  return recursion(parentObj, path, 0, prop, value);
}

function recursionDel(obj, path, i, prop) {
  if (i === path.length) {
    if (Array.isArray(obj)) {
      const newArray = obj.slice();
      newArray.splice(prop, 1);
      return newArray;
    } else {
      const newObj = Object.assign({}, obj);
      delete newObj[prop];
      return newObj;
    }
  }

  const pathPart = path[i];

  if (Array.isArray(obj)) {
    const newArray = obj.slice();
    newArray[ path[i] ] = recursionDel(obj[ pathPart ], path, i + 1, prop);
    return newArray;
  }

  return Object.assign( {}, obj, { 
    [ path[i] ]: recursionDel(obj[ pathPart ], path, i + 1, prop)
  });
}

export function removeProperty(parentObj, path, prop) {
  return recursionDel(parentObj, path, 0, prop);
  // const subObj = find(parentObj, path);

  // if (Array.isArray(subObj)) {
  //   subObj.splice(prop, 1);
  // } else {
  //   delete subObj[prop];
  // }

  // console.log('parentObj:');
  // return Object.assign({}, parentObj);
}