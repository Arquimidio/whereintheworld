import { useEffect, useState, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AllCountries from './components/AllCountries'
import CountryPage from './components/CountryPage'
import Navbar from './components/Navbar'
import { themeContext } from './context/themeContext'

function App() {
  const API_URL = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const { theme } = useContext(themeContext);

  useEffect(() =>{
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      const alphabetical = data.sort((a, b) => a.name.official.localeCompare(b.name.official));
      setCountries(alphabetical);
    }

    fetchData();
  }, [])

  const makeController = (cb) =>{
    return (event) => {
      const { value } = event.target;
      cb(value);
    }
  }
  const changeSearchedCountry = makeController(setSearchedCountry);
  const changeSelectedFilter = makeController(setSelectedFilter);
  const clearSearchedCountry = () => setSearchedCountry('');

  const AllCountriesComponent = (
    <AllCountries
      countries={countries}
      searchedCountry={searchedCountry}
      changeSearchedCountry={changeSearchedCountry}
      selectedFilter={selectedFilter}
      changeSelectedFilter={changeSelectedFilter}
      clearSearchedCountry={clearSearchedCountry}
    />
  ) 

  const CountryPageComponent = (
    <CountryPage countries={countries}/>
  )

  return (
    <div className={`main-container ${theme}`}>
      <Navbar />
      <Routes>
        <Route exact path='/whereintheworld' element={AllCountriesComponent} />
        <Route path='/whereintheworld/:countryName' element={CountryPageComponent}/>
      </Routes>
    </div>
  );
}

export default App;
