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
      required: true
    },
    {
      _type: 'question',
      name: 'type',
      title: 'Формат ответа',
      type: inputTypes.SELECT,
      options: inputTypes.INPUT_TYPES,
      placeholder: 'Выберите формат ответа...',
      required: true,
      callbacks: {
        [inputTypes.SELECT]: () => this.toggleField('options', [' '])
      }
    },
    {
      _type: 'question',
      name: 'options',
      title: 'Варианты ответа',
      type: inputTypes.OPTIONS
    },
    {
      _type: 'question',
      name: 'description',
      title: 'Описание',
      type: inputTypes.STRING
    },
    {
      _type: 'question',
      name: 'required',
      title: 'Обязательный?',
      type: inputTypes.SELECT,
      options: [
        {
          value: true,
          label: 'Да'
        },
        {
          value: false,
          label: 'Нет'
        }
      ]
    }
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
    super(props, getSchemeTemplate);
    this.componentWillMount = super.componentWillMount;
    this.componentWillReceiveProps = super.componentWillReceiveProps;
  }

  render() {
    return (
      <div>
        {super.render()}
        <button type="button" className="btn btn-default" onClick={
          () => {this.props.addField('required')}
        }>+</button>
        <button type="button" className="btn btn-default" onClick={
          () => {this.props.removeField('required')}
        }>-</button>
      </div>
    )
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
