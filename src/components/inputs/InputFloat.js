import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { isFloat } from '../../utils/validations';

export default class InputFloat extends Input {

  constructor(props) {
    super(props, isFloat);
  }

  render() {
    const {
      value, changeHandler, placeholder
    } =  this.props.model.toObject();

    return (
      <input type="text" className="form-control" value={value} onChange={changeHandler} placeholder={placeholder}/>
    );
  }
}