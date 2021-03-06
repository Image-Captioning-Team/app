import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {Text, Subheading, Button, Divider} from 'react-native-paper';
import * as FileSystem from "expo-file-system";
import {v4 as uuidv4} from 'uuid';
import ImgPicker from "../components/ImagePicker";
import {CaptioningApi, CaptureResponse, Configuration, ImageRequest} from "../api";

import getEnvVars from "../environment";
import Colors from "../constants/Colors";

const {apiUrl} = getEnvVars();
const config = new Configuration({basePath: apiUrl})


const ProjectsOverview = ({navigation}) => {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined)
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
    const [attentionCapture, setAttentionCapture] = useState<string | undefined>(undefined)
    const [lstmCapture, setLstmCapture] = useState<string | undefined>(undefined)
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)


    const setImage = useCallback((image: string) => {
        setAttentionCapture(undefined)
        setLstmCapture(undefined)
        setErrorMessage(undefined)
        setSelectedImage(image)
    }, [selectedImage, setSelectedImage, attentionCapture, errorMessage])


    const uploadImage = async () => {
        setIsRefreshing(true)
        setErrorMessage(undefined)
        setAttentionCapture(undefined)
        setLstmCapture(undefined)
        const imageCaptioningControllerApi = new CaptioningApi(config)

        try {
            if (!selectedImage) {
                throw new Error("No image selected")
            }

            const encodedFileContent = await FileSystem.readAsStringAsync(selectedImage, {encoding: FileSystem.EncodingType.Base64})

            const imageRequest: ImageRequest = {
                id: uuidv4(),
                image: encodedFileContent
            }

            const response = await imageCaptioningControllerApi.capturePost(imageRequest)

            if (response.status === 200) {
                const captureResponse: CaptureResponse = response.data
                setAttentionCapture(captureResponse.attention_caption)
                setLstmCapture(captureResponse.lstm_caption)

            } else {
                setErrorMessage("Server-Error while uploading image. Please try again.")
                console.log("Server-Error while uploading image: " + response.status)
                console.log(response)
            }
        } catch (error) {
            setErrorMessage("Error while uploading image. Please try again.")
            console.log("Error while uploading image: " + error.message)
            console.log(error)
        }

        setIsRefreshing(false)
    }


    const captureBoxContent = useMemo(() => {
        if (attentionCapture && lstmCapture) {
            return (
                <View style={{...styles.textContainer, backgroundColor: Colors.successBackground}}>
                    <Text>Response of Attention Model: "{attentionCapture}"</Text>
                    <Divider style={styles.divider}/>
                    <Text>Response of LSTM Model: "{lstmCapture}"</Text>
                </View>
            )}
        else if (errorMessage) {
            return (
                <View style={{...styles.textContainer, backgroundColor: Colors.errorBackground}}>
                    <Text>{errorMessage}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.textContainer}>
                    <Text>Select and upload an image to receive a capture.</Text>
                </View>
            )
        }
    }, [errorMessage, attentionCapture, lstmCapture])

    return (
        <View style={styles.main}>
            <View style={styles.upperContainer}>
                <View style={styles.subheadingContainer}>
                    <Subheading>Selected Picture:</Subheading>
                </View>
                <View style={styles.uploadButtonContainer}>
                    {selectedImage &&
                        <Button loading={isRefreshing} icon="upload" mode="contained" onPress={uploadImage}>{isRefreshing ? "Uploading" : "Upload"}</Button>
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
                <Subheading>Calculated Captures:</Subheading>
                {captureBoxContent}
            </View>

            <ImgPicker selectImage={setImage}/>
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
        marginRight: 10,
        alignItems: "flex-end",
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
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
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
    },
    divider: {
        marginVertical: 5
    }
})


export const screenOptions = () => {
    return {
        headerTitle: 'Image Captioning'
    };
};

export default ProjectsOverview;