//Create a custom hook
import { useState } from 'react'
import { type Item } from '../App'


export const useItems = () => {

    //Clarify that the state is array of type <Item[]>
    const [items, setItems] = useState<Item[]>([])

    const addItem = (name: string) => {
        const newItem: Item = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            name: name
        }

        //El prevItems solo se puede llamar en un "update function"
        //This updater function takes the previous state as an argument (prevItems) and returns the new state.

        setItems((prevItems) => {
            return [...prevItems, newItem]
        })
    }

    const removeItem = (id: string) => {
        const newArray = items.filter(item => item.id !== id);
        setItems(newArray)
    }

    return {
        items,
        addItem,
        removeItem
    }

}