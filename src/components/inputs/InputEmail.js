import React, { Component, PropTypes } from 'react';
import Input from './Input';

export default class InputEmail extends Input {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      value, changeHandler, placeholder, disabled
    } =  this.props.model.toObject();

    return (
      <div className='input-group'>
        <span className="input-group-addon">
          <i className="fa fa-envelope" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          className="form-control"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={changeHandler}
        />
      </div>
    );
  }
}