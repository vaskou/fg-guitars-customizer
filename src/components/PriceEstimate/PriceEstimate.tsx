import React, { ChangeEvent, useEffect } from "react";
import Price from "../Price/Price";
import { useAppDispatch } from "../../redux/store";
import { upsertData } from "../Form/formSubmitSlice";

interface Props {
    totalPrice: string;
}

const PriceEstimate: React.FC<Props> = ({ totalPrice }) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(upsertData({ id: "price_estimate", value: totalPrice }))
    }, [totalPrice]);

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        dispatch(upsertData({ id: name, value: value }))
    }

    return (
        <div className="fggc-price-estimate uk-margin-top">
            <span className="fggc-price-estimate__label">{fggc_customizer_data.price_estimate_label}:</span> <Price price={totalPrice}/> <span className="fggc-price-estimate__tax-text">({fggc_customizer_data.price_estimate_tax_text})</span>
            <input type="hidden" name="price_estimate" value={totalPrice} onChange={handleOnChange}/>
        </div>
    );
}

export default PriceEstimate;