import React, {useEffect, useState} from 'react';
import FieldWrapper from "../FieldWrapper/FieldWrapper";

export interface RadioOption {
    name: string;
    value: string;
}

interface Props {
    label: string;
    fieldName: string;
    options: RadioOption[];
}

const RadioField: React.FC<Props> = ({label, fieldName, options}) => {

    return (
        <FieldWrapper label={label}>
            {options.map((option) => {
                return (
                    <div key={option.value}>
                        <label>
                            <input className="uk-radio" type="radio" name={fieldName} value={option.value}/> {option.name}
                        </label>
                        <br/>
                    </div>
                );
            })}
        </FieldWrapper>
    );
}

export default RadioField;