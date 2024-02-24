import React from "react";

interface Props {
    price: number;
}

const Price: React.FC<Props> = ({price}) => {

    if (price) {
        return `(+${price} €)`;
    }

    return '';
}

export default Price;