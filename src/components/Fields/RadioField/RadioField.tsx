import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import { FieldData, OptionData, SelectedOption, upsertSelectedOptions } from "../../Form/formSlice";
import PriceAdded from "../../PriceAdded/PriceAdded";
import { useAppDispatch } from "../../../redux/store";
import './styles.scss';

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

const RadioField: React.FC<Props> = ({ id, label, fieldName, isRequired, options, onChange }) => {

    const dispatch = useAppDispatch();

    const [optionChecked, setOptionChecked] = useState('');

    useEffect(() => {
        options.map((option) => {
            if (option.default) {
                setOptionChecked(option.id);
            }
            return option;
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

    }, [optionChecked]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (onChange) {
            onChange(e);
        } else {

            const target = e.target;
            const name = target.name;
            const value = target.value;
            const optionID = target.dataset.id as string;

            setOptionChecked(optionID);
        }
    }

    return (
        <FieldWrapper label={label} isTextControls={true}>
            {options.map((option) => {
                return (
                    <div key={option.id} className="fggc-field__radio">
                        <label>
                            <input className="uk-radio" type="radio" name={fieldName} value={option.value} required={isRequired}
                                   checked={optionChecked == option.id}
                                   data-id={option.id}
                                   data-price={option.price}
                                   onChange={handleOnChange}/>
                            <span className="label"> {option.name} <PriceAdded price={option.price}/></span>
                        </label>
                    </div>
                );
            })}
        </FieldWrapper>
    );
}

export default RadioField;