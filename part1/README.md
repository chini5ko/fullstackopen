# 1.2 
```js

import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>{props.course}</h1> 
  )
}

const Part = (props) => {
  return(
    <p>
    {props.part} {props.exercises}
  </p>
  )
}



const Content = (props) => {
  return(
    <div>
      <Part part={props.part1} exercises={props.exercises1}></Part>
      <Part part={props.part2} exercises={props.exercises2}></Part>
      <Part part={props.part3} exercises={props.exercises}></Part>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 1.3
```js
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>{props.course}</h1> 
  )
}

const Part = (props) => {
  return(
    <p>
    {props.part} {props.exercises}
  </p>
  )
}



const Content = (props) => {
  return(
    <div>
      <Part part={props.part1} exercises={props.exercises1}></Part>
      <Part part={props.part2} exercises={props.exercises2}></Part>
      <Part part={props.part3} exercises={props.exercises3}></Part>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1.name} exercises1={part1.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 1.4
```js
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>{props.course}</h1> 
  )
}

const Part = (props) => {
  return(
    <p>
    {props.part} {props.exercises}
  </p>
  )
}

const Content = (props) => {
  console.log('Content props', props)
  return(
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}></Part>
      <Part part={props.parts[1].name} exercises={props.parts[2].exercises}></Part>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}></Part>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts}></Total>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```


# 1.5
```js
import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
    <h1>{props.course}</h1> 
  )
}

const Part = (props) => {
  return(
    <p>
    {props.part} {props.exercises}
  </p>
  )
}

const Content = (props) => {
  console.log('Content props', props)
  return(
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}></Part>
      <Part part={props.parts[1].name} exercises={props.parts[2].exercises}></Part>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}></Part>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

# 1.6 unicafe
Like most companies, Unicafe collects feedback from its customers. Your task is to implement a web application for collecting customer feedback. There are only three options for feedback: good, neutral, and bad.

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <button onClick={() => setGood(good+1)}>good </button>
       <button onClick={() => setNeutral(neutral+1)}>neutral </button>
        <button onClick={() => setBad(bad+1)}>bad </button>

        <h1>Statistic</h1>

        <p>good {good} </p>
       <p>neutral {neutral} </p>
        <p>bad {bad} </p>
        
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
```

# 1.7 unicafe
Expand your application so that it shows more statistics about the gathered feedback: the total number of collected feedback, the average score (good: 1, neutral: 0, bad: -1) and the percentage of positive feedback.

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <button onClick={() => setGood(good+1)}>good </button>
       <button onClick={() => setNeutral(neutral+1)}>neutral </button>
        <button onClick={() => setBad(bad+1)}>bad </button>

        <h1>Statistic</h1>

        <p>good {good} </p>
       <p>neutral {neutral} </p>
        <p>bad {bad} </p>
        <p>all {good+neutral+bad} </p>
        <p>Average {(good + (bad*-1) ) / (good+neutral+bad) } </p>
        <p>Positive {( good / (good+neutral+bad) ) * 100} $ </p>
        
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
```


# 1.8 unicafe step 3
Refactor your application so that displaying the statistics is extracted into its own Statistics component. The state of the application should remain in the App root component.

```js
import React, { useState } from 'react'
import ReactDOM, { render } from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  return(
    <div>
      <h1>Statistic</h1>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {good + neutral + bad} </p>
      <p>Average {(good + (bad * -1)) / (good + neutral + bad)} </p>
      <p>Positive {(good / (good + neutral + bad)) * 100} $ </p>
    </div>


  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <button onClick={() => setGood(good + 1)}>good </button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral </button>
      <button onClick={() => setBad(bad + 1)}>bad </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
```

# 1.9 unicafe step 3
Change your application to display statistics only once feedback has been gathered.

```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  if(good + neutral +bad == 0){
    return(<div>
            <h1>Statistic</h1>
            <p>No feedback gathered </p>

    </div>)
  }
  return(
    <div>
      <h1>Statistic</h1>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad} </p>
      <p>all {good + neutral + bad} </p>
      <p>Average {(good + (bad * -1)) / (good + neutral + bad)} </p>
      <p>Positive {(good / (good + neutral + bad)) * 100} $ </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <button onClick={() => setGood(good + 1)}>good </button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral </button>
      <button onClick={() => setBad(bad + 1)}>bad </button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
```


# 1.10: unicafe step5
Let's continue refactoring the application. Extract the following two components:

Button for defining the buttons used for submitting feedback
Statistic for displaying a single statistic, e.g. the average score.
```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  if(good + neutral +bad === 0){
    return(<div>
            <h1>Statistic</h1>
            <p>No feedback gathered </p>

    </div>)
  }
  return(
    <div>
      <h1>Statistic</h1>
      <Statistic text="good" value ={good} />
      <Statistic text="neutral" value ={neutral} />
      <Statistic text="bad" value ={bad} />
      <Statistic text="all" value ={good + neutral + bad} />
      <Statistic text="Average" value ={(good + (bad * -1)) / (good + neutral + bad)} />
      <Statistic text="Positive" value ={(good / (good + neutral + bad)) * 100} />
    </div>
  )
}

const Statistic = ({text, value}) => {
  return  <p>{text}  {value} </p>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
```
# 1.11*: unicafe step6
Display the statistics in an HTML table, so that your application:
```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, neutral, bad }) => {
  if(good + neutral +bad === 0){
    return(<div>
            <h1>Statistic</h1>
            <p>No feedback gathered </p>

    </div>)
  }
  return(
    <div>
      <h1>Statistic</h1>
      <table>
        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={good + neutral + bad} />
        <Statistic text="Average" value ={(good + (bad * -1)) / (good + neutral + bad)} />
        <Statistic text="Positive" value ={(good / (good + neutral + bad)) * 100} />

      </table>
   
    </div>
  )
}

const Statistic = ({text, value}) => {
  return(
    <tbody>
      <tr><td><p>{text}</p></td><td><p>{value}</p></td></tr>
    </tbody>
  )  
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
```

# 1.12*: anecdotes step1
Display the statistics in an HTML table, so that your application
```js

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  return (
    <div>
      {props.anecdotes[selected % props.anecdotes.length]}
      <br></br>

      <br></br>
      <button onClick={() => setSelected(selected+1)}> next anecdotes</button>
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

```

# 1.13*: anecdotes step2
Expand your application so that you can vote for the displayed anecdote.
```js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ 0: 2, 1: 1, 2: 3, 3: 4, 4: 0, 5: 2 })

  const incrementPointHandler = () =>{
    const copy = { ...points }
    // increment the property 2 value by one
    copy[selected % props.anecdotes.length] += 1   
    console.log(copy)
    // save
    setPoints(copy);
  }

  

  return (
    <div>
      {props.anecdotes[selected % props.anecdotes.length]}
      <br></br>
      has {points[selected % props.anecdotes.length]} votes

      <br></br>
      <button onClick={incrementPointHandler}>vote</button>
      <button onClick={() => setSelected(selected+1)}> next anecdotes</button>
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

```
# 1.14*: anecdotes step2
Now implement the final version of the application that displays the anecdote with the largest number of votes:

```js
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
```




