import React, { Component, PropTypes } from 'react';
import ItemGenerator from './ItemGenerator';
import { inputTypes } from '../../utils';

function getSchemeTemplate() {
  return [
    {
      _type: 'question',
      name: 'title',
      title: 'Сопроводительный текст',
      type: inputTypes.INTEGER
    },
    {
      _type: 'question',
      name: 'link',
      title: 'Файл',
      type: inputTypes.IMAGE
    }
  ];
}

export default class ImageGenerator extends ItemGenerator {
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

ImageGenerator.propTypes = {
  setFieldValue: PropTypes.func,
  getFieldValue: PropTypes.func
}
