import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import FormGenerator from './FormGenerator';
import Form from './Form';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generator: true,
      form: true
    }

    this.clickHandler = this.clickHandler.bind(this);
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
              <FormGenerator />
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
              <Form formKey='myForm' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}



