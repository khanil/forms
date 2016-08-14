import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { forms } from '../lib/react-super-forms';

import { Form, FormGenerator } from '../lib/react-super-forms';

function configureStore(initialState) {
  const store = createStore(
    forms,
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

const store = configureStore();

render(
  <Provider store={store}>
    <FormGenerator />
  </Provider>,
  document.getElementById('root')
);