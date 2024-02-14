import React, {ChangeEvent, ChangeEventHandler} from 'react';
import FieldWrapper from "../FieldWrapper/FieldWrapper";

export interface SelectOption {
    name: string;
    value: string;
}

interface Props {
    label: string;
    fieldName: string;
    options: SelectOption[];
    onChange?: ChangeEventHandler<HTMLSelectElement> | undefined
}

const SelectField: React.FC<Props> = ({label, fieldName, options, onChange}) => {

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {

        if (onChange) {
            onChange(e);
        } else {

            const target = e.target;
            const name = target.name;
            const value = target.value;

        }
    }

    return (
        <FieldWrapper label={label}>
            <select name={fieldName} className="uk-select" onChange={handleOnChange}>
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