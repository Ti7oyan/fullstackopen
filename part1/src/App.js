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

const Total = ({ total }) => <p>Number of exercises {total}</p>


const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const parts = [part1, part2, part3]

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App;
