import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { notEmpty } from '../../utils/validations';

export default class InputOptions extends Input {

  constructor(props) {
    super(props);

    this.state = {
      values: props.model.value
    }

    this.renderFields = this.renderFields.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.pushField = this.pushField.bind(this);
    this.removeField = this.removeField.bind(this);
    this.applyChanges = this.applyChanges.bind(this);
  }

  applyChanges(newValue) {
    this.props.model.value = newValue;

    //checks empty input fields
    if (this.props.model.validate == 'true' && this.props.model._valid !== false) {
      if ( newValue.some( (value) => ( !value || value.length === 0) )) {
        this.props.model._valid = false;
        this.props.model._error = 'Вариант ответа не может быть пустым';
      } else {
        this.props.model._valid = true;
        delete this.props.model._error;
      }
    }
  }

  handlerInput(e, fieldIndex) {
    const inputValue = e.target.value;

    const newValuesState = this.state.values.slice();
    newValuesState[fieldIndex] = inputValue;

    this.setState({
      values: newValuesState
    })

    this.applyChanges(newValuesState);
  }

  pushField() {
    const newValuesState = this.state.values.slice();
    console.log(newValuesState);
    newValuesState.push('');

    this.setState({
      values: newValuesState
    });

    this.applyChanges(newValuesState);
  }

  removeField(index) {
    //must be at least one option input field
    if (this.state.values.length === 1) 
      return;

    const newValuesState = this.state.values.slice();

    newValuesState.splice(index, 1);

    this.setState({
      values: newValuesState
    });

    this.applyChanges(newValuesState);
  }

  renderFields() {
    const values = this.props.model.value;

    if ( !Array.isArray(values) ) {
      console.error('InputOptions must recieve array of values');
      return;
    }

    return values.map((value, i) => (
      <div className='input-group option-input form-group' key={i}>
        <span className='input-group-addon'>{i + 1}</span>
        <input type='text' className='form-control' value={value} onChange={(e) => { this.handlerInput(e, i) } }/>
        <span className='input-group-btn'>
            <button className='btn btn-default' type='button' onClick={() => { this.removeField(i) }}>
              <span className='glyphicon glyphicon-remove' aria-hidden='true'></span>
            </button>
        </span>
      </div>
    ));
  }

  render() {
    const {
      model
    } =  this.props;

    console.log('Options model:');
    console.log(model);

    return (
      <div>
        {this.renderFields()}
        <button type="button" className="btn btn-default" onClick={this.pushField}>+</button>
      </div>
    );
  }
}