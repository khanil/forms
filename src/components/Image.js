import React, { Component, PropTypes } from 'react';

export default class Image extends Component {

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
        <img src={model.link} className="img-responsive" alt={model.title} />
      </div>
    );
  }
}

Image.propTypes = {
  model: PropTypes.object.isRequired
}