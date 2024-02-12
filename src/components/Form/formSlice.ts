import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '../../redux/store';

interface FormState {
    sections: any[];
}

const initialState: FormState = {
    sections: []
}

const formSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        load_sections: (state: FormState, action: PayloadAction<FormState>) => {
            console.log(action)
            state.sections = action.payload.sections;
        }
    }
});

export default formSlice.reducer;

export const {load_sections} = formSlice.actions;

export const loadSections = () => async (dispatch: AppDispatch) => {
    try {
        let requestAction = fggc_customizer_data.action;
        let url = fggc_customizer_data.url;

        const response = await fetch(`${url}?action=${requestAction}`);

        if (response.status >= 400 && response.status < 500) {

        } else {
            const sections: FormState = await response.json();
            console.log(sections)
            dispatch(load_sections(sections));
        }

    } catch (e) {

    }
}

// Selectors
const selectSectionsState = (rootState: RootState) => rootState.sections;

export const selectSectionsArray = (rootState: RootState) => {
    return selectSectionsState(rootState).sections;
};