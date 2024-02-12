import {configureStore, combineReducers} from "@reduxjs/toolkit";
import formReducer from "../components/Form/formSlice";

const rootReducer = combineReducers({
    sections: formReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export type AppGetState = typeof store.getState