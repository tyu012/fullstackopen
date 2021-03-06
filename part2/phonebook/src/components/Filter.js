import React from 'react'

const Filter = (props) => {
	const { value, handleChange, text } = props

	return (
		<div>
			{text} <input
				value={value}
				onChange={handleChange}
			/>
		</div>
	)
}

export default Filter