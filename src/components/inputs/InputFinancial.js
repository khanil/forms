import React, { Component, PropTypes } from 'react';
import Input from './Input';

export default class InputFinancial extends Input {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      value, changeHandler
    } =  this.props.model.toObject();

    return (
      <input type="text" className="form-control" value={value} onChange={changeHandler}/>
    );
  }
}