import React, { Component, PropTypes } from 'react';
import { isInteger } from './../validations';

export default class InputString extends Component {

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    const value = e.target.value;

    this.props.model._valid = isInteger(value);

    this.props.model.value = value;
  }

  render() {
    const {
      model
    } =  this.props;

    return (
      <input type="text" className="form-control" value={model.value} onChange={this.changeHandler}/>
    );
  }
}

InputString.propTypes = {
  model: PropTypes.object.isRequired
}