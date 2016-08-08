import React, { Component, PropTypes } from 'react';

export default class Input extends Component {

  constructor(props, validate) {
    super(props);

    this.validate = validate;
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    if (this.validate == undefined) {
      this.applyChanges(e);
    } else {
      this.changeHandlerWithValidation(e);
    }
  }

  applyChanges(e) {
    // console.log(this.props.model);
    this.props.model.value = e.target.value;
  }

  changeHandlerWithValidation(e) {
    const isValid = this.validate(e.target.value);

    // console.log(`validate: ${isValid}`);
    // console.log(this.props.model);

    this.props.model._valid = isValid;
    // console.log(this.props.model);
    this.applyChanges(e);
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

Input.propTypes = {
  model: PropTypes.object.isRequired,
  validate: PropTypes.func
}