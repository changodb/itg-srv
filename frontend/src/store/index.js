import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import state from './state';
import rootReducer from '../reducers';

export default configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    // preloadedState: state
});
