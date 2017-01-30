import React, { Component, PropTypes } from 'react';
import CComponent from './CComponent';

export default class FormHeader extends CComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      description
    } = this.props;

    return (
      <div className='super-form__header'>
        <span className='super-form__header-title'>{title}</span>
        {
          description ?
          <span className='super-form__header-description'>{description}</span> :
          null
        }
      </div>
    );
  }
}

FormHeader.propTypes = {
  title: React.PropTypes.string.isRequired
}