import React from 'react'

// Lists the names of countries in an array.
//
// This component is displayed when the number of matching countries
// is less than 10.
const ResultList = (props) => {
	const {
		countries,
		handleCountryDisplay, // allowed workaround based on the exercise requirement
	} = props

	return (
		<div>
			{
				countries.map(country =>
					<div key={country.name}>
						{country.name}
						<button onClick={handleCountryDisplay(country.name)}>show</button>
					</div>
				)
			}
		</div>
	)
}

export default ResultList