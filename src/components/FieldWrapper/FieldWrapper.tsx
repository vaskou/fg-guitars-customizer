import React from 'react';

interface Props {
    label?: string;
    isTextControls?: boolean;
    isInvalid?: boolean;
    validationMessage?: string;
    children?: any;
}

const FieldWrapper: React.FC<Props> = ({ label, isTextControls, isInvalid, validationMessage, children }) => {
    const textControlsClass = isTextControls ? 'uk-form-controls-text' : '';
    const invalidClass = isInvalid ? 'uk-form-danger' : '';

    return (
        <div className={`fggc-field-wrapper uk-margin-small-bottom ${invalidClass}`}>
            {label && <label className="fggc-field-label uk-form-label uk-text-bold">{label}</label>}
            <div className={`fggc-field uk-form-controls ${textControlsClass}`}>
                {children}
                {validationMessage && <div className={'fggc-field__validation-message'}>{validationMessage}</div>}
            </div>
        </div>
    );
}

export default FieldWrapper;