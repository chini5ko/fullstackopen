import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from './reducers/anecdoteReducer'


const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
		const content = event.target.anecdote.value
		dispatch(createAnecdote(content))
		event.target.anecdote.value = ''
  }

  return (
		<div>
		<h2>Create</h2>
		 <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>

		</div>
   
  )
}

export default NewAnecdote