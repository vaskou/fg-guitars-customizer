import React from "react";
import { FieldData } from "../Form/formSlice";
import SelectField from "../Fields/SelectField/SelectField";
import RadioField from "../Fields/RadioField/RadioField";
import TextareaField from "../Fields/TexteareaField/TexteareaField";
import EmailField from "../Fields/EmailField/EmailField";
import TextField from "../Fields/TextField/TextField";

interface Props {
    field: FieldData,
    index: string
}

const Field: React.FC<Props> = ({ field, index }) => {

    const getField = (field: FieldData, index: string) => {
        let fieldComponent;

        switch (field.type) {
            case 'select':
                fieldComponent = <SelectField key={index} {...field} />
                break;
            case 'radio':
                fieldComponent = <RadioField key={index} {...field} />
                break;
            case 'textarea':
                fieldComponent = <TextareaField key={index} {...field} />
                break;
            case 'email':
                fieldComponent = <EmailField key={index} {...field} />
                break;
            case 'text':
                fieldComponent = <TextField key={index} {...field} />
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