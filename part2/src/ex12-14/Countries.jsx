import Country from './Country'
import CountryInfo from './CountryInfo'

export default function Countries({ countries }) {
  if (countries.length > 10) return <p>Too many matches</p>
  else if (countries.length > 1 && countries.length < 10) {
    return countries.map((country) => <Country key={country.cca2} country={country} />)
  }
  else if (countries.length === 1) return <CountryInfo country={countries[0]} />

  return <p>No matches</p>
}