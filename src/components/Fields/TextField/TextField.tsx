import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { FieldData } from "../../Form/formSlice";
import { useAppDispatch } from "../../../redux/store";
import { selectItem, upsertOneFieldData } from "../../Form/formSubmitSlice";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    onInvalid?: FormEventHandler<HTMLInputElement> | undefined,
}

const TextField: React.FC<Props> = ({ id, label, fieldName, isRequired, options, onChange, onInvalid }) => {

    const dispatch = useAppDispatch();

    const [valueState, setValueState] = useState('');

    useEffect(() => {
        if (selectItem(fieldName)?.value) {
            setValueState(selectItem(fieldName)?.value);
        } else {
            setValueState('');
        }

    }, [selectItem(fieldName)]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (onChange) {
            onChange(e);
        }

        const target = e.target;
        const name = target.name;
        const value = target.value;

        setValueState(value);
        dispatch(upsertOneFieldData({ id: name, value: value }))
    }

    const handleOnInvalid = (e: FormEvent<HTMLInputElement>) => {
        if (onInvalid) {
            onInvalid(e);
        }
    }

    return (
        <>
            <input type="text" name={fieldName} className="uk-input" value={valueState} onChange={handleOnChange} onInvalid={handleOnInvalid}
                   placeholder={label} required={isRequired} autoComplete="off"/>
        </>
    );
}

export default TextField;