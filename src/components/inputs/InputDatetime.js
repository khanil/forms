import React from 'react';
import Input from './Input';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';

momentLocalizer(Moment);

export default class InputDatetime extends Input {

  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.format = 'DD MMM YYYY, HH:mm';
    this.editFormat = 'DD/MM/YY HH:mm';
    this.step = 1;
  }

  render() {
    const {
      model
    } =  this.props;

    const min = null;
    const max = null;

    console.log(Moment(model.value, this.format).toDate());

    //value={(model.value) ? Moment(model.value).toDate() : null}

    return (
      <DateTimePicker
        calendar={this.props.date}
        format={this.format}
        editFormat={this.editFormat}
        value={(model.value) ? Moment(model.value, this.format).toDate() : null}
        onChange={ (name, value) => { this.changeHandler({ target: { value: value } }) } }
        step={this.step}
        time={this.props.time}
        min={min ? min : new Date(1900, 0, 1)}
        max={max ? max : new Date(2099, 11, 31)}
      />
    );
  }
}

