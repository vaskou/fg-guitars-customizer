import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import {FieldData} from "../Form/formSlice";
import Price from "../Price/Price";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

const RadioField: React.FC<Props> = ({id, label, fieldName, isRequired, options, onChange}) => {

    const [optionChecked, setOptionChecked] = useState('');

    useEffect(() => {
        options.map((option) => {
            if (option.default) {
                setOptionChecked(option.value);
            }
            return option;
        })
    }, [options]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (onChange) {
            onChange(e);
        } else {

            const target = e.target;
            const name = target.name;
            const value = target.value;

            setOptionChecked(value);
        }
    }

    return (
        <FieldWrapper label={label}>
            {options.map((option) => {
                return (
                    <div key={option.value}>
                        <label>
                            <input className="uk-radio" type="radio" name={fieldName} value={option.value} required={isRequired} checked={optionChecked === option.value} onChange={handleOnChange}/>
                            <span className="label"> {option.name} <Price price={option.price}/></span>
                        </label>
                        <br/>
                    </div>
                );
            })}
        </FieldWrapper>
    );
}

export default RadioField;