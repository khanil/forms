import React, { Component, PropTypes } from 'react';
import CComponent from './CComponent';
import { bindFunctions } from '../utils';

export default class ControlButtons extends CComponent {
  constructor(props) {
    super(props);
    bindFunctions.call(this, ['swapUp', 'swapDown']);
  }

  swapUp() {
    if (this.props.first)
      return;

    const {
      index,
      swapItems
    } = this.props;

    swapItems(index - 1, index);
  }

  swapDown() {
    if (this.props.last)
      return;

    const {
      index,
      swapItems
    } = this.props;

    swapItems(index, index + 1);
  }

  render() {
    const {
      index,
      first,
      last,
      copyItem,
      removeItem,
    } = this.props;

    return (
      <div className='form-generator-item__control-btn-group btn-group'>
        <button type="button" className="btn btn-default" onClick={this.swapUp} disabled={first}>
          <span className='glyphicon glyphicon-arrow-up' aria-hidden='true'></span>
        </button>
        <button type="button" className="btn btn-default" onClick={this.swapDown} disabled={last}>
          <span className='glyphicon glyphicon-arrow-down' aria-hidden='true'></span>
        </button>
        <button type="button" className="btn btn-default" onClick={copyItem}>
          <span className='glyphicon glyphicon-duplicate' aria-hidden='true'></span>
        </button>
        <button type="button" className="btn btn-default" onClick={removeItem}>
          <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
        </button>
      </div>
    );
  }
}

ControlButtons.propTypes = {
  
}