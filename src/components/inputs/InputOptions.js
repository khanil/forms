import React, { Component, PropTypes } from 'react';
import Input from './Input';
import { List } from 'immutable';
import { notEmpty } from '../../utils/validations';
import bindFunctions from '../../utils/bind-functions';

export default class InputOptions extends Input {

  constructor(props) {
    super(props);

    this.state = {
      values: List(props.model.get(value))
    }

    bindFunctions.call(this, ['renderFields', 'handlerInput', 'pushField', 'removeField', 'applyChanges']);
  }

  applyChanges(newValue) {
    this.props.model.get('changeHandler')(newValue);

    //checks empty input fields
    // if (this.props.model.validate == 'true' && this.props.model._valid !== false) {
    //   if ( newValue.some( (value) => ( !value || value.length === 0) )) {
    //     this.props.model._valid = false;
    //     this.props.model._error = 'Вариант ответа не может быть пустым';
    //   } else {
    //     this.props.model._valid = true;
    //     delete this.props.model._error;
    //   }
    // }
  }

  handlerInput(e, fieldIndex) {
    const inputValue = e.target.value;

    const newValuesState = this.state.values.set('fieldIndex', inputValue);

    this.setState({
      values: newValuesState
    })

    this.applyChanges(newValuesState);
  }

  pushField() {
    this.setState(({values}) => ({
      values: values.push('')
    }));

    this.applyChanges(newValuesState);
  }

  removeField(index) {
    //must be at least one option input field
    if (this.state.values.size === 1) 
      return;

    this.setState(({values}) => ({
      values: values.delete(index)
    }));

    this.applyChanges(newValuesState);
  }

  renderFields() {
    const values = this.props.model.get(value);

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
    return (
      <div>
        {this.renderFields()}
        <button type="button" className="btn btn-default" onClick={this.pushField}>+</button>
      </div>
    );
  }
}