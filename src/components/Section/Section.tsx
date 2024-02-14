import React from 'react';

interface Props {
    title: string;
    children?: any;
}

const Section: React.FC<Props> = ({title, children}) => {
    return (
        <div className="fggc-form__section uk-margin-top">
            <h2>{title}</h2>
            <div className="uk-grid uk-grid-collapse">
                {children}
            </div>
        </div>
    );
}

export default Section;