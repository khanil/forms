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
 * @param {object} filds points which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {string} path
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
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}
