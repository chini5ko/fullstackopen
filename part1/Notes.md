# resources for chapter 1
- [https://egghead.io/courses/the-beginner-s-guide-to-react](https://egghead.io/courses/the-beginner-s-guide-to-react)
- [https://reactjs.org/docs/hello-world.html](https://reactjs.org/docs/hello-world.html)

- [part1](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#complex-state)

# Do Not Define Components Within Components
```js 
//good 
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = props => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```
```js 
//bad -------------------------------------------------------------------------
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = props => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  // Do not define components inside another component
  const Display = props => <div>{props.value}</div>

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```


# Hooks Recap 
- hooks must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component
-  hooks may only be called from the inside of a function body that defines a React component:
```js
const App = (props) => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

# Conditional Rendering 
The History component renders completely different React elements depending on the state of the application. This is called conditional rendering. [react doc](https://reactjs.org/docs/conditional-rendering.html)

```js
const History = (props) => {
    
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}
```

# Handling Arrays


```js
const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

// concat does not mutate the existing array but rather returns a new copy of the array with the item added to it
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {right}
        <p>{allClicks.join(' ')}</p>
      </div>
    </div>
  )
}
```

DONT DO!
```js
//the state of React components like allClicks must not be mutated directly. 
const handleLeftClick = () => {
  allClicks.push('L')
  setAll(allClicks)
  setLeft(left + 1)
}
```

# Complex State
- The application appears to work. However, it is forbidden in React to mutate state directly, since it can result in unexpected side effects. Changing state has to always be done by setting the state to a new object. If properties from the previous state object are not changed, they need to simply be copied, which is done by copying those properties into a new object, and setting that as the new state.


# Passing state to child components
It's recommended to write React components that are small and reusable across the application and even across projects. Let's refactor our application so that it's composed of three smaller components, one component for displaying the counter and two components for buttons. 
- "Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor" ~ REACT DOC

```js
import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [counter, setCounter] = useState(0);

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <div>
    <Display counter={counter}/>
    <Button
      handleClick={increaseByOne}
      text='plus'
    />
    <Button
      handleClick={setToZero}
      text='zero'
    />     
    <Button
      handleClick={decreaseByOne}
      text='minus'
    />           
  </div>
  )
}


ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
```

### Notes: Changes in state cause rerendering
When the application starts, the code in App is executed. This code uses a useState hook to create the application state, setting an initial value of the variable counter. This component contains the Display component - which displays the counter's value, 0 - and three Button components. The buttons all have event handlers, which are used to change the state of the counter.

When one of the buttons is clicked, the event handler is executed. The event handler changes the state of the App component with the setCounter function. Calling a function which changes the state causes the component to rerender.

So, if a user clicks the plus button, the button's event handler changes the value of counter to 1, and the App component is rerendered. This causes its subcomponents Display and Button to also be re-rendered. Display receives the new value of the counter, 1, as props. The Button components receive event handlers which can be used to change the state of the counter.

# Passing Event Handlers to Child Components



# Event Handling 
Event Handlers are registered to be called when specific events occur.

- ex
Let's change the application so that increasing the counter happens when a user clicks a button, which is implemented with the button element.

Button elements support so-called mouse events, of which click is the most common event.

#### code
- We set the value of the button's onClick attribute to be a reference to the handleClick function defined in the code.
- Now every click of the plus button causes the handleClick function to be called, meaning that every click event will log a clicked message to the browser console.

##### v1 calling a func
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>
    </div>
  )
}
```

##### v2 inline event handler 
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <div>
      <div>{counter}</div>
      
      <button onClick={() => setCounter(counter + 1)}>
        plus
        </button>

    <button onClick={() => setCounter(0)}> 
        zero
      </button>

    </div>
  )
}
```

### notes
```js
// ERRROR 
<button onClick={setCounter(counter + 1)}>

<button onClick={setValue(0)}>button</button>

<button onClick={console.log('clicked the button')}>
<button onClick={value + 1}>button</button> //not a function, number type 
<button onClick={'crap...'}>button</button> //not a function, String type 


<button onClick={value = 0}>button</button> //This attempt is also flawed in the sense that we must never mutate state directly in React

```
- VS
```js
// When the component gets rendered, no function gets called and only the reference to the arrow function is set to the event handler. Calling the function happens only once the button is clicked
<button onClick={() => setCounter(counter + 1)}>
```
- reason: 
- the event handler is actually a function call. In many situations this is ok, but not in this particular situation. In the beginning the value of the counter variable is 0. When React renders the method for the first time, it executes the function call setCounter(0+1), and changes the value of the component's state to 1. This will cause the component to be re-rendered, react will execute the setCounter function call again, and the state will change leading to another rerender...
- Keep in mind: 
- Usually defining event handlers within JSX-templates is not a good idea. Here it's ok, because our event handlers are so simple.

### Good Practices:
- The value of the onClick attribute is a variable containing a reference to a function:
```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  
  const setToZero = () => setCounter(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}
```
# Stateful component

## using hooks
```js
import React, { useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [counter, setCounter] = useState(0);

  setTimeout(
    () => setCounter(counter+1), 1000
  )
  return (
    <div>{counter}</div>
  )
}


ReactDOM.render(
  <App />, 
  document.getElementById('root')
)

```

# Page re-rendering
Making repeated calls to the ReactDOM.render method is not the recommended way to re-render components. Next, we'll introduce a better way of accomplishing this effect.

### v3
```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

let counter = 1

const refresh = () => {
  ReactDOM.render(<App counter={counter} />, 
  document.getElementById('root'))
}

setInterval(() => {
  refresh()
  counter += 1
}, 1000)
```


### v2 
```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

let counter = 1

const refresh = () => {
  ReactDOM.render(<App counter={counter} />, 
  document.getElementById('root'))
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
```

### v1
```js
import React from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

let counter = 1

ReactDOM.render(<App counter={counter} />, document.getElementById('root'))
```

# Destructive 

### v2
```js
import React from 'react'
import ReactDOM from 'react-dom'

const Hello = ( {name,age}) => {

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
        <p>So you were probably born in {bornYear()}</p>
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Nisko'
  const age = 1

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Hector" age={22 + 1} />
      <Hello name={name} age={age} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

### v1
```js
import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {

  //destructive 
  const {name,age} = props
  

  // const bornYear = () => {
  //   const yearNow = new Date().getFullYear()
  //   return yearNow -  props.age
  // }

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
        <p>So you were probably born in {bornYear()}</p>
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Nisko'
  const age = 1

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Hector" age={22 + 1} />
      <Hello name={name} age={age} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

