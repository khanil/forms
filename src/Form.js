import React, { Component, PropTypes } from 'react';
import FormComponent from './FormComponent';
import { connect } from 'react-redux';

class Form extends Component {
  constructor(props) {
    super(props);

    const dispatch = this.dispatch = this.props.dispatch;
    const _formKey= this._formKey = this.props.formKey;

    // build property in redux store to store responses of current form
    dispatch({
      type: 'INIT_FORM',
      payload: this._formKey
    });

    console.log('dispatch');
  }

  render() {
    const store = (this.props._forms[this._formKey] === undefined) ? [] : this.props._forms[this._formKey];

    return (
      <FormComponent dispatch={this.props.dispatch} _formKey={this._formKey} scheme={this.props.scheme} store={store} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    _forms: state.forms
  }
};

Form.propTypes = {
  formKey: PropTypes.string.isRequired,
  scheme: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Form);