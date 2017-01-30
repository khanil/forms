import React, { Component, PropTypes } from 'react';
import CComponent from '../CComponent';

/**
 * React presentational component which renders form image based on model
 * @param  {object} model
 */
export default class Image extends CComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      link
    } = this.props.model.toObject();

    const label = title ? <label className='control-label super-form__item-title'>{title}</label> : null;

    return (
      <div className='super-form__item super-form__item_type_image'>
        {label}
        <img src={link} className="img-responsive" alt={title} />
      </div>
    );
  }
}

Image.propTypes = {
  model: PropTypes.object.isRequired
}