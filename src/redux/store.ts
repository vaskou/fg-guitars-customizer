import {configureStore, combineReducers} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import formReducer from "../components/Form/formSlice";

const rootReducer = combineReducers({
    data: formReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch
export type AppGetState = typeof store.getState

export const useAppDispatch: () => AppDispatch = useDispatch