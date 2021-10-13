import { combineReducers } from 'redux';

import imageReducer from './imageReducer';
import errorReducer from './errorReducer';

export const rootReducer = combineReducers({
    images: imageReducer,
    errors: errorReducer
});

export type RootState = ReturnType<typeof rootReducer>;