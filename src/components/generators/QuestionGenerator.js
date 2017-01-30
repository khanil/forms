import React, { Component, PropTypes } from 'react';
import ItemGenerator from './ItemGenerator';
import { inputTypes } from '../../utils';

function getSchemeTemplate() {
  return [
    {
      _type: 'question',
      name: 'title',
      title: 'Текст вопроса',
      type: inputTypes.STRING,
      placeholder: 'Введите вопрос',
      required: 'true'
    },
    {
      _type: 'question',
      name: 'description',
      title: 'Комментарий к вопросу',
      type: inputTypes.PARAGRAPH,
      placeholder: 'Здесь вы можете ввести комментарий к вопросу',
      required: 'false'
    },
    {
      _type: 'question',
      name: 'type',
      title: 'Формат ответа',
      type: inputTypes.SELECT,
      options: inputTypes.INPUT_TYPES,
      placeholder: 'Выберите формат ответа...',
      required: 'true',
      callbacks: {
        [inputTypes.SELECT]: () => this.toggleFields({
          options: [''],
          multiple: 'false'
        })
      }
    },
    {
      _type: 'question',
      name: 'multiple',
      title: 'Разрешить выбор нескольких ответов из списка',
      type: inputTypes.SELECT,
      options: [
        {
          label: 'Да',
          value: 'true'
        },
        {
          label: 'Нет',
          value: 'false'
        }
      ],
      required: 'true',
      callbacks: {
        ['true']: () => this.toggleFields({
          ['selectmax']: ''
        })
      }
    },
    {
      _type: 'question',
      name: 'selectmax',
      title: 'Максимальное количество выбранных вариантов',
      type: inputTypes.INTEGER,
      placeholder: 'Оставить пустым, чтобы не ограничивать'
    },
    {
      _type: 'question',
      name: 'options',
      title: 'Варианты ответа',
      type: inputTypes.OPTIONS
    }
    // {
    //   _type: 'question',
    //   name: 'required',
    //   title: 'Обязательный?',
    //   type: inputTypes.SWITCH,
    //   options: [
    //     {
    //       value: 'true',
    //       label: 'Да'
    //     },
    //     {
    //       value: 'false',
    //       label: 'Нет'
    //     }
    //   ]
    // }
  ]
}

/**
 * Presentational component that renders input fields specified in fields prop
 * @param {object} fields object passed from store, specified which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {func} addField inserts new input field in store
 * @param {func} removeField removes input field from store
 * @param {string} path util passed in setFieldValue and getFieldValue func
 */
export default class QuestionGenerator extends ItemGenerator {
  constructor(props) {
    super(props, getSchemeTemplate, 'question');
    this.componentWillMount = super.componentWillMount;
    this.componentWillReceiveProps = super.componentWillReceiveProps;
  }

  render() {
    return super.render();
  }
}

QuestionGenerator.propTypes = {
  fields: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  addField: PropTypes.func,
  removeField: PropTypes.func
}
