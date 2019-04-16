# 33 JavaScript Concepts Notes
----------------------------

## 1. Call Stack

- JS is a single threaded concurrent language
    - Can handle one task/piece of code at a time
- Single **call stack**

- Call stack
    - Data Structure that records the function calls
    - Call function - push onto the stack
    - Return from function - pop off the top of the stack
    - Last In First Out

- Heap
    - Objects are allocated here
    - Mostly unstructured region of memory
    - All memory allocation for variables & objects happens here

- Queue
    - List of messages to be processed + associated callback functions to execute
    - When stack has enough capacity:
        - Message is taken out of queue
        - Call the associated function (which creates a stack frame)
        - Message processing ends when stack is empty again
    - Messages are queued in response to external async events (mouse click/HTTP request response)
        - If no callback function provided, doesn't enqueue

- Event Loop
    - Looks both at the stack and the task queue
    - Pushes the first thing on the queue to the stack when the stack is empty
    - Each message or CB is processed fully before the next

- Execution Context
    - Every time you run JS in a browser/Node the engine goes through a series of steps
    - 2 main JS engines used today - Google V8 and SpiderMonkey
        - V8 is Google's open source JS engine, used in Chrome and Node.js
        - SpiderMonkey is Mozilla's engine used in FireFox
    - Execution Context - essentially the environment in which your JS code runs
    - **Global Memory** (aka Global Scope/Global Variable Environment)
        - Stores global variables and function declarations for later use
    - Global Memory stores functions and variables until they are called
        - Once they are called, they are pushed onto the stack
        - Function appears in the Global Execution context
        - Local Execution Context is created to hold local variables


## 2. Primitive Types

- JavaScript Numbers
    - Floating point
    - Stored in binary, default output is decimal
    

## 3. Value vs. Reference

- Primitive Types: Boolean, null, undefined, String, Number
    - Passed by value
- Objects: Function, Array, Object
    - Passed by reference
- Variables that are assigned a non-primitive value are given a reference to that value. That reference points to the object’s location in memory. The variables don’t actually contain the value.
- When we write arr = [], we’ve created an array in memory. What the variable arr receives is the address, the location, of that array.

## 4. Implicit, Explicit, Nominal, Structuring and Duck Typing

- Passing a string into a numeric expression is similar to calling `Number` function on the value
- Any string containing numeric characters only converts to number equivalent `("1")`
- Non-numerics present in a string return `NaN` ex. `("1,")`
- When a string is an operand of `+`, JS converts the number to a string
`1 + "2" = "12"`
- Most JS Object conversions result in `[object Object]`
`"name" + {} = "name[object Object]`
- EVERY JS Object inherits a `toString` method, called whenever an obj is to be converted to a string - return value of this method is used for string concatenation and mathematical expressions
```js
const foo = {}
foo.toString() // [object Object]

const baz = {
  toString: () => "I'm object baz"
}

baz + "!" // "I'm object baz!"
```

- For mathematical expressions, JS attempts to convert return value to number if it's not already
```js
const foo = {
  toString: () => 4
}

2 * foo // 8
2 / foo // 0.5
2 + foo // 6
"four" + foo // "four4"

const baz = {
  toString: () => "four"
}

2 * baz // NaN
2 + baz // 2four

const bar = {
  toString: () => "2"
}

2 + bar // "22"
2 * bar // 4
```

- Array `toString` method works like calling `.join()`
`[1,2,3].toString() // "1,2,3"`
```js
"me" + [1,2,3] // "me1,2,3"
4 + [1,2,3] // "41,2,3"
4 * [1,2,3] // NaN
```

### `valueOf` method

- Can define a `valueOf` method on an object for numeric or string operations
```js
const foo = {
  valueOf: () => 3
}

3 + foo // 6
3 * foo // 9
```
- valueOf takes priority over toString on an object if valueOf is defined
- The valueOf method is intended for Objects that are supposed to represent a numeric value

### NaN

- `NaN` is the only JS value not equal to itself
- `Number.isNaN`

## 5. == vs === vs typeof

### `===`
- Strict equality
- Type and value must be identical

### `==`
- Loose equality
- Performs type coercion


### duck-typing
- Checking the behavior to verify if an object or value really is a certain type
```js
function isArray(obj){
    return (typeof(obj.length)=="undefined") ?
        false:true;
}
```
- duck-typing is inexact, has false positives, and there are multiple ways of approaching it

## 17. Prototype Inheritance and Prototype Chain

- JavaScript classes introduced in ECMAScript 2015 are basically just syntactical sugar for the pre-existing prototype-based inheritance
- Added OOP features like `class`, `constructor`, `super`, `extends`, `static`, etc

### Optimization

- Bytecode is shorter and more compact, is created faster, but requires an interpreter to run
- Machine code is much longer and requires a compiler to create, but can be ran much faster and more efficiently
- `Shape` of an object is the structure of the object
```js
{
    x: .....
    y: .....
}
```
- `Shape` contains all property names and attributes, but no values
    - Contains the **offset** of the values inside the object, so the JS engine knows where to look
- `Shape` optimizes value lookup by allowing every `object` with the same shape to point to this `Shape` instance, so the `object` only has to store values unique to it
- Note: `{ x: ..., y: ... }` has a different shape than `{ y: ..., x: ... }`. Order in which properties are added affects the shape
- JS Engines use a `ShapeTable` data structure to speed up searching for properties
    - Effectively a dictionary, mapping property keys to respective `Shape`s that introduce the given property
- `Shape`s enable use of Inline Caches

### Inline Caches
- ICs are a big reason why JS runs fast
- ICs are used to memorize information on where to find properties on objects, reducing # of expensive lookups

- To optimize `prototype` access, JS engines store the prototype link on the `Shape` instead of the object instance
- When the prototype changes, the `Shape` of the object changes as well
- `ValidityCell` is an association that verifies if the prototype it's associated with or any prototype above it in the chain has been changed
    - Invalidated when there's a change
- On V8 engine, `InlineCache` is used to store the `ValidityCell` of the immediate linked prototype, the `prototype`, the `shape` of the instance, and the property `offset`
- When the prototype is changed, a new shape is allocated, and the previous `ValidityCell` is invalidated, making the IC miss, which worsens performance
- Performance impact worsens the further down the prototype chain you are, as it affects all object prototype above it
- Practical tip: **Don't mess with prototypes**, and if you need to, then do it before other code runs to optimize runtime