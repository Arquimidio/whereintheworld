import SingleCountry from "./SingleCountry";
import { useContext } from "react";
import { themeContext } from "../context/themeContext";

export default function AllCountries({
    searchedCountry, 
    clearSearchedCountry,
    changeSearchedCountry, 
    countries, 
    selectedFilter,
    changeSelectedFilter
}){
    
    const { theme } = useContext(themeContext);
    const filterByRegion = country => selectedFilter? country.region === selectedFilter : true; 
    const filterByName = country => (
        searchedCountry? country.name.common.toLowerCase().startsWith(searchedCountry.toLowerCase()) : true
    )
    const filterCountry = country => filterByName(country) && filterByRegion(country);

    const filteredCountries = searchedCountry || selectedFilter? countries.filter(filterCountry) : countries
    const allCountries = filteredCountries.map(country => (
        <SingleCountry countryInfo={country} key={country.name.official}/>
    ))

    const selectWhatToDisplay = () => {
        if(allCountries.length){
            return allCountries;
        }else if(!allCountries.length && !searchedCountry){
            return <div className="loading">Loading...</div>;
        }else{
            return <div>Couldn't find any matching country...</div>;
        }
    }
    

    return(
        <div className={theme}>
            <div className="searchbar container">
                <div className="input-container">
                    <input 
                        className={theme}
                        onChange={changeSearchedCountry}
                        value={searchedCountry}
                        placeholder="Search for a country..."
                    />
                    <i className={`fa-solid fa-magnifying-glass icon ${theme}`}></i>
                    {   searchedCountry 
                        && 
                        <i className={`fa-solid fa-x clearInput ${theme}`} onClick={clearSearchedCountry}></i>
                    }
               </div>
                <select className={theme} value={selectedFilter} onChange={changeSelectedFilter}>
                    <option value=''>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">America</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className="all-countries-container container">
                { selectWhatToDisplay() }
            </div>
        </div>
    )
}