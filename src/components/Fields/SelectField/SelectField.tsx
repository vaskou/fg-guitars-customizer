import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { FieldData, OptionData, SelectedOption, selectOptionArray, selectOptions, upsertSelectedOptions } from "../../Form/formSlice";
import PriceAdded from "../../PriceAdded/PriceAdded";
import { useAppDispatch } from "../../../redux/store";
import { upsertData } from "../../Form/formSubmitSlice";
import { useSelector } from "react-redux";

interface Props extends Omit<FieldData, 'type' | 'options'> {
    onChange?: ChangeEventHandler<HTMLSelectElement> | undefined,
    onInvalid?: FormEventHandler<HTMLSelectElement> | undefined,
}

const SelectField: React.FC<Props> = ({ id, label, fieldName, isRequired, optionIDs, onChange, onInvalid }) => {

    const dispatch = useAppDispatch();

    const optionsArray = useSelector(selectOptionArray);
    const options = useSelector(selectOptions);

    const [optionIDChecked, setOptionIDChecked] = useState('');
    const [optionChecked, setOptionChecked] = useState('');

    useEffect(() => {
        if (isRequired) {
            const firstOptionID = optionIDs[0];
            setOptionChecked(options[firstOptionID].value);
            setOptionIDChecked(options[firstOptionID].id);
        }

        optionIDs.forEach((optionID) => {
            const option = options[optionID];
            if (option.default) {
                setOptionChecked(option.value);
                setOptionIDChecked(option.id);
            }
        })
    }, [options]);

    useEffect(() => {
        const selectedOption: SelectedOption = {
            id: id,
            option: optionsArray.find((option) => {
                return option.id == optionIDChecked;
            }) as OptionData
        }

        dispatch(upsertSelectedOptions(selectedOption));
        dispatch(upsertData({ id: fieldName, value: optionChecked, price: selectedOption?.option?.price }))

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

    const handleOnInvalid = (e: FormEvent<HTMLSelectElement>) => {
        if (onInvalid) {
            onInvalid(e);
        }
    }

    return (
        <>
            <select name={fieldName} className="uk-select" onChange={handleOnChange} onInvalid={handleOnInvalid} required={isRequired} value={optionChecked}>
                {
                    !isRequired &&
                    <option key={0} value='' data-id={0} data-price=''>None</option>
                }
                {optionIDs.map((optionID) => {
                    const option = options[optionID];
                    return (
                        <option key={option.id} value={option.value}
                                data-id={option.id}
                                data-price={option.price}>
                            {option.label} <PriceAdded price={option.price?.toString()}/>
                        </option>
                    );
                })}
            </select>
        </>
    );
}

export default SelectField;