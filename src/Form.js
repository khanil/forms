import React, { Component, PropTypes } from 'react';
import FormComponent from './FormComponent';
import { connect } from 'react-redux';

/**
 * Container component that provides data and callbacks for FormComponent
 * @param {string} formKey name of object that will store form responses in redux-state
 */
class Form extends Component {
  constructor(props) {
    super(props);

    this.dispatch = this.props.dispatch;
    this._formKey = this.props.formKey;

    // make object in redux store to store responses of current form
    this.dispatch({
      type: 'INIT_FORM',
      payload: this._formKey
    });

    this.setFieldValue = this.setFieldValue.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
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
        localPath,
        fieldKey,
        value
      }
    });
  }

  /**
   * returns the field value from store by field key
   * @param  {string} fieldKey [points at element that stores field value]
   * @return {any}          [stored value]
   */
  getFieldValue(localPath, fieldKey) {
    const store = (this.props._forms[this._formKey] === undefined) ? [] : this.props._forms[this._formKey];
    return store[fieldKey]
  }

  render() {
    return (
      <FormComponent scheme={this.props.scheme} setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />
    );
  }
}

Form.propTypes = {
  formKey: PropTypes.string.isRequired,
  scheme: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    _forms: state.forms
  }
};


export default connect(mapStateToProps)(Form);