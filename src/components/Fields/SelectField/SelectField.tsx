import React, {ChangeEvent, ChangeEventHandler} from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import {FieldData} from "../../Form/formSlice";
import PriceAdded from "../../PriceAdded/PriceAdded";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLSelectElement> | undefined
}

const SelectField: React.FC<Props> = ({id, label, fieldName, isRequired, options, onChange}) => {

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {

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
            <select name={fieldName} className="uk-select" onChange={handleOnChange} required={isRequired}>
                {options.map((option) => {
                    return (
                        <option key={option.value} value={option.value} defaultValue={option.default?option.value:''} data-price={option.price}>{option.name} <PriceAdded price={option.price}/></option>
                    );
                })}
            </select>
        </FieldWrapper>
    );
}

export default SelectField;