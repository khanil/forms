import React, { Component, PropTypes } from 'react';
import Input from './Input';
import debounce from 'throttle-debounce/debounce';

const FORMAT = '+7 (___) ___-__-__';

export default class InputPhone extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: FORMAT
    }

    this.caretPos = 0;

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.debouncedSaveToRedux = debounce(300, this.props.model.toJS().changeHandler);
  }

  onBlur(e) {

  }

  onChange(e) {
    const input = e.target;
    const value = input.value;
    console.log('value: ' + value);

    let digitStr;
    let caretPos = input.selectionStart;

    //erase charackter
    if (value.length < this.state.value.length) {
      digitStr = this.toDigitStr(this.state.value);
      digitStr = digitStr.slice(0, digitStr.length - 1); 
    } else {
      digitStr = this.toDigitStr(value);

      if (digitStr.length > 10)
        return;
    }

    const formatStr = this.toFormatStr(digitStr);

    this.setState({
      value: formatStr
    }, function() {
      while (FORMAT.charAt(caretPos) != '_' && FORMAT.charAt(caretPos) != '')
        caretPos++;
      input.setSelectionRange(caretPos, caretPos);
    });

    this.debouncedSaveToRedux(value);
  }

  onFocus(e) {
    const input = e.target;
    let pos = FORMAT.indexOf('_');
    if (pos < 0)
      pos = 0;

    setTimeout((function(el, position) {
        var strLength = el.value.length;
        return function() {
            if(el.setSelectionRange !== undefined) {
                el.setSelectionRange(position, position);
            } else {
                //$(el).val(el.value);
            }
    }}(input, pos)), 0);
  }

  toDigitStr(str) {
    return str.slice(2).replace(/\D/g, '');
  }

  toFormatStr(value) {
    const formattedObject = FORMAT.split('').reduce(function(acc, char) {
      if (acc.remainingText.length === 0) 
        return {
          formattedText: acc.formattedText + char,
          remainingText: acc.remainingText
        };

      if (char !== '_') {
        return {
          formattedText: acc.formattedText + char,
          remainingText: acc.remainingText
        };
      }

      const res = {};
      res.formattedText = acc.formattedText + acc.remainingText[0];
      acc.remainingText.splice(0, 1);
      res.remainingText = acc.remainingText;
      return res;

    }, {formattedText: '', remainingText: value.split('')});

    console.log(formattedObject.formattedText);
    console.log(formattedObject.remainingText);

    return formattedObject.formattedText + formattedObject.remainingText.join('');
  }

  // toFormatStr(value) {
  //   const code = value.slice(0, 3);
  //   const number = [value.slice(3, 6), value.slice(6, 8), value.slice(8, 10)];

  //   return `+7 (${code}) ${number[0]}-${number[1]}-${number[2]}`;
  // }

  render() {
    const model = this.props.model.toJS();
    const value = this.state.value;

    return (
      <input
        type="text"
        className="form-control" 
        value={value}
        onBlur={this.onBlur}
        onChange={this.onChange} 
        onFocus={this.onFocus}
      />
    );
  }
}