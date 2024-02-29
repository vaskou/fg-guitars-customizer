import React from "react";
import Price from "../Price/Price";

interface Props {
    totalPrice: number;
}

const PriceEstimate: React.FC<Props> = ({totalPrice}) => {


    return (
        <div className="fggc-price-estimate uk-margin-top">
            <span className="fggc-price-estimate__label">{fggc_customizer_data.price_estimate_label}:</span> <Price price={totalPrice}/> <span className="fggc-price-estimate__tax-text">({fggc_customizer_data.price_estimate_tax_text})</span>
            <input type="hidden" name="price_estimate" value={totalPrice}/>
        </div>
    );
}

export default PriceEstimate;