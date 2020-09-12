# 6.7: anecdotes, step5
Separate the creation of new anecdotes into its own component called AnecdoteForm. Move all logic for creating a new anecdote into this new component.

```js
import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
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

export default AnecdoteForm
```

# 6.6: anecdotes, step4
If you haven't done so already, separate the creation of action-objects to action creator-functions and place them in the src/reducers/anecdoteReducer.js file, so do like we have been doing since the chapter action creators.
```js

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: {
      id:id
    }
  }
}


export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content:content,
      id: getId(),
      votes:0
    }
  }
}
```

# 6.5*: anecdotes, step3
Make sure that the anecdotes are ordered by the number of votes.
```js
	anecdotes.sort(function(a, b) {
    return b.votes - a.votes;
	});

```


# 6.4: anecdotes, step2
Implement the functionality for adding new anecdotes.

```js
// REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE':{
    //..
    }
    case 'NEW_ANECDOTE':{
      return [...state,action.data]
    }
  }

  return state
}


export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content:content,
      id: getId(),
      votes:0
    }
  }
}
```

# 6.3: anecdotes, step1
Implement the functionality for voting anecdotes. The amount of votes must be saved to a Redux-store.

```js
// APP.js
  <button onClick={() =>  dispatch(voteFor(anecdote.id))}>vote</button>

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: {
      id:id
    }
  }
}

//reducer:
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'VOTE':{
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id != id ? anecdote : changedAnecdote
      )
    }
  }

  return state
}


```

# 6.2: unicafe revisited, step2
Now implement the actual functionality of the application.
```js
import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={e => store.dispatch({type:'OK'})}>neutral</button> 
      <button onClick={e => store.dispatch({type:'BAD'})}>bad</button>
      <button onClick={e => store.dispatch({type:'ZERO'})}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral  {store.getState().ok} </div>
      <div>bad  {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

```

# 6.1: unicafe revisited, step1

Implement the reducer and its tests.

In the tests, make sure that the reducer is an immutable function with the deep-freeze-library. Ensure that the provided first test passes, because Redux expects that the reducer returns a sensible original state when it is called so that the first parameter state, which represents the previous state, is undefined.

```js

//REDuCER
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return {
        ...state,
        good: state.good + 1
      }
    case 'OK':
      return {
        ...state,
        ok: state.ok + 1
      }
    case 'BAD':
      return {
        ...state,
        bad: state.bad + 1
      }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }

}

export default counterReducer

//TEST
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })
})
```