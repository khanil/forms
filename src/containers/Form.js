import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindFunctions } from '../utils';
import FormComponent from '../components/FormComponent';
import { initForm, handleUserInput } from '../actions';
import CComponent from '../components/CComponent';

/**
 * Container component that provides data, callbacks and scheme for FormComponent
 * @param {string} formKey name of object that will store form responses in redux-state
 * @param {object} scheme
 */
class Form extends CComponent {
  constructor(props) {
    super(props);
    this.formKey = this.props.formKey;

    bindFunctions.call(this, ['submitHandler', 'setFieldValue', 'getFieldValue']);
  }

  componentWillMount() {
    // make object in redux store to store responses of current form
    this.props.initForm(this.formKey, this.props.initialState);
  }

  /**
   * handles user input into form fields
   * @param  {string} fieldKey [points at element that stores field value]
   * @param  {any} value    [new value]
   */
  setFieldValue(localPath, fieldKey, value) {
    this.props.handleUserInput(this.formKey, fieldKey, localPath, value);
  }

  /**
   * returns the field value from store by field key
   * @param  {string} fieldKey [points at element that stores field value]
   * @return {any}          [stored value]
   */
  getFieldValue(localPath, fieldKey) {
    const responsesStore = this.props.forms.get(this.formKey);
    if (responsesStore == undefined) return;
    const path = localPath ? localPath.split('.') : [];
    path.push(fieldKey)
    return responsesStore.getIn(path);
  }

  submitHandler() {
    const isFormValid = this.refs.formComponent.checkFormValidity();
    console.log(`Form valid? -${isFormValid}`);

    if (!isFormValid) {
      alert('Во время заполнения полей возникли ошибки.\nПроверьте правильность заполнения полей и повторите отправку.');
      return;
    }

    const responses = this.props.forms.get(this.formKey).toJS();

    if (!this.props.onSubmit)
      console.warn('onSubmit function does\'nt provided as a prop to Form component');
    else
      this.props.onSubmit(responses);

    console.log(JSON.stringify(responses, "", 4));
  }

  render() {
    //store doesn't set up yet
    if (this.props.scheme === undefined || this.props.forms.get(this.formKey) === undefined)
      return null;

    return (
      <FormComponent
        ref='formComponent'
        index='form'
        scheme={this.props.scheme}
        setFieldValue={this.setFieldValue}
        getFieldValue={this.getFieldValue}
        disabled={this.props.disabled}
      />
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
    forms: state.forms,
    scheme: ownProps.scheme ? ownProps.scheme : state.forms.get('scheme')
  }
};

const mapDispatchToProps = {
  initForm,
  handleUserInput
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Form);