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