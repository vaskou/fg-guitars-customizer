import React from 'react';
import "./styles.scss";

interface Props {
    url: string;
}

const InfoImage: React.FC<Props> = ({ url }) => {
    return (
        <>
            {url &&
                <div className={"fggc-info-image"} data-uk-lightbox>
                    <a href={url} className={"uk-icon-link"} data-uk-icon={"icon: info; ratio: 0.8;"}></a>
                </div>
            }
        </>
    );
}

export default InfoImage;