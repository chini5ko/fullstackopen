import React from 'react'
import {voteFor} from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const Anecdotes = () => {
	const anecdotes = useSelector(state => state)
	const dispatch = useDispatch()

	anecdotes.sort(function(a, b) {
    return b.votes - a.votes;
	});

	return (
		<div>
			<h2>Anecdotes</h2>
			{
				anecdotes.map(anecdote =>
					<div key={anecdote.id}>
						<div>
							{anecdote.content}
						</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => dispatch(voteFor(anecdote.id))}>vote</button>
						</div>
					</div>
				)
			}

		</div>
	)

}

export default Anecdotes