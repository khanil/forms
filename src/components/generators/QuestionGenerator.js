import React, { Component, PropTypes } from 'react';
import ItemGenerator from './ItemGenerator';
import { inputTypes } from '../../utils';

function getSchemeTemplate() {
  return [
    {
      _type: 'question',
      name: 'title',
      title: 'Текст вопроса',
      type: inputTypes.INTEGER
    },
    {
      _type: 'question',
      name: 'type',
      title: 'Формат ответа',
      type: inputTypes.SELECT,
      options: inputTypes.INPUT_TYPES,
      placeholder: 'Выберите формат ответа...',
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
          value: 'true',
          label: 'Да'
        },
        {
          value: 'false',
          label: 'Нет'
        }
      ]
    }
  ]
}

/**
 * Presentational component that renders input fields specified in fields prop
 * @param {object} fields points which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {string} path
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
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}
