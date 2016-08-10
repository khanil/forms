import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { isFloat } from '../../utils/validations';

export default class InputFloat extends Input {

  constructor(props) {
    super(props, isFloat);
  }

  render() {
    const {
      model
    } = this.props;

    return (
      <input type="text" className="form-control" value={model.value} onChange={this.changeHandler}/>
    );
  }
}