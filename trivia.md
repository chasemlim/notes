# Trivia 1/17

## JavaScript
------------------------
- High level interpreted programming language
- Dynamic
- Weakly Typed
- Prototype-Based
- Multi-paradigm
- Single-threaded
    - No ability to run multiple threads at once
    - Can't run in parallel - only execute one thing at a time
- Concurrent
    - Can delegate multiple tasks simultaneously--
- Never Blocking

## JRE (JavaScript Runtime Environment)
---------
- Promise
- Hoisting
    - JavaScript's default behavior of moving all **declarations** to the top of the current scope (ie: current script of function).
    - Functions stored in variables aren't hoisted

## Primitives in JavaScript
----
Primitives have no properties.
- String
- Number
- Boolean
- Null
- Undefined
- Symbol (New in ECMASCRIPT 2015)

JS takes primitives and coerces them into objects.

## TRIVIA TIME
----
- Are there implicit returns in JS?
    - YES!
    - Single line arrow functions
    - Functions invoked with the new keyword
    -async functions (implicity return a promise)

- What are the 7 falsey values in JS?
    - null
    - NaN
    - false
    - 0
    - ''
    - undefined
    - document.all

- What is the value of x? ( var y = 1, x = y = typeof x )
    - "undefined"
    - typeof returns a string of the type

- Difference between null and undefined?
    - undefined is a variable that's been declared but not assigned value
    - null is an assigned value, can be assigned to a variable as a representation of no value

- What is the value of `this` inside of a setTimeout function?
    - The window
    - Not the window inside of a => function, preserves the scope, unless the => function is on the window

- What is the value of `this` inside of a constructor function?
    - The instance of the new object

- Does JS pass parameter by value or by reference?
    - Reference
    - Passes everything except primitives by reference - primitives pass by value

- Is there any difference between window and document?
    - Yes

- Do document.onload and window.onload fire at the same time?
    - No
    - Window then document

- What are the different ways to get an element from DOM?
    - check online lol

- Fastest ways to select elements by using CSS Selectors?

- Can I use forEach or similar array methods on an HTMLCollection? How about a NodeList?
    - Not over HTMLCollection, but yes to NodeList
    - querySelector returns NodeList, getElementbyTagName is HTMLCollection

- How do you implement getElementsByAttribute?
    - just use it

- How would you add a class to an element by query selector?
    - .classList.add

- How could I verify whether one element is child of another?
    - child.parentNode - returns parent

- What is the best way to create a DOM element?
    - document.createElement

- What is createDocumentFragment and why might you use it?
    - Append elements onto the documentFragment and then append the documentFragment to the document all at once
    - appending to document is expensive 

- What is reflow? What causes reflow? How could you reduce reflow?
    - Critical to performance
    - Means you're rearranging elements on a page and pushes everything else around, forces the page to rerender and repaint all the elements you moved
    - Want to keep reflow to minimum
    - use createDocumentFragment to reduce reflow, less stuff moving around the page with only 1 append

- What is repaint and when does this happen?
    - Changes the document visibly but doesnt affect location or move elements on the page 
    - Expensive but not as expensive as reflow

- How could you make sure the run some JS when the DOM is ready, i.e $(document).ready?
    - addEventListener('DOMContentLoaded', ...)

- What is event bubbling?
    - When an event happens on an el, it first runs the handlers on the el, then the parent, then all the way up the chain
    - Capturing is the opposite of bubbling
        - When you click on a top level el and it drills down to children
        - Not very common
    - 3rd argument in add event listener 'true/false' decides whether to capture events or not

- What is the difference between event.target and event.currentTarget?


- How could you destroy multiple list items with one click handler?
    - `.removeChild()` inside of a click handler w/capture `true`

- How could you capture all clicks in a page?
    - Put event listener on window

- How could you capture all the text on a web page?
    - document.body.innerText