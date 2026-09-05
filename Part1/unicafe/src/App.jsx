import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    let updateGood = good + 1
    setGood(updateGood)
  }

  const handleNeutral = () => {
    let updateNeutral = neutral + 1
    setNeutral(updateNeutral)
  }

  const handleBad = () => {
    let updateBad = bad + 1
    setBad(updateBad)
  }



  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App