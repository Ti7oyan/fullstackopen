import { useState } from 'react';

const Anecdote = ({ content, votes }) => (
  <>
    <q
      style={{
        fontSize: '1.25em',
      }}
    >
      {content}
    </q>
    <p>
      Has
      {' '}
      <strong>{votes}</strong>
      {' '}
      votes.
    </p>
  </>
)

const Anecdotes = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length);
    if (newIndex === selected) {
      handleNext();
    } else {
      setSelected(newIndex);
    }
  }

  const handleVote = () => {
    votes[selected] += 1;
    setVotes([...votes]);
  }

  const mostVoted = () => {
    const max = Math.max(...votes);
    return votes.indexOf(max);
  }

  return (
    <>
      <h2>Anecdotes</h2>

      <section>
        <h3>Anecdote of the day</h3>
        <Anecdote content={anecdotes[selected]} votes={votes[selected]} />


        <div style={{
          display: 'flex',
          gap: '1em',
          margin: '1em 0',
        }}>
          <button
            type="button"
            onClick={handleNext}
          >
            Next anecdote
          </button>

          <button
            type="button"
            onClick={handleVote}
          >
            Vote
          </button>
        </div>

      </section>

      <h3>¡Anecdote with most votes!</h3>
      <Anecdote content={anecdotes[mostVoted()]} votes={votes[mostVoted()]} />
    </>
  )
}

export default Anecdotes;
