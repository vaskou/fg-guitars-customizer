import React from 'react';

interface Props {
    label?: string;
    isTextControls?: boolean;
    children?: any;
}

const FieldWrapper: React.FC<Props> = ({label, isTextControls, children}) => {
    const textControlsClass = isTextControls ? 'uk-form-controls-text' : '';

    return (
        <div className="fggc-field-wrapper uk-margin-small-bottom">
            {label && <label className="fggc-field-label uk-form-label uk-text-bold">{label}</label>}
            <div className={`fggc-field uk-form-controls ${textControlsClass}`}>
                {children}
            </div>
        </div>
    );
}

export default FieldWrapper;