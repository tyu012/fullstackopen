import React, { useState } from 'react'

const Statistics = (props) => {
  console.log(props)
  const { data } = props
  const [good, neutral, bad, all, average, percentGood] = data

  if (all() === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <table>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all()} />
      <Statistic text="average" value={average()} />
      <Statistic text="postive" value={percentGood()} endText="%" />
    </table>
  )
}

const Statistic = (props) => {
  console.log(props)
  const { text, value, endText } = props

  return (
    <tr>
      <td>{text}</td>
      <td>{value} {endText === undefined ? "" : endText}</td>
    </tr>
  )
}

const Button = (props) => {
  console.log(props)
  const { handleClick, text } = props

  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementState = (value, setter) => {
    return () => {
      setter(value + 1)
      console.log("function called:", setter)
    }
  }

  const all = () => good + neutral + bad
  const average = () => (good - bad) / all()
  const percentGood = () => (good / all()) * 100

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={incrementState(good, setGood)} text="good" />
      <Button handleClick={incrementState(neutral, setNeutral)} text="neutral" />
      <Button handleClick={incrementState(bad, setBad)} text="bad" />

      <h1>statistics</h1>

      <Statistics
        data={[good, neutral, bad, all, average, percentGood]}
      />
    </div>
  )
}

export default App