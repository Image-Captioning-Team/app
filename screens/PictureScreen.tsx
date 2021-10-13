import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';

import Colors from '../constants/Colors'


const ProjectsOverview = ({navigation}) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={styles.projectContainer}>

            <Text>Helloooooo</Text>
        </View>
    )

}


const styles = StyleSheet.create({
    projectContainer: {
        marginTop: 5,
        flex: 1
    },
    emptyListView: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30
    }
})


export const screenOptions = ({navigation}) => {
    return {
        headerTitle: 'Take Picture'
    };
};

export default ProjectsOverview;