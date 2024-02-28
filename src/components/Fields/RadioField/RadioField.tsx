import React, {ChangeEvent, ChangeEventHandler, useEffect, useState} from 'react';
import FieldWrapper from "../../FieldWrapper/FieldWrapper";
import {FieldData, selectTotalPrice, setTotalPrice} from "../../Form/formSlice";
import './styles.scss';
import PriceAdded from "../../PriceAdded/PriceAdded";
import {useAppDispatch} from "../../../redux/store";
import {useSelector} from "react-redux";

interface Props extends Omit<FieldData, 'type'> {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
}

const RadioField: React.FC<Props> = ({id, label, fieldName, isRequired, options, onChange}) => {

    const dispatch = useAppDispatch();

    const totalPrice = useSelector(selectTotalPrice);
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
            const price = Number(totalPrice) + Number(target.dataset.price);

            setOptionChecked(value);
            dispatch(setTotalPrice({totalPrice: price}));
        }
    }

    return (
        <FieldWrapper label={label} isTextControls={true}>
            {options.map((option) => {
                return (
                    <div key={option.value} className="fggc-field__radio">
                        <label>
                            <input className="uk-radio" type="radio" name={fieldName} value={option.value} required={isRequired}
                                   checked={optionChecked === option.value}
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