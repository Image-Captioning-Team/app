import React, {useState, useCallback} from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Button, Portal, Dialog, Paragraph} from 'react-native-paper'
import Colors from "../constants/Colors"
import {useDispatch} from 'react-redux';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as imageActions from "../store/actions/imageActions";
import { FC } from 'react';


interface Props{
    uploadImage: (imageName: string) => void
}

const ImgPicker: FC<Props> = props => {
    const dispatch = useDispatch();
    const [isPermissionDialogShown, setIsPermissionDialogShown] = useState(false)


    const verifyCameraPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            setIsPermissionDialogShown(true)
            return false
        }
        return true;
    };

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

        if(!image.cancelled){
            props.uploadImage(image.uri)
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
            props.uploadImage(image.uri)
        }
    };

    const persistImage = useCallback((imageUri : string) => {
        dispatch(
            imageActions.persistImage(imageUri)
        );
    }, [dispatch]);


    return (
        <View style={styles.imagePicker}>
            <View style={styles.buttonContainer}>
                <Button icon="camera" mode="contained" onPress={takeImageHandler} color={Colors.secondary}>Camera</Button>
                <Button icon="image" mode="contained" onPress={selectImageHandler} color={Colors.secondary}>Gallery</Button>
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