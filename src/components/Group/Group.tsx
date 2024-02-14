import React from 'react';
import './styles.scss';

interface Props {
    title?: string;
    width: string;
    children?: any;
}

const Group: React.FC<Props> = ({title, width, children}) => {
    return (
        <div className={`fggc-form__group ${width}`}>
            {title && <h3 className="uk-h5 fggc-form__group__title">{title}</h3>}
            <div className="uk-form-horizontal fggc-form__group__content">
                {children}
            </div>
        </div>
    );
}

export default Group;