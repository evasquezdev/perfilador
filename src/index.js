import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configureStore';

import App from './App';

const storeConfig = configureStore();

ReactDOM.render(
  <Provider store={storeConfig.store}>
    <PersistGate loading={null} persistor={storeConfig.persistor}>
      <App/>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
