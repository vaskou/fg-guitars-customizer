import {createEntityAdapter, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../redux/store';

export interface OptionData {
    id: string;
    name: string;
    value: string;
    price: number;
    default: boolean;
}

export interface FieldData {
    id: string;
    label: string;
    fieldName: string;
    type: string;
    isRequired: boolean;
    options: OptionData[];
}

export interface GroupData {
    id: string;
    title?: string;
    width: string;
    hideTitle: boolean;
    fields: FieldData[];
}

export interface SectionData {
    id: string;
    type: string;
    title: string;
    groups: GroupData[];
}

export interface Guitar extends OptionData {
    basePrice: number;
}

export interface SelectedOption {
    id:string;
    option: OptionData;
}

export const optionDataAdapter = createEntityAdapter<SelectedOption>()

const optionDataInitialState = optionDataAdapter.getInitialState();

interface FormState {
    guitars: Guitar[];
    sections: SectionData[];
    totalPrice: number;
    selectedOptions: typeof optionDataInitialState;
}

const initialState: FormState = {
    guitars: [],
    sections: [],
    totalPrice: 0,
    selectedOptions: optionDataInitialState,
}

const formSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        load_data: (state: FormState, action: PayloadAction<FormState>) => {
            state.guitars = action.payload.guitars;
            state.sections = action.payload.sections;
        },
        setTotalPrice: (state: FormState, action: PayloadAction<Pick<FormState, 'totalPrice'>>) => {
            state.totalPrice = action.payload.totalPrice;
        },
        upsertSelectedOptions: (state: FormState, action: PayloadAction<SelectedOption>) => {
            optionDataAdapter.upsertOne(state.selectedOptions, action);
        },
    }
});

export default formSlice.reducer;

export const {
    load_data,
    setTotalPrice,
    upsertSelectedOptions
} = formSlice.actions;

export const loadData = (model?: string) => async (dispatch: AppDispatch) => {
    try {
        let requestAction = fggc_customizer_data.action;
        let adminURL = fggc_customizer_data.url;

        let url = `${adminURL}?action=${requestAction}`

        if (model) {
            url = `${url}&model=${model}`
        }

        const response = await fetch(url);

        if (response.status >= 400 && response.status < 500) {

        } else {
            const data: FormState = await response.json();
            console.log(data)
            dispatch(load_data(data));
        }

    } catch (e) {

    }
}

// Selectors
const selectDataState = (rootState: RootState) => rootState.data;

export const selectGuitarsArray = (rootState: RootState) => {
    return selectDataState(rootState).guitars;
};

export const selectSectionsArray = (rootState: RootState) => {
    return selectDataState(rootState).sections;
};

export const selectTotalPrice = (rootState: RootState) => {
    return selectDataState(rootState).totalPrice;
}

export const selectSelectedOptions = (rootState: RootState) => {
    return selectDataState(rootState).selectedOptions;
}