// Result.jsx
import React, { useState } from 'react';
import CountryCard from './CountryCard';

const Result = ({ result }) => {
    const [show, setShow] = useState(false);

    const handleShowClick = () => {
        setShow(!show);
    };

    return (
        <li>
            {result.name.common} <button onClick={handleShowClick}>show</button>
            {show && <CountryCard key={result.name.common} result={result} />}
        </li>
    );
};

export default Result;
