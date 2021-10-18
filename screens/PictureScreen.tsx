import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Subheading, Button} from 'react-native-paper';
import * as FileSystem from "expo-file-system";
import {v4 as uuidv4} from 'uuid';
import ImgPicker from "../components/ImagePicker";
import {CaptioningApi, CaptureResponse, Configuration, ImageRequest} from "../api";

import getEnvVars from "../environment";
const {apiUrl} = getEnvVars();
const config = new Configuration({basePath: apiUrl})


const ProjectsOverview = ({navigation}) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const [imageCapture, setImageCapture] = useState<string | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)


    const uploadImage = async() => {
        setIsRefreshing(true)
        const imageCaptioningControllerApi = new CaptioningApi(config)

        try {
            if(!selectedImage){
                throw new Error("No image selected")
            }

            const encodedFileContent = await FileSystem.readAsStringAsync(selectedImage, {encoding: FileSystem.EncodingType.Base64})
            const fileExtension: string = selectedImage.split('.').pop() ?? ""
            const base64Image: string = `data:image/${fileExtension};base64,${encodedFileContent}`

            const imageRequest: ImageRequest = {
                id: uuidv4(),
                image: base64Image
            }

            const response = await imageCaptioningControllerApi.capturePost(imageRequest)

            if (response.status === 200) {
                const captureResponse: CaptureResponse = response.data
                setImageCapture(captureResponse.capture)

            } else {
                setErrorMessage("Error while uploading image.")
                console.log("Server-Error while uploading image: " + response.status)
            }
        } catch (error) {
            setErrorMessage("Error while uploading image.")
            console.log("Error while uploading image: " + error.message)
            console.log(error)
        }

        setIsRefreshing(false)
    }

    return (
        <View style={styles.main}>
            <View style={styles.upperContainer}>
                <View style={styles.subheadingContainer}>
                    <Subheading>Selected Picture:</Subheading>
                </View>
                <View style={styles.uploadButtonContainer}>
                    {selectedImage &&
                    <Button icon="upload" mode="contained" onPress={uploadImage}>Upload</Button>
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

            <View style={styles.captureTextContainer}>
                <Subheading>Calculated Capture:</Subheading>
                <View style={styles.textContainer}>
                    <Text>{imageCapture ?? "Select and upload an image to receive a capture."}</Text>
                </View>
            </View>

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
    },
    captureTextContainer: {
        flex: 1,
        margin: 10,
    },
    textContainer: {
        borderRadius: 10,
        borderWidth: 1,
        minHeight: 80,
        padding: 5
    }
})


export const screenOptions = () => {
    return {
        headerTitle: 'Take Picture'
    };
};

export default ProjectsOverview;