import React, { Component, PropTypes } from 'react';

/**
 * React presentational component which renders form image based on model
 * @param  {object} model
 */
export default class Image extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      link
    } = this.props.model.toObject();

    return (
      <div className="form-group">
        <label>{title}</label>
        <img src={link} className="img-responsive" alt={title} />
      </div>
    );
  }
}

Image.propTypes = {
  model: PropTypes.object.isRequired
}