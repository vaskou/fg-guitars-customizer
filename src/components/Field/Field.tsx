import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { FieldData } from "../Form/formSlice";
import SelectField from "../Fields/SelectField/SelectField";
import RadioField from "../Fields/RadioField/RadioField";
import TextareaField from "../Fields/TexteareaField/TexteareaField";
import EmailField from "../Fields/EmailField/EmailField";
import TextField from "../Fields/TextField/TextField";

interface Props {
    field: FieldData,
    index: string,
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined
    onChangeValue?: (name: string, value: string) => void,
}

const Field: React.FC<Props> = ({ field, index, onChange, onChangeValue }) => {

    const [value, setValue] = useState('');

    useEffect(() => {
        if (onChangeValue) {
            onChangeValue(field.fieldName, value);
        }
    }, [value]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e);
        } else {
            const target = e.target;

            setValue(target.value);
        }
    }

    const getField = (field: FieldData, index: string) => {
        let fieldComponent;

        switch (field.type) {
            case 'select':
                fieldComponent = <SelectField key={index} {...field} onChangeValue={onChangeValue}/>
                break;
            case 'radio':
                fieldComponent = <RadioField key={index} {...field} onChangeValue={onChangeValue}/>
                break;
            case 'textarea':
                fieldComponent = <TextareaField key={index} {...field} onChange={handleOnChange}/>
                break;
            case 'email':
                fieldComponent = <EmailField key={index} {...field} onChange={handleOnChange}/>
                break;
            case 'text':
                fieldComponent = <TextField key={index} {...field} onChange={handleOnChange}/>
                break;
        }

        return fieldComponent;
    }

    return (
        <>
            {getField(field, index)}
        </>
    );
}

export default Field;