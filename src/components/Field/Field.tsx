import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { FieldData } from "../Form/formSlice";
import SelectField from "../Fields/SelectField/SelectField";
import RadioField from "../Fields/RadioField/RadioField";
import TextareaField from "../Fields/TexteareaField/TexteareaField";
import EmailField from "../Fields/EmailField/EmailField";
import TextField from "../Fields/TextField/TextField";
import FieldWrapper from "../FieldWrapper/FieldWrapper";

interface Props {
    field: FieldData,
    index: string,
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined
}

const Field: React.FC<Props> = ({ field, index, onChange }) => {

    const [isTextControls, setIsTextControls] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);

    useEffect(() => {
        if (field.type === 'radio') {
            setIsTextControls(true);
        }
    }, [field]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e);
        }
        setIsInvalid(false);
    }
    const handleOnInvalid = (e: FormEvent<HTMLInputElement>) => {
        // console.log(e.target)
        // e.preventDefault();
        setIsInvalid(true);
    }

    const getField = (field: FieldData, index: string) => {
        let fieldComponent;

        switch (field.type) {
            case 'select':
                fieldComponent = <SelectField key={index} {...field} onChange={onChange}/>
                break;
            case 'radio':
                fieldComponent = <RadioField key={index} {...field} onChange={handleOnChange} onInvalid={handleOnInvalid}/>
                break;
            case 'textarea':
                fieldComponent = <TextareaField key={index} {...field} onChange={onChange}/>
                break;
            case 'email':
                fieldComponent = <EmailField key={index} {...field} onChange={onChange}/>
                break;
            case 'text':
                fieldComponent = <TextField key={index} {...field} onChange={onChange}/>
                break;
        }

        return fieldComponent;
    }

    return (
        <FieldWrapper label={field.label} isTextControls={isTextControls} isInvalid={isInvalid}>
            {getField(field, index)}
        </FieldWrapper>
    );
}

export default Field;