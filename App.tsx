import React, {useState, useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux';
import * as Font from 'expo-font';
import {NavigationContainer} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary'
import {composeWithDevTools} from 'redux-devtools-extension';

import {AppRegistry} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'

AppRegistry.registerComponent('miragon-construction-organizer', () => gestureHandlerRootHOC(App));


import 'intl';
import 'intl/locale-data/jsonp/de';
import {rootReducer} from "./store/reducers/rootReducer"
import ErrorFatal from "./components/ErrorFatal";

import Colors from "./constants/Colors";
import MainNavigator from "./navigation/MainNavigator";


let store;
if (__DEV__) {
  store =
      createStore(
          rootReducer,
          composeWithDevTools(applyMiddleware(ReduxThunk))
      )
} else {
  store = createStore(rootReducer, applyMiddleware(ReduxThunk))
}

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    accent: Colors.secondary
  }
};

export default function App() {
  return (

      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <ErrorBoundary
              FallbackComponent={({error, resetError}) =>
                  <ErrorFatal error={error} resetError={resetError}/>
              }>
            <NavigationContainer>
              <MainNavigator/>
            </NavigationContainer>
          </ErrorBoundary>
        </PaperProvider>
      </StoreProvider>

  );
}