const Header = ({ title }) => <h1>{title}</h1>

const Part = ({ part, exercises }) => (
  <p>{part} {exercises}</p>
)

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part key={part.name} part={part.name} exercises={part.exercises} />
    })}
  </>
)

const Total = ({ parts }) => (
  <p>
    Number of exercises
    {' '}
    {
      parts.reduce((sum, part) => sum + part.exercises, 0)}
  </p>
)


const App = () => {
  const course = "Half Stack application development";

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App;
