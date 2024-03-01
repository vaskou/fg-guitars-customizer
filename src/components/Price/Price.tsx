import React from "react";

interface Props {
    price: number;
}

const Price: React.FC<Props> = ({ price }) => {

    return <>{price && `${price} €`}</>
}

export default Price;