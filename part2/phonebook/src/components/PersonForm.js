import React from 'react'

const PersonForm = (props) => {
	console.log('PersonForm', props)
	const {
		handleSubmission,
		nameValue,
		handleNameChange,
		numberValue,
		handleNumberChange,
	} = props

	return (
		<form onSubmit={handleSubmission}>
			<div>
				name: <input
					value={nameValue}
					onChange={handleNameChange}
				/>
			</div>
			<div>
				number: <input
					value={numberValue}
					onChange={handleNumberChange}
				/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm