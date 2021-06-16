import React, { useState } from 'react'

const Anecdote = ({ from, index, usingVoteCountList }) => {
  const anecdoteList = from
  const voteCountList = usingVoteCountList

  return (
    <div>
      <p>{anecdoteList[index]}</p>
      <p>has {voteCountList[index]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  // indices correspond to anecdotes array indices
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  console.log('votes:', votes)

  const [selected, setSelected] = useState(0)

  const getRandomAnecdoteIndex = () => {
    const getRandomInt = max => Math.floor(Math.random() * max)

    const newIndex = getRandomInt(anecdotes.length)
    console.log('next anecdote index:', newIndex)
    return newIndex
  }

  const nextAnecdote = () => {
    let nextAnecdoteIndex
    // prevents duplicate anecdotes from appearing
    do {
      nextAnecdoteIndex = getRandomAnecdoteIndex()
    } while (nextAnecdoteIndex === selected)
    setSelected(nextAnecdoteIndex)
    console.log('next anecdote:', anecdotes[nextAnecdoteIndex])
  }

  const vote = i =>
    () => {
      const newVotes = [...votes]
      newVotes[i] += 1
      console.log("voted:", i, "new score:", newVotes[i])
      setVotes(newVotes)
    }

  const getMostVotedIndex = () => {
    let highestVoteCount = votes[0]
    let mostVotedIndex = 0
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > highestVoteCount) {
        highestVoteCount = votes[i]
        mostVotedIndex = i
      }
    }
    return mostVotedIndex
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>

        <Anecdote
          from={anecdotes}
          index={selected}
          usingVoteCountList={votes}
        />

        <button onClick={vote(selected)}>vote</button>
        <button onClick={nextAnecdote}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with the most votes</h1>

        <Anecdote
          from={anecdotes}
          index={getMostVotedIndex()}
          usingVoteCountList={votes}
        />
      </div>
    </div>
  )
}

export default App