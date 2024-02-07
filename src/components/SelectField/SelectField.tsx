import React from 'react';
import FieldWrapper from "../FieldWrapper/FieldWrapper";

export interface SelectOption {
    name: string;
    value: string;
}

interface Props {
    label: string;
    fieldName: string;
    options: SelectOption[];
}

const SelectField: React.FC<Props> = ({label, fieldName, options}) => {

    return (
        <FieldWrapper label={label}>
            <select name={fieldName} className="uk-select">
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>{option.name}</option>
                    );
                })}
            </select>
        </FieldWrapper>
    );
}

export default SelectField;