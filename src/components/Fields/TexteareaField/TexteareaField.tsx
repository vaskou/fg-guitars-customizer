import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { FieldData } from "../../Form/formSlice";
import { useAppDispatch } from "../../../redux/store";
import { selectItem, upsertData } from "../../Form/formSubmitSlice";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined,
    onInvalid?: FormEventHandler<HTMLTextAreaElement> | undefined,
}

const TextareaField: React.FC<Props> = ({ label, fieldName, isRequired, onChange, onInvalid }) => {

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

    const handleOnInvalid = (e: FormEvent<HTMLTextAreaElement>) => {
        if (onInvalid) {
            onInvalid(e);
        }
    }

    return (
        <>
            <textarea name={fieldName} className="uk-textarea" value={valueState} required={isRequired} onChange={handleOnChange} onInvalid={handleOnInvalid}
                      placeholder={label}>
            </textarea>
        </>
    );
}

export default TextareaField;