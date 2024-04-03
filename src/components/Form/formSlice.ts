import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../redux/store';

export interface OptionData {
    id: string;
    label: string;
    value: string;
    price: number;
    default: boolean;
}

export const optionDataAdapter = createEntityAdapter<OptionData>()
const optionDataInitialState = optionDataAdapter.getInitialState();

export interface FieldData {
    id: string;
    label: string;
    fieldName: string;
    type: string;
    isRequired: boolean;
    options: OptionData[];
    optionIDs: string[];
    connectedToOption: string;
}

export const fieldDataAdapter = createEntityAdapter<FieldData>()
const fieldDataInitialState = fieldDataAdapter.getInitialState();

export interface GroupData {
    id: string;
    title?: string;
    width: string;
    hideTitle: boolean;
    fields: FieldData[];
    fieldIDs: string[];
}

export const groupDataAdapter = createEntityAdapter<GroupData>()
const groupDataInitialState = groupDataAdapter.getInitialState();

export interface SectionData {
    id: string;
    type: string;
    title: string;
    groups: GroupData[];
    groupIDs: string[];
}

export const sectionDataAdapter = createEntityAdapter<SectionData>()
const sectionDataInitialState = sectionDataAdapter.getInitialState();

export interface Guitar extends OptionData {
    basePrice: number;
}

export interface SelectedOption {
    id: string;
    option: OptionData;
}

export const selectedOptionDataAdapter = createEntityAdapter<SelectedOption>()

const selectedOptionDataInitialState = selectedOptionDataAdapter.getInitialState();

interface FormState {
    guitars: Guitar[];
    sections: SectionData[];
    totalPrice: number;
    selectedGuitarID: string;
    selectedOptions: typeof selectedOptionDataInitialState;
    error: string;
    newSections: typeof sectionDataInitialState;
    groups: typeof groupDataInitialState;
    fields: typeof fieldDataInitialState;
    options: typeof optionDataInitialState;
}

const initialState: FormState = {
    guitars: [],
    sections: [],
    totalPrice: 0,
    selectedGuitarID: '',
    selectedOptions: selectedOptionDataInitialState,
    error: '',
    newSections: sectionDataInitialState,
    groups: groupDataInitialState,
    fields: fieldDataInitialState,
    options: optionDataInitialState,
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
        setSelectedGuitarID: (state: FormState, action: PayloadAction<Pick<FormState, 'selectedGuitarID'>>) => {
            state.selectedGuitarID = action.payload.selectedGuitarID;
        },
        upsertSelectedOptions: (state: FormState, action: PayloadAction<SelectedOption>) => {
            selectedOptionDataAdapter.upsertOne(state.selectedOptions, action);
        },
        deleteSelectedOptions: (state: FormState) => {
            selectedOptionDataAdapter.removeAll(state.selectedOptions);
        },
        setError: (state: FormState, action: PayloadAction<FormState>) => {
            // state = {...action.payload};
            return { ...action.payload }
        },
        upsertSections: (state: FormState, action: PayloadAction<SectionData[]>) => {
            sectionDataAdapter.upsertMany(state.newSections, action)
        },
        upsertGroups: (state: FormState, action: PayloadAction<GroupData[]>) => {
            groupDataAdapter.upsertMany(state.groups, action)
        },
    }
});

export default formSlice.reducer;

export const {
    load_data,
    setTotalPrice,
    setSelectedGuitarID,
    upsertSelectedOptions,
    deleteSelectedOptions,
    setError,
    upsertSections,
    upsertGroups,
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
            throw new Error()
        } else {
            const data: FormState = await response.json();
            console.log(data)

            if (data.sections) {
                let { newSections, newGroups } = dataFormat(data.sections)

                dispatch(upsertSections(newSections))
                dispatch(upsertGroups(newGroups))
            }

            dispatch(load_data(data));

            let selectedGuitar = data.guitars.find((guitar) => {
                return guitar.id == model;
            });

            if (!selectedGuitar) {
                selectedGuitar = data.guitars[0]
            }

            if (selectedGuitar) {
                dispatch(setSelectedGuitarID({ selectedGuitarID: selectedGuitar.id }));
            }
        }

    } catch (e) {
        const message = fggc_customizer_data.error_message
        dispatch(setError({ ...initialState, error: message }));
    }
}

const dataFormat = (sections: SectionData[]) => {
    let newSections: Omit<SectionData, 'groups'>[] = [];
    let newGroups: GroupData[] = [];

    sections.forEach((section) => {
        let { groups, ...newSection } = section;

        newGroups = [...newGroups, ...groupDataFormat(groups)];

        newSections = [...newSections, newSection];
    })

    return { newSections: sections, newGroups }
}

const groupDataFormat = (groups: GroupData[]) => {
    let newGroups: GroupData[] = [];

    groups.forEach((group) => {
        // let { fields, ...newGroup } = group;

        newGroups = [...newGroups, group];
    })

    return newGroups;
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

export const selectSelectedGuitarID = (rootState: RootState) => {
    return selectDataState(rootState).selectedGuitarID;
}

export const selectSelectedOptions = (rootState: RootState) => {
    return selectDataState(rootState).selectedOptions;
}

export const selectError = (rootState: RootState) => {
    return selectDataState(rootState).error;
}

export const { selectAll: selectNewSectionsArray } = sectionDataAdapter.getSelectors((rootState: RootState) => rootState.data.newSections);

export const selectGroups = (rootState: RootState) => {
    return selectDataState(rootState).groups.entities;
}
export const { selectAll: selectGroupArray } = groupDataAdapter.getSelectors((rootState: RootState) => rootState.data.groups);

export const { selectAll: selectFieldArray } = fieldDataAdapter.getSelectors((rootState: RootState) => rootState.data.fields);
export const { selectAll: selectOptionArray } = optionDataAdapter.getSelectors((rootState: RootState) => rootState.data.options);