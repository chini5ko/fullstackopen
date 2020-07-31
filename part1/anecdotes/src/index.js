import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const DisplayMostVote = ({ obj, points }) => {
  let maxValueIndex = 0;

  for (let i = 0; i < points.length; i++) {

    if (points[maxValueIndex] < points[i]) {
      maxValueIndex = i;
    }
  }

  return (<div>
    <h1>Anecdote with the most votes</h1>
    {obj[maxValueIndex]}
    <br></br>
  has {points[maxValueIndex]} votes</div>
  )
}

const DisplayAnecdoteOfTheDay = ({ selected, anecdotes, points }) => {
  let maxValueIndex = 0;

  for (let i = 0; i < points.length; i++) {

    if (points[maxValueIndex] < points[i]) {
      maxValueIndex = i;
    }
  }

  return (<div>
    <h1>Anecdote of the day</h1>
    {anecdotes[selected % anecdotes.length]}
    <br></br>
      has {points[selected % anecdotes.length]} votes
  </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([2, 1, 3, 4, 0, 2])

  const incrementPointHandler = () => {
    const copy = [...points]
    // increment the property 2 value by one
    copy[selected % props.anecdotes.length] += 1
    // console.log(copy)
    // save
    setPoints(copy);
  }

  return (
    <div>
      <DisplayAnecdoteOfTheDay selected={selected} anecdotes={props.anecdotes} points={points}></DisplayAnecdoteOfTheDay>
      <Button text="vote" handleClick={incrementPointHandler}></Button>
      <Button text="next anecdotes" handleClick={() => setSelected(selected + 1)}></Button>
      <DisplayMostVote obj={props.anecdotes} points={points} > </DisplayMostVote>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)