import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from "../../redux/store";


export interface FieldSubmitData {
    id: string;
    value: string;
    price?: number | string;
}

export const fieldSubmitDataAdapter = createEntityAdapter<FieldSubmitData>();

const fieldSubmitDataInitialState = fieldSubmitDataAdapter.getInitialState();

export interface FormSubmitData {
    items: typeof fieldSubmitDataInitialState;
}

const initialState: FormSubmitData = {
    items: fieldSubmitDataInitialState,
}

const formSubmitSlice = createSlice({
    name: 'formSubmitData',
    initialState: initialState,
    reducers: {
        upsertOneFieldData: (state: FormSubmitData, action: PayloadAction<FieldSubmitData>) => {
            fieldSubmitDataAdapter.upsertOne(state.items, action);
        },
        removeOneFieldData: (state: FormSubmitData, action: PayloadAction<string>) => {
            fieldSubmitDataAdapter.removeOne(state.items, action.payload)
        },
        clearFormSubmitData: (state: FormSubmitData) => {
            fieldSubmitDataAdapter.removeAll(state.items);
        }
    }
});

export default formSubmitSlice.reducer;

export const {
    upsertOneFieldData,
    removeOneFieldData,
    clearFormSubmitData
} = formSubmitSlice.actions;

const selectors = fieldSubmitDataAdapter.getSelectors();

const selectFormSubmitDataState = (rootState: RootState) => rootState.formSubmitData;

export const selectItemsArray = (rootState: RootState) => {
    return selectFormSubmitDataState(rootState).items;
};

export const selectItem = (id: string) => {
    return selectors.selectById(store.getState().formSubmitData.items, id);
}