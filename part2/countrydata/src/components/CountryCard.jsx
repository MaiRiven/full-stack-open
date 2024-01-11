// CountryCard.jsx
import React from "react";

const CountryCard = ({ result }) => {
    const keys = Object.keys(result.languages);

    return (
        <div>
            <h1>{result.name.common}</h1>
            <p>{result.capital}</p>
            <p>{result.area}</p>
            <h3>languages:</h3>
            <ul>
                {keys.map((key) => (
                    <li key={key}>{result.languages[key]}</li>
                ))}
            </ul>
            <img src={result.flags.png} alt='flag' height='200' width='200' />
        </div>
    );
};

export default CountryCard;
