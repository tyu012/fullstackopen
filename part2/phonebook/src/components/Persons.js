import React from 'react'

const Persons = (props) => {
	console.log('Persons', props)
	const { list, filterString, handleDelete } = props

	return (
		<ul>
			{
				list.filter(person =>
					person.name.toLowerCase().search(filterString.toLowerCase()) !== -1
				)
					.map(person =>
						<li key={person.name}>
							{person.name} {person.number}
							<button onClick={handleDelete(person)}>delete</button>
						</li>)
			}
		</ul>
	)
}

export default Persons