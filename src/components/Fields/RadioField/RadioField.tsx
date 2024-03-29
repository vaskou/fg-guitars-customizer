import React, { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, useEffect, useState } from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import { FieldData, OptionData, SelectedOption, upsertSelectedOptions } from "../../Form/formSlice";
import PriceAdded from "../../PriceAdded/PriceAdded";
import { useAppDispatch } from "../../../redux/store";
import './styles.scss';
import { upsertData } from "../../Form/formSubmitSlice";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined,
    onInvalid?: FormEventHandler<HTMLInputElement> | undefined,
}

const RadioField: React.FC<Props> = ({ id, label, fieldName, isRequired, options, onChange, onInvalid }) => {

    const dispatch = useAppDispatch();

    const [optionChecked, setOptionChecked] = useState('');

    useEffect(() => {
        setOptionChecked('');

        options.forEach((option) => {
            if (option.default) {
                setOptionChecked(option.id);
            }
        })
    }, [options]);

    useEffect(() => {
        const selectedOption: SelectedOption = {
            id: id,
            option: options.find((option) => {
                return option.id == optionChecked;
            }) as OptionData
        }

        dispatch(upsertSelectedOptions(selectedOption));
        dispatch(upsertData({ id: fieldName, value: optionChecked, price: selectedOption?.option?.price }))

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

    return (
        <>
            {options.map((option) => {
                return (
                    <div key={option.id} className="fggc-field__radio">
                        <label>
                            <input className="uk-radio" type="radio" name={fieldName} value={option.value} required={isRequired}
                                   checked={optionChecked == option.id}
                                   data-id={option.id}
                                   data-price={option.price}
                                   onChange={handleOnChange}
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