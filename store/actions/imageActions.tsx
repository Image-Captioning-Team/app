import * as FileSystem from 'expo-file-system'
import {ERROR} from "./errorActions";
import ApiError from "../../models/apiError";
import { v4 as uuidv4 } from 'uuid';
import {CaptioningApi, CaptureResponse, ImageRequest} from "../../api";


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

export const uploadImage = (localImageUri: string) => {
    return async (dispatch) => {
        const imageCaptioningControllerApi = new CaptioningApi()
        const encodedFileContent = await FileSystem.readAsStringAsync(localImageUri, {encoding: FileSystem.EncodingType.Base64})
        const fileExtension: string = localImageUri.split('.').pop() ?? ""
        const base64Image: string = `data:image/${fileExtension};base64,${encodedFileContent}`

        const imageRequest: ImageRequest = {
            id: uuidv4(),
            image: base64Image
        }

        try {
            const response = await imageCaptioningControllerApi.capturePost(imageRequest)

            if (response.status === 200) {
                const captureResponse: CaptureResponse = response.data
                dispatch({type: UPLOAD_IMAGE, capturedPicture: captureResponse})
            } else {
                dispatch({
                    type: ERROR, error: new ApiError(
                        "Error uploading Image: " + response.status,
                        {
                            axiosResponse: response,
                            requestModel: {image: base64Image.substr(0, 100) + "..."}
                        })
                })
            }
        } catch (error) {
            dispatch({
                type: ERROR, error: new ApiError(
                    "Error uploading Image: " + error.message,
                    {requestModel: {image: base64Image.substr(0, 100) + "..."}}
                )
            })
        }
    }
}



