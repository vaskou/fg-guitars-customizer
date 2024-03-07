import React, { ChangeEvent, ChangeEventHandler } from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import { FieldData } from "../../Form/formSlice";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

const TextField: React.FC<Props> = ({ id, label, fieldName, isRequired, options, onChange }) => {

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

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
            <input type="text" name={fieldName} className="uk-input" onChange={handleOnChange} placeholder={label} required={isRequired} autoComplete="off"/>
        </FieldWrapper>
    );
}

export default TextField;