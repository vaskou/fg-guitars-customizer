import React, { ChangeEventHandler } from "react";
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
}

const Field: React.FC<Props> = ({ field, index, onChange }) => {

    const getField = (field: FieldData, index: string) => {
        let fieldComponent;

        switch (field.type) {
            case 'select':
                fieldComponent = <SelectField key={index} {...field} onChange={onChange}/>
                break;
            case 'radio':
                fieldComponent = <RadioField key={index} {...field} onChange={onChange}/>
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
        <>
            {getField(field, index)}
        </>
    );
}

export default Field;