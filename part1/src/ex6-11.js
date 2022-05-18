import { useMemo, useState } from 'react';

const Button = ({ onClick, text }) => (
  <button
    type="button"
    onClick={onClick}
  >
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr id={`statistic-${text}`}>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ values }) => {
  if (values.total === 0) <p>No feedback given</p>

  return (
    <>
      <h2 style={{ marginBlockEnd: 0 }}>Statistics</h2>
      <table style={{ maxWidth: 400 }}>
        <tbody>
          <StatisticLine text="good" value={values.good} />
          <StatisticLine text="neutral" value={values.neutral} />
          <StatisticLine text="bad" value={values.bad} />
          <StatisticLine text="total" value={values.total} />
          <StatisticLine text="average" value={values.average} />
          <StatisticLine text="positive" value={`${values.positive}%`} />
        </tbody>
      </table>
    </>
  )
}

const Unicafe = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getTotal = useMemo(() => good + neutral + bad, [good, neutral, bad]);

  const getAverage = () => {
    const total = getTotal;
    if (!total) return 0;

    return (good - bad) / total;
  }

  const getPositive = () => {
    const total = getTotal;
    if (!total) return 0;
    return good / total * 100;
  }

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: getTotal,
    average: getAverage().toFixed(2),
    positive: getPositive().toFixed(2)
  }

  return (
    <>
      <h2>Unicafe - Give feedback</h2>
      <div style={{ display: 'flex' }}>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>

      {getTotal > 0
        ? <Statistics values={statistics} />
        : <p>No feedback given</p>}
    </>
  )
}

export default Unicafe;