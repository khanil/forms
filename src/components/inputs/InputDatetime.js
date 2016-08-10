import React from 'react';
import Input from './Input';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
Moment.locale('ru');
import momentLocalizer from 'react-widgets/lib/localizers/moment';

momentLocalizer(Moment);

const dateFormat = 'DD.MM.YYYY';
const timeFormat = 'HH:mm';

/**
 * React component for displaying input typeof date, time or datetime based on props
 * @param {string} mode set the input type (datetime or date only or time only)
 */
export default class InputDatetime extends Input {

  constructor(props) {
    super(props);

    this.displayFormat;
    this.showDatePicker;
    this.showTimePicker;
    this.applyMode(props.mode);
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.mode !== nextProps.mode)
      this.applyMode(nextProps.mode);
  }

  applyMode(mode) {
    switch (mode) {
      case 'date': {
        this.displayFormat = dateFormat;
        this.showDatePicker = true;
        this.showTimePicker = false;
        return;
      }

      case 'time': {
        this.displayFormat = timeFormat;
        this.showDatePicker = false;
        this.showTimePicker = true;
        return;
      }

      default: {
        this.displayFormat = `${dateFormat} ${timeFormat}`;
        this.showDatePicker = this.showTimePicker = true;
        return;
      }
    }
  }

  changeHandler(date) {
    //incorrect date
    if (date === null)
      return;
    //value as ISO 8601 string
    const value = Moment(date).format();
    super.changeHandler(value);
  }

  render() {
    const {
      model
    } =  this.props;

    return (
      <DateTimePicker
        calendar={this.showDatePicker}
        format={this.displayFormat}
        onChange={this.changeHandler}
        time={this.showTimePicker}
        value={ model.value ? Moment(model.value).toDate() : null }
      />
    );
  }
}