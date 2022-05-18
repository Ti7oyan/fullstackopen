const Header = ({ title }) => <h1>{title}</h1>

const Part = ({ part, exercises }) => (
  <p>{part} {exercises}</p>
)

const Content = ({ parts, exercises }) => (
  <>
    <Part part={parts[0]} exercises={exercises[0]} />
    <Part part={parts[1]} exercises={exercises[1]} />
    <Part part={parts[2]} exercises={exercises[2]} />
  </>
)

const Total = ({ total }) => <p>Number of exercises {total}</p>


const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header title={course} />
      <Content parts={parts} exercises={exercises} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App;
