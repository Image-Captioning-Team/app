import {DELETE_ERRORS, ERROR} from "../actions/errorActions";
import ApiError from "../../models/apiError";


const initialState = {
    allErrors: Array<ApiError>()
}


export default (state = initialState, action) => {
    switch (action.type) {

        case ERROR:
            return {
                ...state,
                allErrors: [action.error, ...state.allErrors]
            };

        case DELETE_ERRORS:
            return {
                ...state,
                allErrors: Array<ApiError>()
            };

    }

    //default
    return state;
};