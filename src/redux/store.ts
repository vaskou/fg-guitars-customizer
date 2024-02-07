import {configureStore, combineReducers} from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export type AppGetState = typeof store.getState