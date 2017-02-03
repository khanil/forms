import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Input from './Input';
import debounce from 'throttle-debounce/debounce';
import convertToRegExp from '../../utils/convertToRegExp';

const FORMAT = '+7 (___) ___-__-__';
const SYMBOL = '_';

export default class InputPhone extends Component {

  constructor(props) {
    super(props);

    this.pattern = FORMAT;
    this.symbol = SYMBOL;
    this.regExp = convertToRegExp(this.pattern, this.symbol);

    this.caretPos = 0;
    this.defaultCaretPos = this.pattern.indexOf(this.symbol) || 0;

    this.state = {
      value: this.toFormatStr(props.model.toJS().value) || this.pattern
    }

    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.debouncedSaveToRedux = debounce(300, this.props.model.toJS().changeHandler);  
  }

  componentWillUpdate(nextProps) {
    // console.log(nextProps.model.toJS());
  }

  componentDidUpdate(prevProps, prevState) {
    const inputGroup = ReactDOM.findDOMNode(this);
    inputGroup.querySelector('input').setSelectionRange(this.caretPos, this.caretPos);
  }

  onBlur(e) {

  }

  onChange(e) {
    const input = e.target;
    let value = input.value;
    let caretPos = input.selectionStart;
    let isDel = false; 

    if (caretPos - 1 < this.pattern.indexOf(this.symbol) && value.length > this.state.value.length) {
      this.caretPos = this.defaultCaretPos;
      this.forceUpdate();
      return;
    }

    //one char deletion
    if (this.state.value.length - value.length === 1) {
      isDel = true;

      let charToDelete = this.pattern.charAt(caretPos);
      if (charToDelete != this.symbol) {
        let pos = this.findNextCharToDeletePosition(caretPos);

        if (pos < 0) {
          this.caretPos = this.defaultCaretPos;
          this.forceUpdate();
          return;
        } else {
          value = value.slice(0, pos) + value.slice(pos + 1);
        } 
      }
    }

    const formatStr = this.toFormatStr(value);

    this.caretPos = isDel ? this.findNextDeleteCaretPos(this.pattern, caretPos) : this.findNextInputCaretPos(formatStr, this.pattern, caretPos);
    this.setState({
      value: formatStr
    });
    this.debouncedSaveToRedux(formatStr);
  }

  findNextCharToDeletePosition(before) {
    let pos = before - 1;
    while (this.pattern.charAt(pos) != this.symbol && this.pattern.charAt(pos) != '') {
      pos--;
    }
    return pos;
  }

  findNextFreeCharToInputPosition(text) {
    let pos = 0;
    while (text.charAt(pos) != this.symbol && text.charAt(pos) != '') {
      pos++;
    }
    return pos;
  }

  findNextCharToInputPosition(pattern, from) {
    let pos = from;
    while (pattern.charAt(pos) != this.symbol && pattern.charAt(pos) != '') {
      pos++;
    }
    return pos;
  }

  onFocus(e) {
    // const input = e.target;
    // let pos = this.pattern.indexOf(this.symbol);
    // if (pos < 0)
    //   pos = 0;

    // setTimeout((function(el, position) {
    //     var strLength = el.value.length;
    //     return function() {
    //         if(el.setSelectionRange !== undefined) {
    //             el.setSelectionRange(position, position);
    //         } else {
    //             //$(el).val(el.value);
    //         }
    // }}(input, pos)), 0);
  }

  findNextInputCaretPos(text, pattern, caretPos) {
    let freePos = this.findNextFreeCharToInputPosition(text);

    if (freePos < caretPos) {
      return freePos;
    }

    let pos = this.findNextCharToInputPosition(this.pattern, caretPos);
    return pos;
  }

  findNextDeleteCaretPos(pattern, caretPos) {
    let pos = caretPos;
    while (pattern.charAt(pos) != this.symbol && pattern.charAt(pos) != '') {
      pos--;
    }
    return pos;
  }

  toDigitStr(str) {
    if (!str) {
      return '';
    }
    // console.log(this.regExp);
    // console.log(str);

    // const res = this.regExp.exec(str);
    // console.log(res);
    // if (!res)
    //   return '';

    // let digitStr = '';
    // for (let i = 1; i < res.length; i++) {
    //   digitStr += res[i];
    // }
    // return digitStr;
    return str.slice(2).replace(/\D/g, '').slice(0, 10);
  }

  toFormatStr(text) {
    const value = this.toDigitStr(text);
    const self = this;

    const formattedObject = this.pattern.split('').reduce(function(acc, char) {
      if (acc.remainingText.length === 0) 
        return {
          formattedText: acc.formattedText + char,
          remainingText: acc.remainingText
        };

      if (char !== self.symbol) {
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

    return formattedObject.formattedText + formattedObject.remainingText.join('');
  }

  render() {
    const model = this.props.model.toJS();
    const value = this.state.value;

    return (
      <div className='input-group'>
        <span className="input-group-addon">
          <i className="fa fa-phone" aria-hidden="true"></i>
        </span>
        <input
          type="text"
          className="form-control"
          disabled={model.disabled}
          value={value}
          placeholder={model.placeholder}
          onBlur={this.onBlur}
          onChange={this.onChange} 
          onFocus={this.onFocus}
        />
      </div>
    );
  }
}