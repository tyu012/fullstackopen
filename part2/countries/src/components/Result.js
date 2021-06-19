import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Credits: khel
// https://stackoverflow.com/questions/863800
import removeDiacritics from '../removeDiacritics'

// Lists the country name, capital, population, and languages of a country.
const CountryFacts = (props) => {
	const { country } = props

	return (
		<div>
			<h1>{country.name}</h1>

			<div>capital {country.capital}</div>
			<div>population {country.population}</div>

			<h2>languages</h2>

			<ul>
				{
					country.languages.map(language => {
						return (
							<li>
								{language.name}
							</li>
						)
					})
				}
			</ul>

			<img
				src={country.flag}
				alt={`Flag of ${country.name}`}
				style={
					{
						width: 200,
					}
				}
			/>
		</div>
	)
}

// Lists the current weather of the capital of a country.
// Uses the weatherstack.com API.
const Weather = (props) => {
	const {
		country,
	} = props

	const [weather, setWeather] = useState({})

	// some edge cases result in incorrect weather being displayed:
	// e.g. searching 'Washington, D.C.' returns the weather for
	// Washington, Aruba - RESOLVED
	// e.g. searching "Sana'a" fails to return a weather - RESOLVED
	// e.g. searching 'Bogotá' fails to return a weather
	//
	// these are being replaced with English characters.
	const replacerFunction = () => {
		return ""
	}

	// Weatherstack API key is used when getting the weather
  // usage: REACT_APP_API_KEY='...' npm start (for Linux/Mac)
	useEffect(() => {
		console.log('requesting weather for', country.capital)
		
		axios
		// Credits: the regex expression below is from Petar Ivanov
		// https://stackoverflow.com/questions/6555182
			.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${removeDiacritics(country.capital).replace(/[^a-zA-Z ]/g, replacerFunction)}&units=m`)
			.then(response => {
				console.log('receive weather', response)
				setWeather(response)
			})
	}, [country.capital])

	if (weather.data === undefined ||
	    weather.data.success === false ||
			weather === {}) { return <div></div> }

	return (
		<div>
			<h2>Weather in {country.capital}</h2>

			<p>
				<strong>temperature:</strong> {weather.data.current.temperature} Celsius
			</p>

			<img
				src={weather.data.current.weather_icons}
				alt={weather.data.current.weather_descriptions}
				style={
					{
						width: 50,
					}
				}
			/>

			<div>
				<strong>wind:</strong> {weather.data.current.wind_speed} km/h
			</div>
		</div>
	)
}

// Lists details for a single country.
const Result = (props) => {
	const {
		country,
	} = props

	return (
		<div>
			<CountryFacts country={country} />
			<Weather country={country} />
		</div>
	)
}

export default Result