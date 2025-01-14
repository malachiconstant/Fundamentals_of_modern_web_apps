import { useState, useEffect } from 'react'

import CountryForm from './components/CountryForm'
import CountryList from './components/CountryList'


import countriesService from './services/countries'
import weatherService from './services/weather'





const CountryDetails = ({countryName}) => {
  const initObj = {
      name: {
        common: 'loading'
      },
      capital: 'loading',
      languages: 'loading',
      flags: {
        png: 'loading',
        alt: 'loading'
      }
  }
  const initLoc = {
    lat: 'loading',
    lon: 'loading',
    country: 'loading'
  }
  const [singleCountry, setSingleCountry] = useState([])
  // const [location, setLocation] = useState(initLoc)
  useEffect(() => {
    countriesService
      .getOne(countryName)
      .then(initialCountry => {
        setSingleCountry(initialCountry)
      })
  }, [])

  const {name, capital, area, languages, flags} = singleCountry
  console.log(singleCountry)
  return(
    <div>
      <h2>{name.common}</h2>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <strong>languages:</strong>
      <ul>
        {Object.values(languages).map(val => <li key={val}>{val}</li>)}
      </ul>
      <img src={flags.png} alt={flags.alt} />
      <h3>Weather in {capital}</h3>

    </div>
  )
}

const CountrySingle = ({countryName}) => {
  const [details,setDetails] = useState(false)

  const showDetails = (event) => {
    event.preventDefault()
    setDetails(!details)
  }

  return (
    <div>{countryName} <button onClick={showDetails}>{details ? 'hide' : 'show'}</button>
    {details ? (<CountryDetails countryName={countryName}  />) : ''}
    </div>
  )
}



const App = () => {
  const [countries, setCountries] = useState([])
  const [countryQuery, setCountryQuery] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const handleCountryChange = (event) => {
    setCountryQuery(event.target.value)
  }

  return (
    <div>
      <CountryForm countryQuery={countryQuery} handleCountryChange={handleCountryChange} />
      <CountryList countries={countries} countryQuery={countryQuery} />
    </div>
  )
}



export default App