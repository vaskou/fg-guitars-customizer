import React, { useEffect, useState } from "react";
import './styles.scss';

interface Props {
    submitMessage: string;
    isSuccess: boolean;
}

const SubmitMessage: React.FC<Props> = ({ submitMessage, isSuccess }) => {

    const [successClass, setSuccessClass] = useState('');
    const [showClass, setShowClass] = useState('hide');

    useEffect(() => {
        if (isSuccess) {
            setSuccessClass('uk-form-success');
        } else {
            setSuccessClass('uk-form-danger');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (submitMessage) {
            setShowClass('show');
        } else {
            setShowClass('hide');
        }
    }, [submitMessage]);

    return (
        <div className={`fggc-form-submit-message ${successClass} ${showClass}`}>{submitMessage}</div>
    );
}

export default SubmitMessage;