import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { isFinancial } from '../../utils/validations';

export default class InputFinancial extends Input {

  constructor(props) {
    super(props, isFinancial);
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