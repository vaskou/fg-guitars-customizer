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
    hidden: boolean;
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
        upsertField: (state: FormState, action: PayloadAction<FieldData>) => {
            fieldDataAdapter.upsertOne(state.fields, action)
        },
        upsertFields: (state: FormState, action: PayloadAction<FieldData[]>) => {
            fieldDataAdapter.upsertMany(state.fields, action)
        },
        upsertOptions: (state: FormState, action: PayloadAction<OptionData[]>) => {
            optionDataAdapter.upsertMany(state.options, action)
        },
        clearAllData: (state: FormState) => {
            sectionDataAdapter.removeAll(state.newSections);
            groupDataAdapter.removeAll(state.groups);
            fieldDataAdapter.removeAll(state.fields);
            optionDataAdapter.removeAll(state.options);
        }
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
    upsertField,
    upsertFields,
    upsertOptions,
    clearAllData,
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
            console.log(data) //TODO: remove

            dispatch(clearAllData());

            if (data.sections) {
                // let { newSections, newGroups } = dataFormat(data.sections, dispatch)
                dataFormat(data.sections, dispatch);

                // dispatch(upsertSections(newSections))
                // dispatch(upsertGroups(newGroups))
            }

            if (data.guitars) {
                let optionIDs: string[] = [];
                data.guitars.forEach((option) => {
                    optionIDs = [...optionIDs, option.id];
                })
                const modelField: FieldData = {
                    id: 'model',
                    label: 'Model',
                    fieldName: 'model',
                    isRequired: true,
                    options: data.guitars,
                    type: 'select',
                    optionIDs: optionIDs,
                    connectedToOption: '',
                    hidden: false,
                }

                dispatch(upsertField(modelField))
                dispatch(upsertOptions(data.guitars))
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

const dataFormat = (sections: SectionData[], dispatch: AppDispatch) => {
    dispatch(upsertSections(sections));

    sections.forEach((section) => {
        let { groups, ...newSection } = section;

        dispatch(upsertGroups(groups));

        groups.forEach((group) => {
            let { fields, ...newGroup } = group;

            dispatch(upsertFields(fields));

            fields.forEach((field) => {
                let { options, ...newfield } = field;

                dispatch(upsertOptions(options));
            });
        });
    })
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

export const { selectAll: selectNewSectionsArray, selectEntities: selectSections } = sectionDataAdapter.getSelectors((rootState: RootState) => rootState.data.newSections);

// Groups selectors
export const { selectAll: selectGroupArray, selectEntities: selectGroups } = groupDataAdapter.getSelectors((rootState: RootState) => rootState.data.groups);

// Fields selectors
export const { selectAll: selectFieldArray, selectEntities: selectFields } = fieldDataAdapter.getSelectors((rootState: RootState) => rootState.data.fields);

// Options selectors
export const { selectAll: selectOptionArray, selectEntities: selectOptions } = optionDataAdapter.getSelectors((rootState: RootState) => rootState.data.options);