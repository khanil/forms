import React, { Component, PropTypes } from 'react';
import Input from './Input';
import Select from 'react-select';

export default class InputSelect extends Input {

  constructor(props) {
    super(props);

    this.state = {
      options: []
    }

    this.changeHandler = this.changeHandler.bind(this);
    this.renderHelpBlock = this.renderHelpBlock.bind(this);
  }

  /**
   * [changeHandler description]
   * @param  {obj or array of obj} valObj
   */
  changeHandler(valueObj) {
    console.warn(valueObj);
    const multiple = this.props.model.get('multiple');
    let value;
    if (multiple === 'true') {
      const maxValues = this.props.model.get('selectmax');
      if (maxValues && valueObj.length > maxValues)
        return;
      value = valueObj.map((v) => v.value);
    } else {
      value = valueObj.value;
      const prevValue = this.props.model.get('value');
      const callbacks = this.props.model.get('callbacks');
      if (callbacks !== undefined && value !== prevValue) {
        //console.log('toggle');
        const newValueCallback = callbacks.get(value);
        const prevValueCallback = callbacks.get(prevValue);
        if (newValueCallback !== undefined)
          newValueCallback();
        if (prevValueCallback !== undefined)
          prevValueCallback();
      }
    }

    this.props.model.get('changeHandler')(value);
  }

  /**
   * [changeHandler description]
   * @param  {obj or array of obj} valObj
   * @return {[type]}        [description]
   */
  /*changeHandler(valObj) {
    console.warn(valObj);

    const maxValues = this.props.model.get('selectmax');
    if (maxValues && valObj.split(', ').length > maxValues) {
        console.warn('Overflow');
        return;
    }

    const value = valObj;

    const prevValue = this.props.model.get('value');
    //console.log(`newValue: ${value}, oldValue: ${prevValue}`);

    const callbacks = this.props.model.get('callbacks');
    if (callbacks !== undefined) {
      if (value !== prevValue) {
        //console.log('toggle');
        const newValueCallback = callbacks.get(value);
        const prevValueCallback = callbacks.get(prevValue);
        if (newValueCallback !== undefined) {
          newValueCallback();
        }
        if (prevValueCallback !== undefined) {
          prevValueCallback();
        }
      }
    }

    //console.warn(value);
    this.props.model.get('changeHandler')(value);
  }*/

  convertToArray(optionsImble) {
    if (optionsImble === undefined)
      return [];
    return optionsImble.toJS();
  }

  needTransform(options) {
    return options.length !== 0 && typeof(options[0]) === 'string';
  }

  renderHelpBlock(selectmax) {
    const maxMessage = selectmax ? `Но не более ${selectmax}.`
                                 : '';

    return <div className='super-form__item-help-block'>
        {`Вы можете выбрать несколько вариантов ответа. ${maxMessage}`}</div>
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

  transformOptions(options) {
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

    return options;
  }

  componentWillMount() {
    let options = this.convertToArray(this.props.model.get('options'));
    if ( this.needTransform(options) )
      options = this.transformOptions(options);

    this.setState({
      options
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.model.get('options') !== this.props.model.get('options')) {
      let options = this.convertToArray(nextProps.model.get('options'));
      if ( this.needTransform(options) )
        options = this.transformOptions(options);

      this.setState({
        options
      });
    }
  }

  render() {
    let {
      value, placeholder, disabled, multiple, selectmax
    } =  this.props.model.toJS();
    const options = this.state.options;

    /**
     * For previous release support
     * (there value was a string)
     * Convert string to array
     */
    if (multiple === 'true' && typeof(value) === 'string')
      value = value.split(', ');
    /** End */

    return (
      <div>
        {
          multiple === 'true' ?
          this.renderHelpBlock(selectmax) :
          null
        }
        <Select
          // delimiter={', '}
          disabled={disabled}
          clearable={false}
          joinValues={false}
          simpleValue={false}
          options={options}
          onChange={ this.changeHandler }
          placeholder={placeholder ? placeholder
                                   : 'Выберите ответ из списка...'}
          value={value}
          multi={multiple === 'true'}
        />
      </div>
    );
  }
}