import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const StatisticsLine =({text,value}) => {
  return (
    <tr>
      <td>
        {text} 
      </td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good,neutral,bad,total,avg,positive}) => {
if(total == 0)  {
  return (
    <table>
      <tbody>
        <tr>
          <td colSpan="2">
          <h2>Statistics</h2>
          <p>No feedback given</p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
return (
  <table>
    <tbody>
    <tr>
      <td colSpan="2">
        <h2>Statistics</h2>
      </td>
    </tr>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={total} />
      <StatisticsLine text="average" value={avg} />
      <StatisticsLine text="positive" value={`${positive} %`} />
    </tbody>
  </table>
) 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal] = useState([])

  const allFunct = (value, setValue, score) => {
    const doThis = () => {
      setValue(value + 1)
      setTotal(total.concat(score))
    }
    return doThis
  }
  
  const avg = (total.reduce((a,b) => b + a, 0))/total.length
  // console.log(`good ${good}`)
  // console.log(`total length ${total.length}`)
  return (
    <div>
      <h1>give feedback</h1>
        <Button handleClick={allFunct(good,setGood, 1)} text={'good'} />
        <Button handleClick={allFunct(neutral,setNeutral, 0)} text={'neutral'} />
        <Button handleClick={allFunct(bad,setBad, -1)} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total.length} avg={avg ? avg: 0} positive={total.length == 0 ? 100 : Math.round((good/total.length) * 100)} />
    </div>
    
  )
}

export default App