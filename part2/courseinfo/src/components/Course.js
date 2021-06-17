import React from 'react'

const Header = (props) => {
  console.log('header', props)
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = (props) => {
  console.log('content', props)
  const { parts } = props

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Part = (props) => {
  console.log('part', props)
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Total = (props) => {
  console.log('total', props)
  const { parts } = props

  const totalExercises = parts.map(part => part.exercises)
    .reduce((prev, next) => prev + next)

  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  )
}

const Course = (props) => {
  console.log('course', props)
  const { course } = props
  const { name, parts } = course

  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course