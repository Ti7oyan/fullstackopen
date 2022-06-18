export default function Search({ query, handler }) {
  return (
    <input
      type="text"
      value={query}
      onChange={handler}
    />
  )
}