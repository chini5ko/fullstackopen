# fullstackopen
A repo that contains all my fullstackopen assigments 

# Full Stack Open URLS
- [home](https://fullstackopen.com/en)
- [Courses](https://fullstackopen.com/en#course-contents)
- [submit](https://studies.cs.helsinki.fi/stats/courses/fullstackopen)

# Resources

## JS
- [Mozilla JS](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Mozilla re-intro](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
- [youDontKnowJS](https://github.com/getify/You-Dont-Know-JS)
- [https://javascript.info/](https://javascript.info/)

##### video
[functional programming](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)


# Debugging Tips 
- [VS_Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_creating-your-own-snippets)

- [higherOrderFunc](https://www.youtube.com/watch?v=BMUiFMZr7vk&list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84)


# JS Important Concept 

## Event 
The event parameter is the event that triggers the call to the event handler function:

- The event handler immediately calls the event.preventDefault() method, which prevents the default action of submitting a form. The default action would, among other things, cause the page to reload.
```js
const addNote = (event) => {
  event.preventDefault()
  console.log('button clicked', event.target)
}
```

