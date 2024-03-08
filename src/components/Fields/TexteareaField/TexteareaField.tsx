import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import { FieldData } from "../../Form/formSlice";
import { useAppDispatch } from "../../../redux/store";
import { selectItem, upsertData } from "../../Form/formSubmitSlice";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined
}

const TextareaField: React.FC<Props> = ({ label, fieldName, onChange }) => {

    const dispatch = useAppDispatch();

    const [valueState, setValueState] = useState('');

    useEffect(() => {
        if (selectItem(fieldName)?.value) {
            setValueState(selectItem(fieldName)?.value);
        } else {
            setValueState('');
        }

    }, [selectItem(fieldName)]);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {

        if (onChange) {
            onChange(e);
        }

        const target = e.target;
        const name = target.name;
        const value = target.value;

        setValueState(value)
        dispatch(upsertData({ id: name, value: value }))
    }

    return (
        <FieldWrapper label={label}>
            <textarea name={fieldName} className="uk-textarea" value={valueState} onChange={handleOnChange} placeholder={label}>
            </textarea>
        </FieldWrapper>
    );
}

export default TextareaField;