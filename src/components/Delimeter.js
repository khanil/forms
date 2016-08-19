import React, { Component, PropTypes } from 'react';

/**
 * React presentational component which renders form delimeter based on model
 * @param  {object} model
 */
export default class Delimeter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      title
    } = this.props.model.toObject();

    return (
      <div className="form-group">
        <label>{title}</label>
        <hr/>
      </div>
    );
  }
}

Delimeter.propTypes = {
  model: PropTypes.object.isRequired
}