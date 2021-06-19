import React, { useState, useEffect } from 'react'
import axios from 'axios'

// components
import Search from './components/Search'
import Results from './components/Results'

const App = () => {
  // State hooks
  const [allCountries, setAllCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        console.log(response.data.length, 'countries found');
        setAllCountries(response.data)
      })
  }, [])
  console.log('rendering...')

  // event handlers
  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <Search
        queryValue={query}
        handleQueryChange={handleQueryChange}
      />

      <Results
        query={query}
        querySetter={setQuery}
        countriesList={allCountries}
      />
    </div>
  )
}

export default App;