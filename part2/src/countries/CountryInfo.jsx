import axios from 'axios';
import { useState, useEffect } from 'react';

const { REACT_APP_WEATHER_KEY } = process.env;

export default function CountryInfo({ country }) {
  const [weather, setWeather] = useState(undefined);
  const languages = Object.values(country.languages);
  const api = REACT_APP_WEATHER_KEY;
  const baseUrl = 'http://api.weatherapi.com/v1'

  useEffect(() => {
    axios.get(`${baseUrl}/current.json?key=${api}&q=${country.name.common}`).then((response) => setWeather(response.data))
  }, [country, api])

  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <p>Population: {country.population}</p>

      <h3>Languages</h3>
      <ul>
        {languages.length > 1
          ? languages.map((language) => <li key={language}>{language}</li>)
          : languages[0]
        }
      </ul>

      <h3>Weather</h3>
      {
        weather && (
          <div style={{ display: 'flex' }}>
            <span>
              <p>Celsius: {weather.current.temp_c}ºC</p>
              <p>Fahrenheit: {weather.current.temp_f}ºF</p>
            </span>
            <picture style={{ marginInlineStart: '.5em' }}>
              <img src={weather.current.condition.icon} alt="Weather condition icon" />
            </picture>
          </div>
        )
      }

      <picture>
        <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
      </picture>
    </>
  )
}