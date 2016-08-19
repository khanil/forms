import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import FormGenerator from './FormGenerator';
import Form from './Form';
import { fromJS } from 'immutable';

const scheme = fromJS({
 title: 'Моя форма',
 items: [
   {
     _type: 'question',
     title: 'Первый вопрос',
     type: 'datetime',
     required: true
   },
   {
     _type: 'question',
     title: 'Второй вопрос',
     type: 'integer',
     required: true
   },
   {
     _type: 'delimeter',
     title: 'Разделитель тут',
   },
   {
     _type: 'question',
     title: 'Третий вопрос',
     type: 'select',
     required: true,
     options: [
       '1',
       '2',
       '3',
       '4'
     ]
   },
   {
     _type: 'question',
     title: 'Четвертый вопрос',
     type: 'financial',
     required: true
   }
 ]
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generator: true,
      form: true
    }

    this.clickHandler = this.clickHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    const node = findDOMNode(this);
    const formGenerator = node.getElementsByClassName('form-generator-container')[0];
    const liveForm = node.getElementsByClassName('live-form-container')[0];
    const height = document.documentElement.clientHeight;
    formGenerator.style.height = height + 'px';
    liveForm.style.height = height + 'px';

    window.onresize = () => {
      const height = document.documentElement.clientHeight;
      formGenerator.style.height = height + 'px';
      liveForm.style.height = height + 'px';
    }
  }

  clickHandler(e, name) {
    console.log('click');

    const curValue = this.state[name];

    this.setState({
      [name]: !curValue
    });
  }

  submitHandler(ref) {
    this.refs[ref].getWrappedInstance().submitHandler();
  }

  render() {
    const generatorClass = !this.state.form ? 'col-md-11' : this.state.generator ? 'col-md-6' : 'col-md-1';
    const formClass = !this.state.generator ? 'col-md-11' : this.state.form ? 'col-md-6' : 'col-md-1';
  
    return (
      <div className='container-fluid'>
        <div className="row">
          <div className={'form-generator-container ' + generatorClass}>
            <div className="row">
              <button type="button" className="btn btn-default" onClick={(e) => {this.clickHandler(e, 'generator')}}>
                {
                  this.state.generator
                  ? <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                  : <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                }
              </button>
            </div>
            <div className="row" hidden={this.state.generator ? '' : 'true'}>
              <FormGenerator ref='generator' previewKey='myForm'/>
              <button type="button" className="btn btn-primary" onClick={() => this.submitHandler('generator')}>Сохранить</button>
            </div>
          </div>
          <div className={'live-form-container ' + formClass}>
            <div className="row">
              <button type="button" className="btn btn-default" onClick={(e) => {this.clickHandler(e, 'form')}}>
                {
                  this.state.form
                  ? <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
                  : <span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                }
              </button>
            </div>
            <div className="row" hidden={this.state.form ? '' : 'true'}>
              <Form ref='myForm' formKey='myForm' />
              <button type="button" className="btn btn-primary" onClick={() => this.submitHandler('myForm')}>Отправить</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



