import {DELETE_IMAGE, PERSIST_IMAGE, SET_IMAGES, UPLOAD_IMAGE} from "../actions/imageActions";


const initialState = {
    //savedImages: new Array<FileTO>(),
    loadedImages: new Array()
}


export default (state = initialState, action) => {
    switch (action.type) {

        case PERSIST_IMAGE:
            const newImageName = action.imageName;
            return {
                ...state,
                //savedImages: [newImageName, ...state.savedImages],
                loadedImages: state.loadedImages
            };


        case UPLOAD_IMAGE:
            return {
                ...state,
                //savedImages: state.savedImages,
                loadedImages: [action.fileTo, ...state.loadedImages]
            };

        case DELETE_IMAGE:
            return {
                ...state,
                //savedImages: state.savedImages,
                loadedImages: state.loadedImages.filter(
                    image => image.storageUri !== action.imageId
                )
            };


        case SET_IMAGES:
            return {
                ...state,
                //savedImages: action.downloadedImages,
                loadedImages: [...state.loadedImages, ...action.downloadedImages]
            }

    }

    //default
    return state;
};