import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from "@react-navigation/native";
import ErrorBoundary from 'react-native-error-boundary'
import 'react-native-url-polyfill/auto';

import Colors from './constants/Colors';
import MainNavigator from "./navigation/MainNavigator";
import ErrorFatal from "./components/ErrorFatal";


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
    );
}