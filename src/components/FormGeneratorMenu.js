import React, { Component, PropTypes } from 'react';
import CComponent from './CComponent';

export default class FormGeneratorMenu extends CComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      addQuestion,
      addDelimeter,
      addImage
    } = this.props;

    return (
      <div className='form-generator__menu btn-group btn-group-justified'>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default form-generator__menu__btn form-generator__menu__btn_type_question"
            onClick={() => addQuestion(-1)}>
            Добавить вопрос
          </button>
        </div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default form-generator__menu__btn form-generator__menu__btn_type_image"
            onClick={() => addImage(-1)}>
            Добавить изображение
          </button>
        </div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default form-generator__menu__btn form-generator__menu__btn_type_delimeter"
            onClick={() => addDelimeter(-1)}>
            Добавить раздел
          </button>
        </div>
      </div>
    );
  }
}

FormGeneratorMenu.propTypes = {
  
}