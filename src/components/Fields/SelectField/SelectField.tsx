import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import { FieldData, OptionData, SelectedOption, upsertSelectedOptions } from "../../Form/formSlice";
import PriceAdded from "../../PriceAdded/PriceAdded";
import { useAppDispatch } from "../../../redux/store";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLSelectElement> | undefined,
    onChangeValue?: (name: string, value: string) => void,
}

const SelectField: React.FC<Props> = ({ id, label, fieldName, isRequired, options, onChange, onChangeValue }) => {

    const dispatch = useAppDispatch();

    const [optionIDChecked, setOptionIDChecked] = useState('');
    const [optionChecked, setOptionChecked] = useState('');

    useEffect(() => {
        setOptionChecked(options[0].value);
        setOptionIDChecked(options[0].id);

        options.forEach((option) => {
            if (option.default) {
                setOptionChecked(option.value);
                setOptionIDChecked(option.id);
            }
        })
    }, [options]);

    useEffect(() => {
        if (onChangeValue) {
            onChangeValue(fieldName, optionIDChecked);
        }
    }, [options, optionIDChecked]);

    useEffect(() => {
        const selectedOption: SelectedOption = {
            id: id,
            option: options.find((option) => {
                return option.id == optionIDChecked;
            }) as OptionData
        }

        dispatch(upsertSelectedOptions(selectedOption));

    }, [options, optionChecked, optionIDChecked]);

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {

        if (onChange) {
            onChange(e);
        } else {

            const target = e.target;
            const name = target.name;
            const value = target.value;
            const optionID = target.options[target.selectedIndex].dataset.id as string;

            setOptionIDChecked(optionID);
            setOptionChecked(value);
        }
    }

    return (
        <FieldWrapper label={label}>
            <select name={fieldName} className="uk-select" onChange={handleOnChange} required={isRequired} value={optionChecked}>
                {options.map((option) => {
                    return (
                        <option key={option.id} value={option.value}
                                data-id={option.id}
                                data-price={option.price}>
                            {option.label} <PriceAdded price={option.price}/>
                        </option>
                    );
                })}
            </select>
        </FieldWrapper>
    );
}

export default SelectField;