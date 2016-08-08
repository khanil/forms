import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { isInteger } from '../../utils/validations';

export default class InputNumber extends Input {

  constructor(props) {
    super(props, isInteger);
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