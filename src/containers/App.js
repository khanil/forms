import React, { Component } from 'react';
import FormGenerator from './FormGenerator';
import Form from './Form';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='col-md-6'>
          <FormGenerator />
        </div>
        <div className='col-md-6'>
          <Form formKey='myForm' />
        </div>
      </div>
    );
  }
}



