import React from 'react';
import './styles.scss';

interface Props {
}

const Loader: React.FC<Props> = () => {
    return (
        <div className="fggc-form__loader">
            <div className="spinner-block">
                <div className="spinner-wrapper">
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    );
}

export default Loader;