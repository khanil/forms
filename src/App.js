import React, { Component } from 'react';
import Form from './Form';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'

const initalState = {
  forms: {}
}

const store = configureStore(initalState, rootReducer);

function rootReducer (state = initalState, action) {
  switch (action.type) {
    case 'INIT_FORM':
      return Object.assign({}, state, {
        forms: Object.assign({}, state.forms, { [action.payload]: [] })
      });

    case 'FIELD_VALUE_CHANGED':
      const {
        formKey,
        fieldKey,
        value
      } = action.payload;

      const responsesNew = state.forms[formKey].slice();
      responsesNew[fieldKey] = value;

      return Object.assign({}, state, {
        forms: Object.assign({}, state.forms, { [formKey]: responsesNew })
      });

    default:
      return state;
  }
}

function configureStore(initialState, rootReducer) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware (
          thunk
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

const scheme = {
  title: 'My form',
  questions: [
    {
      _type: 'question',
      title: 'Текст вопроса',
      type: 'integer'
    },
    {
      _type: 'question',
      title: 'Тип ответа',
      type: 'string'
    },
    {
      _type: 'question',
      title: 'Описание вопроса',
      type: 'string'
    },
    {
      _type: 'question',
      title: 'Обязательный?',
      type: 'string'
    }
  ]
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Form formKey='myForm' scheme={scheme}/>
      </Provider>
    );
  }
}



