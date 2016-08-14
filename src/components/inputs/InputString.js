import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { isInteger } from '../../utils/validations';

export default class InputString extends Input {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      model
    } =  this.props;

    return (
      <input type="text" className="form-control" value={model.value} onChange={this.changeHandler}/>
    );
  }
}