import axios from 'axios';
import { useEffect, useState } from 'react';
import Countries from './Countries';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [shownCountries, setShownCountries] = useState(() => countries.filter((country) => filterByName(country.name.common)))

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => setCountries(response.data))
  }, [])

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchText(event.target.value);
  }

  const filterByName = (name) => name.toLowerCase().includes(searchText);

  useEffect(() => {
    const newShownCountries = countries.filter((country) => filterByName(country.name.common))
    setShownCountries(newShownCountries)
  }, [searchText])

  return (
    <main>

      <input type="text" value={searchText} onChange={handleSearch} />

      <Countries countries={shownCountries} />
    </main>
  )
}