import { useState } from 'react'

const Text = ({size, text}) => {
  if(size == "h2") {
    return (
      <h2>{text}</h2>
    )
  } 
    return(
      <p>{text}</p>
    )
    
}
const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const VotesSection = ({content1,content2}) => {
  if(content1 == 0) {
    return (
      <>
        <Text text="Nobody has voted yet" />
      </>
    )
  } else {
    return(
    <>
    <Text size="h2" text="Anecdote with most votes" />
    <Text text={content2} />
    <Text text={`has ${content1} votes`} />
    </>
  )}
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  // created array where points will be stored for each anecdote
  const points = Array(anecdotes.length).fill(0);

  //randomly select an anecdote
  const randoQuote = anecdotes[Math.floor(Math.random() * anecdotes.length)]
  
  // set the selected anecdote
  const [selected, setSelected] = useState(randoQuote)

  // set the votes for each anecdote
  const [votes, setVotes] = useState(points);

  // create a copy of the votes array
  const copy = [...votes]

  const handleClick = () => {
    setSelected(anecdotes[Math.floor(Math.random() * anecdotes.length)])
  }

  const handleVotes = () => {
    // find the index of the selected anecdote and increment the votes
    copy[anecdotes.indexOf(selected)] += 1
    setVotes(copy)
  }

  const mostVotesNum = Math.max(...copy)
  const mostVotesQuote = anecdotes[votes.indexOf(mostVotesNum)]
  
  console.log(copy)
  console.log(...copy)
  return (
    <div>
      <Text size="h2" text="Anecdote of the day" />
      <Text size="p" text={selected} />
      <p>has {votes[anecdotes.indexOf(selected)]} votes</p>

      <Button handleClick={handleClick} text={'next anecdote'} />
      <Button handleClick={handleVotes} text={'vote'} />
      <VotesSection content1={mostVotesNum} content2={mostVotesQuote} />
    </div>
  )
}

export default App