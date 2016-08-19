import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map, List, fromJS } from 'immutable';
import Form from './Form';
import FormComponent from '../components/FormComponent';
import { QuestionGenerator, DelimeterGenerator, ImageGenerator } from '../components/generators';
import { addItem, removeItem, swapItems, initForm, handleUserInput,
  addItemField, removeItemField, addItemLive, removeItemLive, swapItemsLive } from '../actions';
import bindFunctions from '../utils/bind-functions';
import * as itemTypes from '../utils/itemTypes';
import * as inputType from '../utils/inputTypes';
import * as itemDefaults from '../utils/itemDefaults';

const formConfigScheme = fromJS({
  title: 'Генератор',
  items: [
    {
      _type: 'question',
      name: 'title',
      title: 'Имя формы',
      required: true,
      type: inputType.STRING
    },
    {
      _type: 'question',
      name: 'description',
      title: 'Описание формы',
      required: true,
      type: inputType.STRING
    }
  ]
});

const defaultQuestion = itemDefaults.get(itemTypes.QUESTION);

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
    this.formKey = 'scheme';

    // make object in redux store to store responses of current form
    this.props.initForm(this.formKey, initialState);

    bindFunctions.call(this, ['setFieldValue', 'getFieldValue', 'addItemField', 'removeItemField',
      'addItem', 'removeItem', 'swapItems', 'submitHandler', 'checkGeneratorValidity']);

    this.createAddItemFunc.call(this);
    console.log(this);
    this.refPrefix = 'itemGenerator';
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.scheme === undefined)
    //   return;

    // const itemsFirst = this.props.scheme.getIn(['items', '0']);
    // console.log(itemsFirst.toJS());
    // const newItemsSecond = nextProps.scheme.getIn(['items', '1']);
    // console.log(newItemsSecond.toJS());
    // console.log(`abrakadabra? -${itemsFirst === newItemsSecond}`);
  }

  /**
   * returns the field value from store by field key
   * @param  {string} fieldKey [points at element that stores field value]
   * @return {any}          [stored value]
   */
  getFieldValue(localPath, fieldKey) {
    const schemeStore = this.props.scheme;
    const path = localPath ? localPath.split('.') : [];
    path.push(fieldKey)
    return schemeStore.getIn(path);
  }

  /**
   * handles user input into form fields
   * @param  {string} fieldKey [points at element that stores field value]
   * @param  {any} value    [new value]
   */
  setFieldValue(localPath, fieldKey, value) {
    this.props.handleUserInput(this.formKey, fieldKey, localPath, value);
  }

  /**
   * dispatches ADD_ITEM_FIELD action
   * that adds new prop in item object and cause corresponding input component render
   * @param {string} itemIndex    pointer on item object
   * @param {string} fieldName    prop name to add
   * @param {string} defaultValue default value of added prop
   */
  addItemField(itemIndex, fieldName, defaultValue) {
    this.props.addItemField(this.formKey, itemIndex, fieldName, defaultValue);
  }

  /**
   * dispatches REMOVE_ITEM_FIELD action
   * that remove prop from item object and cause corresponding input component removing
   * @param {string} itemIndex    pointer on item object
   * @param {string} fieldName    prop name to delete
   */
  removeItemField(itemIndex, fieldName) {
    this.props.removeItemField(this.formKey, itemIndex, fieldName);
  }

  /**
   * dispatches ADD_ITEM action
   * that inserts item picked by type in scheme items array
   * @param {integer} position
   * @param {string} type     utils/itemTypes.js
   */
  addItem(position, type) {
    if (this.props.previewKey)
      this.props.addItemLive(this.formKey, this.props.previewKey, position, type);
    else
      this.props.addItem(this.formKey, position, type);
  }

  /**
   * dispatches REMOVE_ITEM action
   * that removes item from scheme items array
   * @param  {integer} position
   */
  removeItem(position) {
    if (this.props.previewKey)
      this.props.removeItemLive(this.formKey, this.props.previewKey, position);
    else
      this.props.removeItem(this.formKey, position);
  }

  /**
   * dispatches SWAP_ITEMS action
   * that swap to items in scheme items array
   * @param  {integer} fPos first item index
   * @param  {integer} sPos second item index
   */
  swapItems(fPos, sPos) {
    if (this.props.previewKey)
      this.props.swapItemsLive(this.formKey, this.props.previewKey, fPos, sPos);
    else
      this.props.swapItems(this.formKey, fPos, sPos);
  }

  /**
   * creates API functions for adding items of specific type
   */
  createAddItemFunc() {
    const supportedTypes = itemTypes;

    for (let key in supportedTypes) {
      const type = supportedTypes[key];
      const funcName = 'add' + type[0].toUpperCase() + type.slice(1);
      this[funcName] = pos => this.addItem(pos, type);
    }
  }

  /**
   * checks are all input fields valid
   * @return {boolean}
   */
  checkGeneratorValidity() {
    console.log(this.refs);
    //all item generators and form header generator
    const itemGeneratorsN = this.props.scheme.get('items').size;
    let isValid = this.refs['formConfig'].checkFormValidity();

    for (let i = 0; i < itemGeneratorsN; i++) {
      isValid = this.refs[this.refPrefix + i].refs['form'].checkFormValidity() && isValid;
    }

    return isValid;
  }

  submitHandler() {
    const isFormValid = this.checkGeneratorValidity();
    console.log(`Generator valid? -${isFormValid}`);

    if (!isFormValid)
      return;

    //delete all util _id props in items
    const scheme = this.props.scheme.update('items', items => items.map(item => item.delete('_id'))).toJS();

    if (!this.props.onSubmit)
      console.error('onSubmit function does\'nt provided as a prop to FormGenerator component');
    else
      this.props.onSubmit(scheme);

    alert(JSON.stringify(scheme, "", 4));
  }

    /**
   * renders list of react components which represent form items generators
   * based on redux state scheme
   * @return {array}
   */
  renderItemGenerators() {
    console.log('Form Generator items rendering...');

    const items = this.props.scheme.get('items');

    return items.map( (item, i) => {
      //define the type of generator component
      const type = item.get('_type');

      console.log(`item ${i} _id: ${item.get('_id')}`);

      const props = {
        key: item.get('_id'),
        index: item.get('_id'),
        ref: this.refPrefix + i,
        fields: item,
        path: `items.${i}`,
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
    //store doesn't set up yet
    if (this.props.scheme == undefined)
      return null;

    return (
      <div>
        <FormComponent ref='formConfig' scheme={formConfigScheme} setFieldValue={this.setFieldValue} getFieldValue={this.getFieldValue} />

        {this.renderItemGenerators()}

        <div className='form-group'>
        <button type="button" className="btn btn-default" onClick={() => this.addItem(0, 'question')}>Q+</button>
        <button type="button" className="btn btn-default" onClick={() => this.addItem(this.props.scheme.get('items').size, 'delimeter')}>D+</button>
        <button type="button" className="btn btn-default" onClick={() => this.addItem(this.props.scheme.get('items').size, 'image')}>I+</button>
        <button type="button" className="btn btn-default" onClick={() => this.removeItem(this.props.scheme.get('items').size-1)}>-</button>
        <button type="button" className="btn btn-default" onClick={() => this.swapItems(0, 1)}>o</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scheme: state.forms.get('scheme')
  }
};

const mapDispatchToProps = {
  addItem,
  removeItem,
  swapItems,
  initForm,
  handleUserInput,
  addItemField,
  removeItemField,
  addItemLive,
  removeItemLive,
  swapItemsLive
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(FormGenerator);