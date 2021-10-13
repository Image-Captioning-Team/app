import React from 'react';

import {createStackNavigator} from "@react-navigation/stack";
import PictureScreen, {screenOptions as pictureScreenOptions} from '../screens/PictureScreen';

import Colors from '../constants/Colors';


const defaultNavOptions = {
    headerTintColor: Colors.primary,
    headerTitleStyle: {},
    headerBackTitleStyle: {
        fontSize: 12,
        color: Colors.primary
    },
    headerBackTitle: "Back",
};

const ProjectStackNavigator = createStackNavigator();

function MainNavigator() {


    return (
        <ProjectStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProjectStackNavigator.Screen
                name="PictureScreen"
                component={PictureScreen}
                options={pictureScreenOptions}
            />
        </ProjectStackNavigator.Navigator>

    );
}

export default MainNavigator;