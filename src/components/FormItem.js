import React, { Component, PropTypes } from 'react';
import ControlButtons from './ControlButtons';
import CComponent from './CComponent';

export default class FormItem extends CComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      index
    } = this.props;

    return (
      <div className='form-generator-item'>
        <span className='form-generator-item__serial-number'>{`# ${index + 1}`}</span>
        <ControlButtons {...this.props}/>
        {this.props.children}
      </div>
    );
  }
}

FormItem.propTypes = {
  
}