import React, { Component, PropTypes } from 'react';
import FormComponent from './FormComponent';
import * as nestedObject from '../utils/nestedObject';

const schemeTemplate = [
  {
    _type: 'question',
    name: 'title',
    title: 'Текст над разделителем',
    type: 'string'
  }
]

/**
 * Presentational component that renders input fields specified in fields prop
 * @param {object} filds points which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {string} path
 */
export default class DelimeterGenerator extends Component {
  constructor(props) {
    super(props);
    this.buildScheme = this.buildScheme.bind(this);
  }

  /**
   * builds scheme object that include items specified in fields object
   * @return {obj} scheme
   */
  buildScheme() {
    const fields = this.props.fields;
    const scheme = { items: [] };

    //if template item name was found in fields object, item adds to scheme object
    scheme.items = schemeTemplate.filter((item, i) => (fields[item.name] !== undefined));
    return scheme;
  }

  render() {
    return (
      <FormComponent scheme={this.buildScheme()} path={this.props.path} setFieldValue={this.props.setFieldValue} getFieldValue={this.props.getFieldValue}/>
    );
  }
}

DelimeterGenerator.propTypes = {
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}
