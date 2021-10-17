import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Subheading, Button} from 'react-native-paper';
import ImgPicker from "../components/ImagePicker";
import {useDispatch} from "react-redux";


const ProjectsOverview = ({navigation}) => {
    const dispatch = useDispatch()

    const [selectedImage, setSelectedImage] = useState<string>()
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)


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
            <View style={styles.upperContainer}>
                <View style={styles.subheadingContainer}>
                    <Subheading>Selected Picture:</Subheading>
                </View>
                <View style={styles.uploadButtonContainer}>
                    {selectedImage &&
                        <Button icon="upload"  mode="contained">Upload</Button>
                    }
                </View>
            </View>


            {selectedImage
                ? <View style={styles.noImageContainer}>
                    <Image
                        source={{uri: selectedImage}}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                : <View style={styles.noImageContainer}>
                    <Image
                        source={require('../assets/placeholder-image.png')}
                        style={styles.noImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.centeredText}>No picture selected</Text>
                </View>
            }



            <ImgPicker selectImage={setSelectedImage}/>
        </View>
    )

}


const styles = StyleSheet.create({
    main: {
        flex: 1,
            },
    upperContainer: {
        flex: .5,
        flexDirection: "row"
    },
    uploadButtonContainer: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    subheadingContainer: {
        flex: 1,
        paddingLeft: 10,
        height: "100%",
        justifyContent: "flex-end",
    },
    imageContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    noImageContainer: {
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
        width: "95%",
        height: "95%"
    },
    noImage: {
        width: "100%",
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