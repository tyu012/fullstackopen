import React from 'react'

const Search = (props) => {
	const {
		queryValue,
		handleQueryChange,
	} = props

	return (
		<div>
			find countries {
				<input
					value={queryValue}
					onChange={handleQueryChange}
					/>
			}
		</div>
	)
}

export default Search