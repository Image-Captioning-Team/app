import React, {useState} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {composeWithDevTools} from 'redux-devtools-extension';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from "@react-navigation/native";
import ErrorBoundary from 'react-native-error-boundary'
import 'react-native-url-polyfill/auto';

import Colors from './constants/Colors';
import MainNavigator from "./navigation/MainNavigator";
import ErrorFatal from "./components/ErrorFatal";
import {rootReducer} from "./store/reducers/rootReducer";



const getStore = () => {
    if (__DEV__) {
        return createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(ReduxThunk))
        );
    } else {
        return createStore(rootReducer, applyMiddleware(ReduxThunk));
    }
}


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
        <StoreProvider store={getStore()}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider>
                    <ErrorBoundary
                        FallbackComponent={({error, resetError}) =>
                            <ErrorFatal error={error} resetError={resetError}/>
                        }>
                        <NavigationContainer>
                            <MainNavigator/>
                        </NavigationContainer>
                    </ErrorBoundary>
                </SafeAreaProvider>
            </PaperProvider>
        </StoreProvider>
    );
}