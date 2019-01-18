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

Primitives have no properties.
- String
- Number
- Boolean
- Null
- Undefined
- Symbol (New in ECMASCRIPT 2015)

JS takes primitives and coerces them into objects.

## TRIVIA TIME

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