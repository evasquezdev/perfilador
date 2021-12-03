import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './configureStore';
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import App from './App';

const storeConfig = configureStore();

i18next.init({
  interpolation: { escapeValue: false },  // React already does escaping
});


ReactDOM.render(
  <Provider store={storeConfig.store}>
    <PersistGate loading={null} persistor={storeConfig.persistor}>
    <I18nextProvider i18n={i18next}>
      <App/>
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
