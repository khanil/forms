import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { isInteger } from '../../utils/validations';

export default class InputOption extends Input {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      model
    } =  this.props;

    return (
      <div className='input-group option-input'>
        <span className='input-group-addon'>{this.props.index + 1}</span>
        <input type="text" className="form-control" value={model.value} onChange={this.changeHandler}/>
        <span className='input-group-btn'>
          <button className='btn btn-default' type='button' onClick={() => { model.removeOption(this.props.index) } }>
            <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
          </button>
        </span>
      </div>
    );
  }
}