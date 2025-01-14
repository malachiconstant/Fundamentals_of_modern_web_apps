const CountryForm = ({countryQuery,handleCountryChange}) => {
  return(
    <form>
      <div>
        find countries <input value={countryQuery} onChange={handleCountryChange} />
      </div>

    </form>
  )
}

export default CountryForm