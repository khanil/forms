import React, { Component, PropTypes } from 'react';
import Input from './Input';
import Select from 'react-select';

export default class InputSelect extends Input {

  constructor(props) {
    super(props);
  }

  renderOptions() {
    const options = this.props.model.options;
    
    if (options === undefined)
      return [];

    if (typeof(options[0]) === 'string') {
      return options.map( (value) => (
        {
          value: value,
          label: value
        }
      ));
    }
  }

  render() {
    const {
      model
    } = this.props;

    const options = this.renderOptions(this.props.model.options);

    return (
      <Select
        clearable={false}
        options={options}
        onChange={ (val) => { this.changeHandler({ target: val }) } }
        placeholder={ model.placeholder ? model.placeholder : 'Выберите из списка...'}
        value={this.props.model.value}
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