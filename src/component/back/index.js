import React from 'react';

const Back = ({ history, children }) => {
    const hrefLink = "#";

    return (
       <a 
        href={hrefLink} 
        onClick={history.goBack} 
        className="back">&#x2190; {children}</a> 
    );
};

export default Back;
