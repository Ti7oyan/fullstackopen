export default function AddPerson(
  { name, number, handleName, handleNumber, handleSubmit }
) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" value={name} onChange={handleName} />
      </label>

      <label>
        Number
        <input type="text" value={number} onChange={handleNumber} />
      </label>

      <button type="submit">Add it!</button>
    </form>
  )
}