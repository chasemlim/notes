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

## Prototypes

- Prototype is an object that exists as a property on every function in JavaScript
- Contains methods such as `constructor`, which is accessed by keyword `new`
- `extends` keyword adds a `prototype` reference from the previous class to the new prototype
    - Provides access to both the previous classes methods and the new ones
    - Can extend any expression or function
```js
function f(phrase) {
  return class {
    sayHi() { alert(phrase) }
  }
}

class User extends f("Hello") {}

new User().sayHi(); // Hello
```
- Results in `User` inheriting the result of `f("Hello")`

## `super`
- ES6 arrow functions don't have `super`
- When `extend`ing a class, must use `super` to access previous constructor methods and parameters

## 30. Inheritance, Polymorphism and Code Reuse

### Polymorphism
- The ability to write a single function that handles many data-types
- Fundamentally identical to abstraction
- In OOP context, polymorphism usually refers to overriding inherited methods to facilitate callling the same method on different objects
- a.k.a "One Size Fits All"
- Issue with longterm polymorphism:
    - Forms of data the program will encounter and the operations it will perform will not likely remain constant in the future
    - How do you account for a new datatype?
- Clojurian method: use protocols
    - Protocols specify certain functions as a baseline interface, implement them differently for unique data types, dispatch on the type of the first argument, and extend them to new datatypes
    - Avoid namespace collision
- Typical common solution:
    - Go back and change interfaces to support new datatype
        - Violates the "O" in SOLID (open for extension, closed for modification)
    - Directly add or override the methods (monkey-patch) required by the interface on the new datatype

### Implementation
- Polymorphism is either 'ad hoc' or 'universal'
- Ad hoc:
    - When a function call results in a dispatch to one of one or more type-specific functions depending on argument type
    - Either coerce the argument to a single type
        - Only one implementation is necessary
    - Or overload the function to cover all bases for each argument type
- Subtype:
    - Specific to OOP
    - Class method can be called with an infinite number of types - aka any class which inherits from the original class
    - Call is dynamically bound to the implementation on the particular subtype
- Parametric:
    - Function which can be called with an infinite number of types unrelated by inheritance
    - Has a single functional form across all types
        - Performs the same operation irregardless of what type is passed
    
## 9. Message Queue and Event Loop
- JavaScript - single threaded
    - Only one thing happens at a time
    - Simplifies how you program without worrying about concurrency issues
    - Have to avoid things that can block the thread, like synchronous network calls or infinite loops
- Callbacks, promises, and async/await exist to help prevent the thread from getting clogged up

### Call Stack
- LIFO Stack
- Event loop continuously checks the call stack to see if there's any functions to run
- While checking, adds any function calls it finds to the call stack and executes each in order

### ES6 Job Queue
- Used by Promises to execute the result of an async function ASAP, without having to put it at the end of the call stack
- Promises that resolve before the current function ends will execute right after the current function
- Analogy: 
    - Standing in line for a rollercoaster - Message Queue
    - Fastpass ticket - Job Queue

## What happens when you type google.com and press enter

1. Browser checks the cache for a DNS record to find the corresponding IP address
    - First checks browser cache
    - Next checks the OS cache
    - Next checks the router cache
    - Lastly checks ISP cache
2. If request URL is not in cache, the DNS server initiates a DNS query to find the IP and the server that hosts google.com
    - DNS query searches multiple DNS servers on the internet
    - Search bounces from DNS server to DNS server until it either finds the IP address or returns a response saying it was unable to find it
        - Called a recursive search
3. Browser initiates a TCP connection with the server
    - After receiving the correct IP address it builds a connection with the server, most likely with TCP protocol
### TCP/IP three-way handshake
- A three step process where the client and server exchange SYN(synchronize) and ACK(acknowledge) messages to establish connection
    
    1. Client machine sends a SYN packet to the server asking if it is open for new connections
    2. If the server has open ports that can accept and initiate new connections, it will respond with an acknowledgment of the SYN packet using a SYN/ACK packet
    3. The client will receive the SYN/ACK packet from the server and acknowledge it by sending an ACK packet
4. The browser sends an HTTP request to the web server
    - Browser sends a GET request asking for google.com web page
5. The server handles the request and sends back a response
    - Server receives the request and passes it to a request handler to read and generate a response
    - Request handler processes the request and assembles a formatted response (JSON, XML, HTML)
6. Server sends out an HTTP response
    - Server response contains the web page requested as well as status code and other details
7. The browser displays the HTML content
    - Renders out the HTML skeleton
    - Checks the HTML tags and sends out GET requests for additional elements (images, stylesheets, JS files)