import './App.css'
import { Item } from './components/Item'
import { useItems } from './hooks/useItem';
import {useSEO} from './hooks/useSEO'

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
  id: ItemId,
  timestamp: number,
  name: string
}

//Initial array of items to render test
const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    name: 'Item 1'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    name: 'Item 2'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    name: 'Item 3'
  },
]

function App() {

  //Custom hook for managing the items state
  const {items, addItem, removeItem} =  useItems()

  //Custom  hook to use SEO
  useSEO(
   { title: `[${items.length}] items en Prueba Tecnica ` ,
    description: "Mi prueba tecnica"}
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    //Validar si el input existe dentro del retorno del Form
    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement

    //Si no lo es retorno nulo
    if (!isInput || input == null) return

    addItem(input.value)

    input.value = ''
  }

  //Higher superior function - A function that returns another function
  const handleDelete = (id: ItemId) => () => {
    removeItem(id)
  }


  return (
    <main>
      <h1> My technical interview</h1>
      {/* Form */}
      <section>
        <aside>
          <h2>Add a new item</h2>

          <form onSubmit={handleSubmit} aria-label='add elements to the list' >
            <label>Item
              <input type="text" name="item" placeholder='Your item here...' />
            </label>
            <button>Submit Item</button>
          </form>
        </aside>

        {/* List */}
        <div>
          <h2>Items List</h2>
          {items.length != 0 ?
            <ul>
              {
                items.map((item) => {
                  return <Item name={item.name}
                    id={item.id}
                    handleDelete={handleDelete(item.id)} />
                })
              }
            </ul> :
            <strong> There are currently not elements on the list </strong>
          }

        </div>
      </section>
    </main>
  )
}

export default App
