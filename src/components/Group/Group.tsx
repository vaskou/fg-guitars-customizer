import React from 'react';
import './styles.scss';
import { GroupData } from "../Form/formSlice";

interface Props extends Omit<GroupData, 'fields'> {
    children?: any;
}

const Group: React.FC<Props> = ({ id, title, width, hideTitle, children }) => {
    return (
        <div className={`fggc-form__group fggc-form__group-${id} ${width}`}>
            {!hideTitle && title && <h3 className="uk-h5 fggc-form__group__title">{title}</h3>}
            <div className="uk-form-horizontal fggc-form__group__content">
                {children}
            </div>
        </div>
    );
}

export default Group;