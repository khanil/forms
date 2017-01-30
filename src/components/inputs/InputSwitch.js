import React, { Component, PropTypes } from 'react';
import Input from './Input';

export default class InputSwitch extends Input {

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    const changeHandler = this.props.model.get('changeHandler');
    const value = e.target.checked ? 'true' : 'false';

    changeHandler(value);
  }

  render() {
    const {
      value, placeholder, disabled
    } =  this.props.model.toObject();

    return (
      <label className="switch">
        <input type="checkbox" checked={value === 'true'} onChange={this.changeHandler} />
        <div className="slider round"></div>
      </label>
    );
  }
}