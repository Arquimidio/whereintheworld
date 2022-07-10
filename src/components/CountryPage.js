import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { themeContext } from '../context/themeContext';

export default function CountryPage({ countries }){
    const { countryName } = useParams();
    const countryInfo = countries.find(country => country.cca3 === countryName);
    const { theme } = useContext(themeContext);

    const hasBorderCountries = countryInfo?.borders?.length;

    const getNativeName = () => {
        const nativeNamesObj = countryInfo.name.nativeName;
        const nativeNames = Object.values(nativeNamesObj || {});
        const nativeName = nativeNames?.[0]?.common || "none";
        return nativeName
    }
    const getCurrencies = () => Object.values(countryInfo.currencies || {}).map(cur => cur.name).join(', ') || 'none';
    const getLanguages = () => Object.values(countryInfo.languages || {}).join(', ') || 'none';

    const findByCCA3 = (countries, cca3) =>{
        const countryObj = countries.find(country => country.cca3 === cca3);
        return countryObj;
    }

    const getBorderLink = border => {
        const borderCountry = findByCCA3(countries, border);
        return (
            <span key={border} className='border-link'>
                <Link 
                    className={`btn ${theme}`} 
                    to={`/whereintheworld/${border}`}
                >{borderCountry.name.common}</Link>
            </span>
        )
    }

    const getAllBorderLinks = () => {
        const { borders } = countryInfo;
        const links = (borders || []).map(getBorderLink);
        return links;
    }

    return(
        <div className='country-page-container'>
            <div className='container'>
                <Link className={`btn ${theme} back-btn`} to="/whereintheworld">
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Back</span>
                </Link>
            </div>
            {
                countryInfo?.flags?
                <>
                    <div>
                        <div className={`container country-page-content ${theme}`}>
                            <div className='country-page-img-container'>
                                <img  
                                    src={countryInfo.flags.png} 
                                    alt={`${countryInfo.name.official} flag`}
                                />
                            </div>
                            <div className='country-page-info'>
                                <h2 className='country-page-title'>{countryInfo.name.common}</h2>
                                <div className='country-page-info-block'>
                                    <section>
                                        <p><span className="label">Native Name:</span> {getNativeName()}</p>
                                        <p>
                                            <span className="label">Population: </span> 
                                            {countryInfo.population.toLocaleString('en-US')}
                                        </p>
                                        <p><span className="label">Region:</span> {countryInfo.region}</p>
                                        <p><span className="label">Sub Region:</span> {countryInfo.subregion || 'none'}</p>
                                        <p><span className="label">Capital:</span> {countryInfo.capital || 'none'}</p>
                                    </section>
                                    <section>
                                        <p><span className="label">Top Level Domain:</span> {countryInfo.tld[0]}</p>
                                        <p><span className="label">Currencies:</span> {getCurrencies()}</p>
                                        <p><span className="label">Languages:</span> {getLanguages()}</p>
                                    </section>
                                </div>
                                {   
                                    hasBorderCountries 
                                    &&
                                    <div>
                                        <span className='label border-countries-title'>Border countries: </span> 
                                        <div className='country-page-border-container'>{getAllBorderLinks()}</div>
                                    </div>
                                }           
                            </div>
                        </div>
                    </div>
                </>
                : <div className={`loading ${theme}`}>Loading...</div>
            }
        </div>
    )
}