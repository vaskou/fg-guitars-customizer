import React from "react";
import Price from "../Price/Price";

interface Props {
    price: string;
}

const PriceAdded: React.FC<Props> = ({ price }) => {

    return (
        <>
            {price && <>(+<Price price={price}/>)</>}
        </>
    );

}

export default PriceAdded;