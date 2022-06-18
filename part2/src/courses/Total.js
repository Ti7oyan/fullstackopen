const Total = ({ parts }) => (
  <p style={{ fontWeight: 'bold' }}>
    Number of exercises
    {' '}
    {
      parts.reduce((sum, part) => sum + part.exercises, 0)}
  </p>
)

export default Total;
