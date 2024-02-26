import React from 'react';
import './styles.scss';

interface Props {
    title: string;
    children?: any;
}

const Section: React.FC<Props> = ({title, children}) => {
    return (
        <div className="fggc-form__section uk-margin-top">
            <h2 className="uk-h4 uk-margin-small-bottom">{title}</h2>
            <div className="uk-grid uk-grid-collapse fggc-grid-match">
                {children}
            </div>
        </div>
    );
}

export default Section;