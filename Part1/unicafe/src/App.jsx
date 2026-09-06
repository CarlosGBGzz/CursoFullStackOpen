import { useState } from 'react'

const ButtonAction = (props) => {
  return(
    <button onClick={props.action}>{props.text}</button>
  )
}

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
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad}/>
            <StatisticLine text="all" value={props.total}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive}/>
          </tbody>
        </table>
      </>
    )
  }
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
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
      <ButtonAction text="good" action={handleGood} />
      <ButtonAction text="neutral" action={handleNeutral} />
      <ButtonAction text="bad" action={handleBad} />
      <Statistics total={total} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App