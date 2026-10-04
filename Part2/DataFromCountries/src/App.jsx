import axios from "axios"
import { useState , useEffect } from "react"

const Filter = ({countries , search, showCountry}) => {
  const countriesFiltred = countries.filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()))

  if (countriesFiltred.length === 1) {
    const countrySelected = countriesFiltred[0]
    return (
      <ShowCountrySelected country={countrySelected}/>
    )
  }
  if (countriesFiltred.length <= 10) {
    return (
      <>
        {countriesFiltred.map(country =>
          <div key={country.ccn3}>
            <p>{country.name.common} <button onClick={() => showCountry(country.name.common)}>Show</button></p>
            
          </div>
        )}
      </>
    )
  } else {
    return (
      <>
        <p>Too many countries, Specify</p>
      </>
    )
  }
}

const ShowCountrySelected = ({country}) => {
  return(
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code , language]) => 
          <li key={code}>
            <p><strong>{code}:</strong>  {language}</p>
          </li>
        )}
      </ul>
      <img src={country.flags.png} alt={`${country.name}`} />
    </>
  )
}

const App = () => {
  const url = "https://studies.cs.helsinki.fi/restcountries/api/all"
  const [countries , setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect( () => {
    axios
      .get(url)
      .then( response => {
        setCountries(response.data)
      })
  },[])

  const handleSearch = (event) => setSearch(event.target.value)
  const showCountry = (name) => {
    setSearch(name)
  }

  return (
    <>
      <p>find countries <input type="text" value={search} onChange={handleSearch}/></p>
      <Filter countries={countries} search={search} showCountry={showCountry}/>
    </>
  )
}

export default App
