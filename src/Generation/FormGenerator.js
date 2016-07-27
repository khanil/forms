import React, { Component, PropTypes } from 'react';
import FormComponent from './../FormComponent';
import QuestionGenerator from './QuestionGenerator';
import { connect } from 'react-redux';
import * as nestedObject from './nestedObject';
import Form from './../Form';

const scheme = {
  items: [
    {
      _type: 'question',
      name: 'title',
      title: 'Имя формы',
      type: 'integer'
    },
    {
      _type: 'question',
      name: 'description',
      title: 'Описание формы',
      type: 'integer'
    }
  ]
}

class FormGenerator extends Component {
  constructor(props) {
    super(props);

    this.dispatch = this.props.dispatch;
    this._formKey = 'scheme';

    // make object in redux store to store responses of current form
    this.dispatch({
      type: 'INIT_FORM',
      payload: this._formKey
    });

    this.setFieldValue = this.setFieldValue.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
  }

  /**
   * returns the field value from store by field key
   * @param  {string} fieldKey [points at element that stores field value]
   * @return {any}          [stored value]
   */
  getFieldValue(localPath, fieldKey) {
    const store = this.props._scheme;

    const path = localPath ? localPath.split('.') : [];

    return nestedObject.getProperty(store, path, fieldKey);
  }

  /**
   * handles user input into form fields
   * @param  {string} fieldKey [points at element that stores field value]
   * @param  {any} value    [new value]
   */
  setFieldValue(localPath, fieldKey, value) {
    this.dispatch({
      type: 'FIELD_VALUE_CHANGED',
      payload: {
        formKey: this._formKey,
        fieldKey,
        localPath,
        value
      }
    });
  }

  render() {
    return (
      <div>
        <FormComponent scheme={scheme} setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />
        <QuestionGenerator path='items.0' setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />
        <QuestionGenerator path='items.1' setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let _scheme = nestedObject.find(state, ['forms', 'scheme']);
  //form state didn't mount yet
  if (_scheme == undefined)
    _scheme = {};

  return {
    _scheme
  }
};

export default connect(mapStateToProps)(FormGenerator);