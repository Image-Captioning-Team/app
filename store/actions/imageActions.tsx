import * as FileSystem from 'expo-file-system'
import {ERROR} from "./errorActions";
import ApiError from "../../models/apiError";


export const PERSIST_IMAGE = "PERSIST_IMAGE"
export const UPLOAD_IMAGE = "UPLOAD_IMAGE"
export const DELETE_IMAGE = "DELETE_IMAGE"
export const SET_IMAGES = "SET_IMAGES"

export const persistImage = (localeImageUri: string) => {
    //https://www.farhansayshi.com/post/how-to-save-files-to-a-device-folder-using-expo-and-react-native/
    const fileName = localeImageUri.split('/').pop()

    // @ts-ignore
    const permanentPath = FileSystem.documentDirectory + "images/" + fileName;

    try {
        FileSystem.moveAsync({
            from: localeImageUri,
            to: permanentPath
        });
    } catch (err) {
        throw err
    }

    return {
        type: PERSIST_IMAGE,
        imageName: fileName
    }
}



