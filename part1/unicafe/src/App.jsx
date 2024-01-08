import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (<button onClick={handleClick}>{text}</button>)
}

const Statistics = (props) => {
  if (props.all !== 0) {
    return (
      <table>
        <thead>
          <StatisticsLine text='good' value={props.good} />
          <StatisticsLine text='neutral' value={props.neutral} />
          <StatisticsLine text='bad' value={props.bad} />
          <StatisticsLine text='all' value={props.all} />
          <StatisticsLine text='average' value={(props.good - props.bad) / props.all} />
          <StatisticsLine text='positive' value={props.good / props.all * 100 + " %"} />
        </thead>
      </table>
    )
  } else {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
}

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  };
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  };

  console.log(good, bad, neutral,);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App;