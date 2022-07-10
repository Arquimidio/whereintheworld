import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { themeContext } from '../context/themeContext';

export default function SingleCountry({ countryInfo }){
    const { theme } = useContext(themeContext);

    return(
        <Link to={`/whereintheworld/${countryInfo.cca3}`}>
            <div className={`country-card ${theme}`}>
                <div className='img-container'>
                    <img src={countryInfo.flags.png} alt={`${countryInfo.name.official} flag`}/>
                </div>
                <div className='country-card-info'>
                    <h2>{countryInfo.name.common}</h2>
                    <p><span className="label">Population:</span> {countryInfo.population.toLocaleString('en-US')}</p>
                    <p><span className="label">Region:</span> {countryInfo.region}</p>
                    <p><span className="label">Capital:</span> {countryInfo.capital || 'none'}</p>
                </div>
            </div>
        </Link> 
    )
}