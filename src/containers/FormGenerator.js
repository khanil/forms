import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import FormComponent from '../components/FormComponent';
import QuestionGenerator from '../components/QuestionGenerator';
import DelimeterGenerator from '../components/DelimeterGenerator';
import * as nestedObject from '../utils/nestedObject';
import * as itemTypes from '../utils/itemTypes';
import * as inputType from '../utils/inputTypes';
import { addItem, removeItem, swapItems, initForm, handleUserInput,
  addItemField, removeItemField } from '../actions';
import * as itemDefaults from '../utils/itemDefaults';
import equal from 'deep-equal';

const scheme = {
  title: 'Генератор',
  items: [
    {
      _type: 'question',
      name: 'title',
      title: 'Имя формы',
      type: inputType.INTEGER
    },
    {
      _type: 'question',
      name: 'description',
      title: 'Описание формы',
      type: inputType.INTEGER
    }
  ]
}

const defaultQuestion = itemDefaults.QUESTION;
defaultQuestion._id = 0;

const initialState = {
  title: '',
  items: [
    defaultQuestion
  ]
}

/**
 * Container component that builds form scheme in redux state
 */
class FormGenerator extends Component {
  constructor(props) {
    super(props);
    this._formKey = 'scheme';

    // make object in redux store to store responses of current form
    this.props.initForm(this._formKey, initialState);

    this.setFieldValue = this.setFieldValue.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
    this.addItemField = this.addItemField.bind(this);
    this.removeItemField = this.removeItemField.bind(this);

    this.renderCounter = 0;
  }

  componentWillReceiveProps(nextProps) {
    // console.log('FormGenerator previousProps:');
    // console.log(this.props);
    // console.log('FormGenerator nextProps:');
    // console.log(nextProps);
    // const isEqual = equal(this.props, nextProps);
    // console.log(`Equal? -${isEqual}`);
    // console.log(' ');
    // this.state.model = this.buildModel(this.props.scheme);
  }

  /**
   * returns the field value from store by field key
   * @param  {string} fieldKey [points at element that stores field value]
   * @return {any}          [stored value]
   */
  getFieldValue(localPath, fieldKey) {
    const store = this.props._scheme;

    const path = localPath ? localPath.split('.') : [];

    return nestedObject.getProperty(store, path, fieldKey);
  }

  /**
   * handles user input into form fields
   * @param  {string} fieldKey [points at element that stores field value]
   * @param  {any} value    [new value]
   */
  setFieldValue(localPath, fieldKey, value) {
    this.props.handleUserInput(this._formKey, fieldKey, localPath, value);
  }

  addItemField(itemIndex, fieldName) {
    this.props.addItemField(this._formKey, itemIndex, fieldName);
  }

  removeItemField(itemIndex, fieldName) {
    this.props.removeItemField(this._formKey, itemIndex, fieldName);
  }

  /**
   * renders list of react components which represent form items generators
   * based on redux state scheme
   * @return {array}
   */
  renderItemGenerators() {
    const items = this.props._items;
    if (items == undefined) return;

    return items.map( (item, i) => {
      //define the type of generator component
      const type = item._type;

      switch (type) {
        case itemTypes.QUESTION :
          return <QuestionGenerator key={i} index={i} fields={item} setFieldValue={this.setFieldValue}
                   getFieldValue={this.getFieldValue} addField={(fieldName) => { this.addItemField(i, fieldName) } } 
                   removeField={(fieldName) => { this.removeItemField(i, fieldName) } } path={`items.${i}`}/>

        case itemTypes.DELIMETER :
          return <DelimeterGenerator key={i}  fields={item} setFieldValue={this.setFieldValue}
                   getFieldValue={this.getFieldValue} path={`items.${i}`}/>

        default:
          console.error(`Unknown scheme item type: ${type}.`);
      }
    });
  }

  render() {
    // console.log(' ');
    // console.log('Generator render tymes: ' + ++this.renderCounter);
    // console.log(' ');

    return (
      <div>
        <FormComponent scheme={scheme} setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />

        {this.renderItemGenerators()}

        <button type="button" className="btn btn-default" onClick={() => this.props.addItem(this._formKey, +this.props.title, 'question')}>Q+</button>
        <button type="button" className="btn btn-default" onClick={() => this.props.addItem(this._formKey, +this.props.title, 'delimeter')}>D+</button>
        <button type="button" className="btn btn-default" onClick={() => this.props.removeItem(this._formKey, +this.props.desc)}>-</button>
        <button type="button" className="btn btn-default" onClick={() => this.props.swapItems(this._formKey, +this.props.title, +this.props.desc)}>o</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let _scheme = nestedObject.find(state, ['forms', 'scheme']);
  //form state didn't mount yet
  if (_scheme == undefined)
    _scheme = {};

  let _items = _scheme.items;

  return {
    _scheme,
    _items,
    title: _scheme.title,
    desc: _scheme.description,
  }
};

const mapDispatchToProps = {
  addItem,
  removeItem,
  swapItems,
  initForm,
  handleUserInput,
  addItemField,
  removeItemField
}

export default connect(mapStateToProps, mapDispatchToProps)(FormGenerator);