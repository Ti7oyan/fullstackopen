export default function Person({ name, number, handleDelete }) {
  return (
    <li>
      <p>{name} | {number}</p>
      <button
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  )
}