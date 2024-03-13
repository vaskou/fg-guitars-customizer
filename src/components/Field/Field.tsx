import React, { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { FieldData } from "../Form/formSlice";
import SelectField from "../Fields/SelectField/SelectField";
import RadioField from "../Fields/RadioField/RadioField";
import TextareaField from "../Fields/TexteareaField/TexteareaField";
import EmailField from "../Fields/EmailField/EmailField";
import TextField from "../Fields/TextField/TextField";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import './styles.scss';

interface Props {
    field: FieldData,
    index: string,
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | undefined
}

const Field: React.FC<Props> = ({ field, index, onChange }) => {

    const [fieldComponent, setFieldComponent] = useState<JSX.Element | undefined>();
    const [isTextControls, setIsTextControls] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [validationMessage, setValidationMessage] = useState('');

    useEffect(() => {
        let _fieldComponent: JSX.Element | undefined;

        switch (field.type) {
            case 'select':
                _fieldComponent = <SelectField key={index} {...field} onChange={handleOnChange} onInvalid={handleOnInvalid}/>
                break;
            case 'radio':
                _fieldComponent = <RadioField key={index} {...field} onChange={handleOnChange} onInvalid={handleOnInvalid}/>
                setIsTextControls(true);
                break;
            case 'textarea':
                _fieldComponent = <TextareaField key={index} {...field} onChange={handleOnChange} onInvalid={handleOnInvalid}/>
                break;
            case 'email':
                _fieldComponent = <EmailField key={index} {...field} onChange={handleOnChange} onInvalid={handleOnInvalid}/>
                break;
            case 'text':
                _fieldComponent = <TextField key={index} {...field} onChange={handleOnChange} onInvalid={handleOnInvalid}/>
                break;
        }

        setFieldComponent(_fieldComponent);
    }, [index, field, onChange]);

    useEffect(() => {
        if (!isInvalid) {
            setValidationMessage('');
            return;
        }

        switch (field.type) {
            case 'select':
            case 'radio':
                setValidationMessage(fggc_customizer_data.option_validation_message);
                break;
            case 'textarea':
            case 'email':
            case 'text':
                setValidationMessage(fggc_customizer_data.text_validation_message);
                break;
        }
    }, [index, isInvalid, field]);

    useEffect(() => {
        setIsInvalid(false);
    }, [index]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e);
        }
        setIsInvalid(false);
    }
    const handleOnInvalid = (e: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setIsInvalid(true);
    }

    return (
        <FieldWrapper label={field.label} isTextControls={isTextControls} isInvalid={isInvalid} validationMessage={validationMessage}>
            {fieldComponent}
        </FieldWrapper>
    );
}

export default Field;