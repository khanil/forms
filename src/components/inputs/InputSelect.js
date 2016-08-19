import React, { Component, PropTypes } from 'react';
import Input from './Input';
import Select from 'react-select';

export default class InputSelect extends Input {

  constructor(props) {
    super(props);
  }

  renderOptions() {
    let options = this.props.model.get('options');

    if (options === undefined)
      return [];

    options = options.toJS();

    if (typeof(options[0]) === 'string') {
      return options.map( (value) => (
        {
          value: value,
          label: value
        }
      ));
    }

    return options;
  }

  changeHandler(valObj) {
    const value = valObj.value;
    const prevValue = this.props.model.get('value');
    console.log(`newValue: ${value}, oldValue: ${prevValue}`);

    const callbacks = this.props.model.get('callbacks');
    if (callbacks !== undefined) {
      if (value !== prevValue) {
        // console.log('toggle');
        if (callbacks[value] !== undefined) {
          callbacks[value]();
        }
        if (callbacks[prevValue] !== undefined) {
          callbacks[prevValue]();
        }
      }
    }

    this.props.model.get('changeHandler')(value);
  }

  render() {
    const {
      value, placeholder
    } =  this.props.model.toObject();

    const options = this.renderOptions(options);

    return (
      <Select
        clearable={false}
        options={options}
        onChange={ this.changeHandler }
        placeholder={placeholder ? placeholder : 'Выберите ответ из списка...'}
        value={value} //must be string
      />
    );
  }
}

  // renderOptions() {
  //   const options = this.props.model.options;

  //   //if options object is array then field value will be the same as option name
  //   if ( Array.isArray(options) ) {
  //     return options.map( (name, i) => (
  //       <option value={name} key={i}>{name}</option>
  //     ));
  //   }

  //   //if options object is not array then field value will be object property, field name will be property value
  //   const result = [];
  //   for (let key in options) {
  //     const name = options[key];
  //     result.push( <option value={key} key={key}>{name}</option>)
  //   }
  //   return result;
  // }
  // 
  //   // render() {
  //   const {
  //     model
  //   } =  this.props;

  //   return (
  //     <select className="form-control" value={model.value} defaultValue={model.value} onChange={this.changeHandler}>
  //       <option/>
  //       {
  //         this.renderOptions()
  //       }
  //     </select>
  //   );
  // }