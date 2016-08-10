import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FormComponent from '../components/FormComponent';
import { initForm, handleUserInput } from '../actions';

/**
 * Container component that provides data, callbacks and scheme for FormComponent
 * @param {string} formKey name of object that will store form responses in redux-state
 * @param {object} scheme
 */
class Form extends Component {
  constructor(props) {
    super(props);
    this._formKey = this.props.formKey;

    // make object in redux store to store responses of current form
    this.props.initForm(this._formKey, this.props.initialState);

    this.submitHandler = this.submitHandler.bind(this);
    this.setFieldValue = this.setFieldValue.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
  }

  /**
   * handles user input into form fields
   * @param  {string} fieldKey [points at element that stores field value]
   * @param  {any} value    [new value]
   */
  setFieldValue(localPath, fieldKey, value) {
    this.props.handleUserInput(this._formKey, fieldKey, localPath, value);
  }

  /**
   * returns the field value from store by field key
   * @param  {string} fieldKey [points at element that stores field value]
   * @return {any}          [stored value]
   */
  getFieldValue(localPath, fieldKey) {
    // if (this.props.form == undefined) return undefined;
    // return this.state.forms[this._formKey][fieldKey];
    const store = (this.props._forms[this._formKey] === undefined) ? [] : this.props._forms[this._formKey];
    return store[fieldKey];
  }

  submitHandler() {
    const isFormValid = this.refs.formComponent.checkFormValidity();
    console.log(`Form valid? -${isFormValid}`);

    if (!isFormValid)
      return;

    if (!this.props.onSubmit)
      console.error('onSubmit function does\'nt provided as a prop to Form component');
    else
      this.props.onSubmit(this.props._forms[this._formKey]);

    alert(JSON.stringify(this.props._forms[this._formKey], "", 4));
  }

  render() {
    return (
      <div>
        <FormComponent ref='formComponent' scheme={this.props.scheme} setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />
        <button type="button" className="btn btn-primary" onClick={this.submitHandler}>Отправить</button>
      </div>
    );
  }
}

Form.propTypes = {
  formKey: PropTypes.string.isRequired,
  scheme: PropTypes.object.isRequired,
  initialState: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    // form: state.forms[ownProps._formKey],
    _forms: state.forms,
    scheme: state.forms['scheme']
  }
};

const mapDispatchToProps = {
  initForm,
  handleUserInput
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);