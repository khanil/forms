import React, { Component, PropTypes } from 'react';

export default class Delimeter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      model
    } =  this.props;

    return (
      <div className="form-group">
        <label>{model.title}</label>
        <hr/>
      </div>
    );
  }
}

Delimeter.propTypes = {
  model: PropTypes.object.isRequired
}