import {ItemId} from '../App'

export function Item({ name, id, handleDelete }: { name: string, id: ItemId, handleDelete: () => void }) {
    return (
      <li key={id}>
        {name}
        <button onClick={handleDelete}>delete item</button>
      </li>
    )
  }