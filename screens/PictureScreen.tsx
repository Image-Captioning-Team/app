import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Subheading} from 'react-native-paper';
import ImgPicker from "../components/ImagePicker";
import {useDispatch} from "react-redux";

import * as imageActions from "../store/actions/imageActions";

const ProjectsOverview = ({navigation}) => {
    const dispatch = useDispatch()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const uploadImageHandler = useCallback(async (localImageUri) => {
        setIsRefreshing(true)
        //dispatch(
        //    imageActions.persistImage(selectedJob.id, selectedWorking.id, imageUri)
        //);
        //await dispatch(
        //    imageActions.uploadImage(selectedJob.id, selectedWorking.id, localImageUri)
        //);
        setIsRefreshing(false)
    }, [dispatch]);

    return (
        <View style={styles.main}>
            <View style={styles.subheadingContainer}>
                <Subheading>Upload Picture:</Subheading>
            </View>

            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/placeholder-image.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.centeredText}>No picture selected</Text>
            </View>

            <ImgPicker uploadImage={uploadImageHandler}/>
        </View>
    )

}


const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    subheadingContainer: {
        flex: .5,
        paddingLeft: 10,
        height: "100%",
        justifyContent: "flex-end",
    },
    imageContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderStyle: "dashed",
        marginHorizontal: 10,
        backgroundColor: "white"
    },
    image: {
        width: "100%"
    },
    centeredText: {
        textAlign: "center"
    }
})


export const screenOptions = () => {
    return {
        headerTitle: 'Take Picture'
    };
};

export default ProjectsOverview;