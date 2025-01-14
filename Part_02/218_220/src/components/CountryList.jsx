import { useState, useEffect } from 'react'

import countriesService from '../services/countries'
import weatherService from '../services/weather'

const Weather = ({singleCountry}) => {
    const [theWeather, setTheWeather] = useState('')
    useEffect(() => {
    weatherService
      .getWeather(singleCountry.capitalInfo.latlng[0], singleCountry.capitalInfo.latlng[1])
      .then(initialWeather => {
        setTheWeather(initialWeather)
      })
  }, [])

  if(theWeather) {
    return(
      <div>
        <h3>Weather in {singleCountry.capital}</h3>
        <p>temperature: {theWeather.main.temp} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${theWeather.weather[0].icon}@2x.png`} />
        <p>wind {theWeather.wind.speed} m/s</p>
      </div>
    )
  }
}

const CountryDetails = ({country}) => {
  const [singleCountry, setSingleCountry] = useState('')

  useEffect(() => {
    countriesService
      .getOne(country.name.common)
      .then(initialCountry => {
        setSingleCountry(initialCountry)
      })
  }, [])


  if (singleCountry) {
    const {name, capital, area, languages, flags} = singleCountry
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
        <Weather singleCountry={singleCountry} />
      </div>
    )
  }
}

const CountrySingle = ({country}) => {
  const [details,setDetails] = useState(false)
  const showDetails = (event) => {
    event.preventDefault()
    setDetails(!details)
  }

  return (
    <div>{country.name.common} <button onClick={showDetails}>{details ? 'hide' : 'show'}</button>
    {details ? (<CountryDetails country={country}  />) : ''}
    </div>
  )
}

const CountryList =({countries, countryQuery, showDetails}) => {
  const countriesFilter =  countries.filter(country => country.name.common.toLowerCase().includes(countryQuery.toLowerCase()))
  const queryTotal = countriesFilter.length

  const queryResult = () => {
    switch (true) {
      case (countryQuery == null || countryQuery == ''):
        return ``
      break
      case (queryTotal === 1):

        return countriesFilter.map(country => <CountryDetails key={country.name.common} country={country}  />) 
      break
      case (queryTotal > 10):
        return (<div>Too many matches, specify another filter</div>)
      break
      default:
          return countriesFilter.map(country => <CountrySingle key={country.name.common}  country={country} />) 
    }
  }

  return(<>{queryResult()}</>)
}

export default CountryList