import React from "react";
import Price from "../Price/Price";

interface Props {
    price: number;
}

const PriceAdded: React.FC<Props> = ({ price }) => {

    return (
        <>
            {price && <>+<Price price={price}/></>}
        </>
    );

}

export default PriceAdded;