import React from 'react'

// components
import Result from './Result'
import ResultList from './ResultList'

// Displays the correct component (Result, ResultList) based on the number of
// matching countries found from a search query.
const Results = (props) => {
	console.log(props)
	const {
		query,
		querySetter, // allowed workaround based on the exercise requirement
		countriesList,
	} = props

	// generates a function that sets the query to a specified country name
	const querySetterGenerator = countryName => {
		return () => querySetter(countryName)
	}

	const matches = countriesList.filter(country =>
		country.name.toLowerCase().includes(query.toLowerCase())
	)

	if (matches.length === 1) {
		return (
			<Result country={matches[0]} />
		)
	}

	if (matches.length <= 10) {
		return (
			<ResultList
				countries={matches}
				handleCountryDisplay={querySetterGenerator}
			/>
		)
	}

	if (matches.length === 0) {
		return (
			<div>Country not found</div>
		)
	}

	return (
		<div>
			Too many matches, specify another filter
		</div>
	)
}

export default Results