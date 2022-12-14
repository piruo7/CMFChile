/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import store from './src/redux/store';

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => HeadlessCheck);
