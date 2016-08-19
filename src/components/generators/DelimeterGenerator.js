import React, { Component, PropTypes } from 'react';
import ItemGenerator from './ItemGenerator';
import { inputTypes } from '../../utils';

function getSchemeTemplate(){
  return [
    {
    _type: 'question',
    name: 'title',
    title: 'Текст над разделителем',
    type: inputTypes.STRING
    }
  ]
}

/**
 * Presentational component that renders input fields specified in fields prop
 * @param {object} fields object passed from store, specified which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {func} addField inserts new input field in store
 * @param {func} removeField removes input field from store
 * @param {string} path util passed in setFieldValue and getFieldValue func
 */
export default class DelimeterGenerator extends ItemGenerator {
  constructor(props) {
    super(props, getSchemeTemplate);
    this.componentWillMount = super.componentWillMount;
    this.componentWillReceiveProps = super.componentWillReceiveProps;
  }

  render() {
    return (
      <div>
        {super.render()}
      </div>
    );
  }
}

DelimeterGenerator.propTypes = {
  fields: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  addField: PropTypes.func,
  removeField: PropTypes.func
}
