/**
 * Default configuration for created form-items
 */

import * as itemTypes from './itemTypes';
import * as inputType from '../utils/inputTypes';

export const QUESTION = {
  _type: itemTypes.QUESTION,
  title: 'Новый вопрос',
  type: inputType.EMAIL,
  required: true
}

export const DELIMETER = {
  _type: itemTypes.DELIMETER,
  title: ''
}

export const IMAGE = {
  _type: itemTypes.IMAGE,
  title: '',
  link: ''
}

//TODO: kkal
export function get(type) {
  let item;
  switch( type.toLowerCase() ) {
    case itemTypes.QUESTION :
      item = QUESTION;
      break;
    case itemTypes.DELIMETER :
      item = DELIMETER;
      break;
    case itemTypes.IMAGE :
      item = IMAGE;
      break;
    default:
      return null;
  }
  item._id = Math.random();
  return item;
}