import React from 'react'

const Notification = ({ message }) => {
	if (message === null) {
		return <div></div>
	}

	const { text, successful } = message

	const messageStyle = {
		color: successful ? 'green' : 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10
	}

	return (
		<div style={messageStyle}>
			{text}
		</div>
	)
}

export default Notification