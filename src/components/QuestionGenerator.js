import React, { Component, PropTypes } from 'react';
import FormComponent from './FormComponent';
import * as nestedObject from '../utils/nestedObject';
import * as inputType from '../utils/inputTypes';

const optionsArr = [];
for (let key in inputType) {
  optionsArr.push(inputType[key]);
}

const schemeTemplate = [
  {
    _id: 0,
    _type: 'question',
    name: 'title',
    title: 'Текст вопроса',
    type: inputType.INTEGER
  },
  {
    _id: 1,
    _type: 'question',
    name: 'type',
    title: 'Формат ответа',
    type: inputType.SELECT,
    options: optionsArr,
    placeholder: 'Выберите формат ответа...'
  },
  {
    _id: 2,
    _type: 'multiple',
    name: 'options',
    title: 'Варианты ответа'
  },
  {
    _id: 3,
    _type: 'question',
    name: 'description',
    title: 'Описание',
    type: inputType.STRING
  },
  {
    _id: 4,
    _type: 'question',
    name: 'required',
    title: 'Обязательный?',
    type: inputType.STRING
  }
]

/**
 * Presentational component that renders input fields specified in fields prop
 * @param {object} fields points which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {string} path
 */
export default class QuestionGenerator extends Component {
  constructor(props) {
    super(props);
    this.buildScheme = this.buildScheme.bind(this);
  }

  /**
   * builds scheme object that include items specified in fields object
   * @return {obj} scheme
   */
  buildScheme() {
    const fields = this.props.fields;
    const scheme = { items: [] };

    //if template item name was found in fields object, item adds to scheme object
    scheme.items = schemeTemplate.filter((item, i) => (fields[item.name] !== undefined));
    return scheme;
  }

  render() {
    return (
      <div>
        <FormComponent scheme={this.buildScheme()} path={this.props.path} setFieldValue={this.props.setFieldValue} getFieldValue={this.props.getFieldValue}/>

        <button type="button" className="btn btn-default" onClick={
          () => {this.props.addField('required')}
        }>+</button>
        <button type="button" className="btn btn-default" onClick={
          () => {this.props.removeField('required')}
        }>-</button>
      </div>
    );
  }
}

QuestionGenerator.propTypes = {
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}
