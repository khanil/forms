import React, { Component, PropTypes } from 'react';
import CComponent from '../CComponent';

/**
 * React presentational component which renders form delimeter based on model
 * @param  {object} model
 */
export default class Delimeter extends CComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title
    } = this.props.model.toObject();

    const label = title ? <label className='control-label super-form__item-title'>{title}</label> : null;

    return (
      <div className='super-form__item super-form__item_type_delimeter'>
        {label}
        <hr/>
      </div>
    );
  }
}

Delimeter.propTypes = {
  model: PropTypes.object.isRequired
}