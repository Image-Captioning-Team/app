import React, {useState, useCallback, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button, Portal, Dialog, Paragraph} from 'react-native-paper'
import Colors from "../constants/Colors"
import * as ImagePicker from 'expo-image-picker'
import {FC} from 'react';
import {Camera} from "expo-camera";


interface Props {
    selectImage: (imageName: string) => void
}

const ImgPicker: FC<Props> = props => {
    const [isPermissionDialogShown, setIsPermissionDialogShown] = useState<boolean>(false)
    const [type, setType] = useState(Camera.Constants.Type.back);

    const verifyCameraPermissions = async () => {
        const {status} = await Camera.requestPermissionsAsync();
        return status === 'granted';
    }


    const takeImageHandler = async () => {
        const hasPermission = await verifyCameraPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            //allowsEditing: true,
            //aspect: [16,9],
            quality: 0.2
        });

        if (!image.cancelled) {
            props.selectImage(image.uri)
        }
    };

    const selectImageHandler = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //allowsEditing: true,
            //aspect: [16,9],
            quality: 0.2,
        });

        if (!image.cancelled) {
            props.selectImage(image.uri)
        }
    };


    return (
        <View style={styles.imagePicker}>
            <View style={styles.buttonContainer}>
                <Button icon="camera" mode="contained" onPress={takeImageHandler}
                        color={Colors.secondary}>Camera</Button>
                <Button icon="image" mode="contained" onPress={selectImageHandler}
                        color={Colors.secondary}>Gallery</Button>
            </View>

            <Portal>
                <Dialog visible={isPermissionDialogShown} onDismiss={() => setIsPermissionDialogShown(false)}>
                    <Dialog.Title>Missing Permission</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Accessing the camera has to be granted to take pictures.</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setIsPermissionDialogShown(false)}>Okay</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        flex: 1,
        justifyContent: "center",
        width: "100%"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    }
})

export default ImgPicker