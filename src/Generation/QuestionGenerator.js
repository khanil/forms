import React, { Component, PropTypes } from 'react';
import FormComponent from './../FormComponent';

const scheme = {
  items: [
    {
      _type: 'question',
      name: 'title',
      title: 'Текст вопроса',
      type: 'integer'
    },
    {
      _type: 'question',
      name: 'type',
      title: 'Формат ответа',
      type: 'integer'
    },
    {
      _type: 'question',
      name: 'description',
      title: 'Описание',
      type: 'integer'
    },
    {
      _type: 'question',
      name: 'required',
      title: 'Обязательный?',
      type: 'integer'
    }
  ]
}

export default class QuestionGenerator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FormComponent scheme={scheme} path={this.props.path} setFieldValue={this.props.setFieldValue} getFieldValue={this.props.getFieldValue}/>
    );
  }
}

QuestionGenerator.propTypes = {
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}
