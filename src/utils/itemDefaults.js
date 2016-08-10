/**
 * Default configuration for created form-items
 */

import * as itemTypes from './itemTypes';
import * as inputType from '../utils/inputTypes';

export const QUESTION = {
  _type: itemTypes.QUESTION,
  title: 'Новый вопрос',
  type: 'string',
  validate: 'true'
  // title: 'Вопрос',
  // type: inputType.INTEGER
}

export const DELIMETER = {
  _type: itemTypes.DELIMETER,
  title: 'Текст разделителя'
}

export const IMAGE = {
  _type: itemTypes.IMAGE,
  title: 'Описание изображения',
  link: ''
}