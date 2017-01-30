/**
 * Here is defined input field types
 */

export const INTEGER = 'integer';
export const FLOAT = 'float';
export const STRING = 'string';
export const DATE = 'date';
export const TIME = 'time';
export const DATETIME = 'datetime';
export const PARAGRAPH = 'paragraph';
export const FINANCIAL = 'financial';
export const SELECT = 'select';
export const PHONE = 'phone';

//supporting input type for form generation
export const OPTIONS = 'options';
export const IMAGE = 'image';

export const INPUT_TYPES = [
  {
    value: 'string',
    label: 'Строка'
  },
  {
    value: 'integer',
    label: 'Целое число'
  },
  {
    value: 'float',
    label: 'Дробное число'
  },
  {
    value: 'date',
    label: 'Дата'
  },
  {
    value: 'time',
    label: 'Время'
  },
  {
    value: 'datetime',
    label: 'Дата и время'
  },
  {
    value: 'paragraph',
    label: 'Параграф'
  },
  {
    value: 'financial',
    label: 'Денежное значение'
  },
  {
    value: 'select',
    label: 'Выбор из списка'
  },
  {
    value: PHONE,
    label: 'Телефон'
  }
];