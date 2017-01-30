import React, { Component, PropTypes } from 'react';
import Input from './Input';

export default class InputParagraph extends Input {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      value, changeHandler, placeholder, disabled
    } =  this.props.model.toObject();

    return (
      <textarea disabled={disabled} type="text" rows='3' className="form-control" value={value} onChange={changeHandler} placeholder={placeholder}/>
    );
  }
}