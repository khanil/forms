import React, { Component, PropTypes } from 'react';
import ItemGenerator from './ItemGenerator';
import { inputTypes } from '../../utils';

function getSchemeTemplate() {
  return [
    {
      _type: 'question',
      name: 'title',
      title: 'Имя формы',
      placeholder: 'Введите название',
      required: 'true',
      type: inputTypes.STRING
    },
    {
      _type: 'question',
      name: 'description',
      title: 'Комментарий к форме',
      placeholder: 'Здесь можно ввести дополнительный текст к форме',
      required: 'false',
      type: inputTypes.PARAGRAPH
    },
    {
      _type: 'question',
      name: 'type',
      title: 'Тип формы',
      placeholder: 'Выберите тип формы',
      required: 'true',
      type: inputTypes.SELECT,
      options: this.props.formTypes
    },
    {
      _type: 'question',
      name: 'basis',
      title: 'Основание формы',
      placeholder: 'Выберите основание проведения',
      required: 'true',
      type: inputTypes.SELECT,
      options: this.props.basisTypes
    },
    {
      _type: 'question',
      name: 'basisname',
      title: 'Расшифровка основания',
      placeholder: 'Введите наименование',
      required: 'true',
      type: inputTypes.PARAGRAPH
    }
  ];
};

/**
 * Presentational component that renders form generation header
 * @param {object} scheme
 * @param {func} setFieldValue transmits user input changes to store
 * @param {func} getFieldValue extracts user input value from store
 * @param {string} path util passed in setFieldValue and getFieldValue func
 */
export default class HeaderGenerator extends ItemGenerator {
  constructor(props) {
    super(props, getSchemeTemplate, 'header');

    this.componentWillMount = super.componentWillMount;
    this.componentWillReceiveProps = super.componentWillReceiveProps;
  }

  render() {
    return super.render();
  }
}

HeaderGenerator.propTypes = {
  fields: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  getFieldValue: PropTypes.func.isRequired,
  path: PropTypes.string,
  addField: PropTypes.func,
  removeField: PropTypes.func
}
