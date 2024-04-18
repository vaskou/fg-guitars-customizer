import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, MouseEvent, useEffect, useState } from 'react';
import { FieldData, OptionData, SelectedOption, selectOptionArray, selectOptions, upsertSelectedOptions } from "../../Form/formSlice";
import PriceAdded from "../../PriceAdded/PriceAdded";
import { useAppDispatch } from "../../../redux/store";
import './styles.scss';
import { upsertOneFieldData } from "../../Form/formSubmitSlice";
import { useSelector } from "react-redux";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    onInvalid?: FormEventHandler<HTMLInputElement> | undefined,
}

const RadioField: React.FC<Props> = ({ id, label, fieldName, isRequired, optionIDs, onChange, onInvalid }) => {

    const dispatch = useAppDispatch();
    const optionsArray = useSelector(selectOptionArray);
    const options = useSelector(selectOptions);

    const [optionChecked, setOptionChecked] = useState('');

    useEffect(() => {
        setOptionChecked('');

        optionIDs.forEach((optionID) => {
            const option = options[optionID];
            if (option?.default) {
                setOptionChecked(`${option.id}`);
            }
        })
    }, [options]);

    useEffect(() => {
        const selectedOption: SelectedOption = {
            id: id,
            option: optionsArray.find((option) => {
                return option.id == optionChecked;
            }) as OptionData
        }

        dispatch(upsertSelectedOptions(selectedOption));
        dispatch(upsertOneFieldData({ id: fieldName, value: optionChecked, price: selectedOption?.option?.price }))

    }, [optionChecked]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (onChange) {
            onChange(e);
        }

        const target = e.target;
        const name = target.name;
        const value = target.value;
        const optionID = target.dataset.id as string;

        setOptionChecked(optionID);
    }

    const handleOnInvalid = (e: FormEvent<HTMLInputElement>) => {
        if (onInvalid) {
            onInvalid(e);
        }
    }

    const handleOnClick = (e: MouseEvent<HTMLInputElement>) => {
        const target = e.target as EventTarget & HTMLInputElement;

        const optionID = target.dataset.id as string;

        if (optionChecked === optionID) {
            setOptionChecked('');
        }
    }

    return (
        <>
            {optionIDs.map((optionID) => {
                const option = options[optionID];

                if (!option?.id) {
                    return '';
                }

                return (
                    <div key={option.id} className="fggc-field__radio">
                        <label>
                            <input className="uk-radio" type="radio" name={fieldName} value={option.value} required={isRequired}
                                   checked={optionChecked == option.id}
                                   data-id={option.id}
                                   data-price={option.price}
                                   onChange={handleOnChange}
                                   onClick={handleOnClick}
                                   onInvalid={handleOnInvalid}/>
                            <span className="label"> {option.label} <PriceAdded price={option.price.toString()}/></span>
                        </label>
                    </div>
                );
            })}
        </>
    );
}

export default RadioField;