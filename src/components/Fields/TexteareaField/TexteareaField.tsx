import React, { ChangeEvent, ChangeEventHandler } from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import { FieldData } from "../../Form/formSlice";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}

const TextareaField: React.FC<Props> = ({ label, fieldName, onChange }) => {

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

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
            <textarea name={fieldName} className="uk-textarea" onChange={handleOnChange} placeholder={label}>
            </textarea>
        </FieldWrapper>
    );
}

export default TextareaField;