import React, { Component, PropTypes } from 'react';
import equal from 'deep-equal';
import FormComponent from '../FormComponent';

/**
 * Presentational component that renders input fields specified in fields prop
 * @param {object} fields points which input fields must be rendered
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {string} path
 */
export default class ItemGenerator extends FormComponent {
  constructor(props, getSchemeTemplate) {
    super(props);

    this.scheme;

    if (getSchemeTemplate === undefined)
      console.error('You need to pass getSchemeTemplate func in ItemGenerator component');

    this.toggleField = this.toggleField.bind(this);
    this.schemeTemplate = getSchemeTemplate.bind(this)();
    this.buildScheme = this.buildScheme.bind(this);
  }

  componentWillMount(){
    const scheme = this.buildScheme(this.props.fields);
    this.scheme = scheme;
    super.setScheme(scheme);
    const model = super.buildModel(scheme);
    super.setState({
      model
    });
  }

  componentWillReceiveProps(nextProps) {
    const oldFieldKeys = [];
    const newFieldKeys = [];
    for (let key in this.props.fields)
      oldFieldKeys.push(key);
    for (let key in nextProps.fields)
      newFieldKeys.push(key);

    const isFieldsEqual = equal(oldFieldKeys, newFieldKeys);
    if (!isFieldsEqual) {
      const newScheme = this.buildScheme(nextProps.fields);
      const newModel = super.updateModel(newScheme, this.scheme);

      super.setState({
        model: newModel
      });
      super.setScheme(newScheme);
    }
  }

  toggleField(fieldName, defaultValue) {
    if (this.props.fields[fieldName] === undefined) {
      this.props.addField(fieldName, defaultValue);
    } else {
      this.props.removeField(fieldName);
    }
  }

  /**
   * builds scheme object that include items specified in fields object
   * @return {obj} scheme
   */
  buildScheme(fields) {
    const scheme = { items: [] };

    //if template item name was found in fields object, item adds to scheme object
    scheme.items = this.schemeTemplate.filter((item, i) => (fields[item.name] !== undefined));
    return scheme;
  }

  render() {
    return super.render();
  }
}

ItemGenerator.propTypes = {
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}
