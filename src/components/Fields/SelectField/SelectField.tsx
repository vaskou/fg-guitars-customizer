import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import { FieldData, OptionData, SelectedOption, upsertSelectedOptions } from "../../Form/formSlice";
import PriceAdded from "../../PriceAdded/PriceAdded";
import { useAppDispatch } from "../../../redux/store";
import { upsertData } from "../../Form/formSubmitSlice";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLSelectElement> | undefined,
}

const SelectField: React.FC<Props> = ({ id, label, fieldName, isRequired, options, onChange }) => {

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
        const selectedOption: SelectedOption = {
            id: id,
            option: options.find((option) => {
                return option.id == optionIDChecked;
            }) as OptionData
        }

        dispatch(upsertSelectedOptions(selectedOption));
        dispatch(upsertData({ id: fieldName, value: optionChecked }))

    }, [options, optionChecked, optionIDChecked]);

    const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {

        if (onChange) {
            onChange(e);
        }

        const target = e.target;
        const value = target.value;
        const optionID = target.options[target.selectedIndex].dataset.id as string;

        setOptionIDChecked(optionID);
        setOptionChecked(value);
    }

    return (
        <FieldWrapper label={label}>
            <select name={fieldName} className="uk-select" onChange={handleOnChange} required={isRequired} value={optionChecked}>
                {options.map((option) => {
                    return (
                        <option key={option.id} value={option.value}
                                data-id={option.id}
                                data-price={option.price}>
                            {option.label} <PriceAdded price={option.price?.toString()}/>
                        </option>
                    );
                })}
            </select>
        </FieldWrapper>
    );
}

export default SelectField;