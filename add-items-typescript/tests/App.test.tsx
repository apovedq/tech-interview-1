import React from 'react'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

//Run end to end test

describe('<App/>', () => {
    test('should add items and remove them', async () => {

        //start the user
        const user = userEvent.setup()

        //render the app
        render(<App />)

        //Look for the input -  All inputs have textbox by default
        const input = screen.getByRole('textbox')
        expect(input).toBeDefined()

        //look for the form
        const form = screen.getByRole('form')
        expect(form).toBeDefined()

        //search the button - query selector is used when you are locating an elemnt inside another 
        //elemnt in this case, a button inside the form

        const button = form.querySelector('button')
        expect(button).toBeDefined()

        const randomText = crypto.randomUUID()
        await user.type(input, randomText)
        //Add ! at the end because there was a previous comprobation the the button exist previously
        await user.click(button!)

    

        //make sure the element is on the list
        const list = screen.getByRole('list')
        expect(list).toBeDefined()

        //Returns the HTML of the redender output after the test
        expect(list.childNodes.length).toBe(1)

      

        //Now looking for the just created <li> by the text inside of it
        //and click the delete button 
        const itemInList = screen.getByText(randomText)
        const deleteButton = itemInList.querySelector('button')
        expect(deleteButton).toBeDefined()
        await user.click(deleteButton!)


        //Now verify that the empty state is being triggered
        const emptyList = screen.getByText('There are currently not elements on the list')
        expect(emptyList).toBeDefined()
        screen.debug()

    })
})