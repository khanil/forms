import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from './Form';
import FormComponent from '../components/FormComponent';
import {
  QuestionGenerator,
  DelimeterGenerator,
  ImageGenerator
} from '../components/generators';
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

const initialState = {
  title: '',
  items: [
    defaultQuestion
  ]
}

const refPrefix = 'itemGenerator_';

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
    this.submitHandler = this.submitHandler.bind(this);
    this.checkGeneratorValidity = this.checkGeneratorValidity.bind(this);

    this.renderCounter = 0;
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

  addItemField(itemIndex, fieldName, defaultValue) {
    this.props.addItemField(this._formKey, itemIndex, fieldName, defaultValue);
  }

  removeItemField(itemIndex, fieldName) {
    this.props.removeItemField(this._formKey, itemIndex, fieldName);
  }

  /**
   * checks are all input fields valid
   * @return {boolean}
   */
  checkGeneratorValidity() {
    //all item generators and form header generator
    const formComponentCounter = this.props._items.length + 1;
    let i = 0;
    for (i; i < formComponentCounter; i++) {
      if (this.refs[refPrefix + i].checkFormValidity() === false)
        return false;
    }
    return true;
  }

  submitHandler() {
    const isFormValid = this.checkGeneratorValidity();
    console.log(`Generator valid? -${isFormValid}`);

    if (!isFormValid)
      return;

    if (!this.props.onSubmit)
      console.error('onSubmit function does\'nt provided as a prop to FormGenerator component');
    else
      this.props.onSubmit(this.props._scheme);

    alert(JSON.stringify(this.props._scheme, "", 4));
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

      const props = {
        key: i,
        index: i,
        fields: item,
        path: `items.${i}`,
        ref: `${refPrefix}${i+1}`,
        addField: (fieldName, defaultValue) => { this.addItemField(i, fieldName, defaultValue) },
        removeField: (fieldName) => { this.removeItemField(i, fieldName) },
        getFieldValue: this.getFieldValue,
        setFieldValue: this.setFieldValue
      }

      switch (type) {
        case itemTypes.QUESTION :
          return <QuestionGenerator {...props}/>

        case itemTypes.DELIMETER :
          return <DelimeterGenerator {...props}/>

        case itemTypes.IMAGE :
          return <ImageGenerator {...props}/>

        default:
          console.error(`Unknown scheme item type: ${type}.`);
      }
    });
  }

  render() {
    return (
      <div>
        <FormComponent ref={`${refPrefix}0`} scheme={scheme} setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />

        {this.renderItemGenerators()}

        <div className='form-group'>
        <button type="button" className="btn btn-default" onClick={() => this.props.addItem(this._formKey, this.props._items.length, 'question')}>Q+</button>
        <button type="button" className="btn btn-default" onClick={() => this.props.addItem(this._formKey, this.props._items.length, 'delimeter')}>D+</button>
        <button type="button" className="btn btn-default" onClick={() => this.props.addItem(this._formKey, this.props._items.length, 'image')}>I+</button>
        <button type="button" className="btn btn-default" onClick={() => this.props.removeItem(this._formKey, +this.props.desc)}>-</button>
        <button type="button" className="btn btn-default" onClick={() => this.props.swapItems(this._formKey, +this.props.title, +this.props.desc)}>o</button>
        </div>

        <div className='form-group'>
          <button type="button" className="btn btn-primary" onClick={this.submitHandler}>Сохранить</button>
        </div>
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