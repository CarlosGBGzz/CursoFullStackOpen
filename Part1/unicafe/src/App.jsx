import { useState } from 'react'

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    let average =  100 * (1 * props.good - 1 * props.bad) / props.total
    let positive =  100 * props.good / props.total
    return(
      <>
        <h1>statistics</h1>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.total}</p>
        <p>average {average} %</p>
        <p>positive {positive} %</p>
      </>
    )
  }
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    let updateGood = good + 1
    setGood(updateGood)
    setTotal( total + 1)
  }

  const handleNeutral = () => {
    let updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setTotal( total + 1)
  }

  const handleBad = () => {
    let updateBad = bad + 1
    setBad(updateBad)
    setTotal( total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <Statistics total={total} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App