import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/List';



function App() {

  const [country, setCountry] = useState('')
  const [result, setResult] = useState([])


  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setResult(response.data)
      })
  }, [])

  const handleCountrySearch = (event) => {
    setCountry(event.target.value)
  }

  return (
    <>
      <h1>Country Search</h1>
      <form>find countries
        <div>
          <input value={country} onChange={handleCountrySearch} />
        </div>
      </form>
      <CountryList key={result.id} result={result} country={country} />
    </>
  )
}

export default App;