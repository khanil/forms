import React, { Component } from 'react';
import FormGenerator from './FormGenerator';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import * as nestedObject from './nestedObject';

// const state = {
//   forms: {
//     scheme: {
//       title: '',
//       description: '',
//       items: [
//         {
//           _type: 'question',
//           title: '',
//           type: ''
//         }
//       ]
//     }
//   }
// }

const initalState = {};

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
        localPath,
        value
      } = action.payload;

      let path = ['forms', 'scheme'];
      if (localPath !== null)
        path = path.concat(localPath.split('.'));

      const newState = nestedObject.setProperty(state, path, fieldKey, value);
      console.log( newState );

      return newState;

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

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <FormGenerator />
      </Provider>
    );
  }
}



