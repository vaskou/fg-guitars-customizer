import React from 'react';

interface Props {
    label: string;
    children: any;
}

const FieldWrapper: React.FC<Props> = ({label, children}) => {
    return (
        <div className="fggc-field-wrapper uk-margin-bottom">
            <label className="fggc-field-label uk-form-label uk-text-bold">{label}</label>
            <div className="fggc-field uk-form-controls">
                {children}
            </div>
        </div>
    );
}

export default FieldWrapper;