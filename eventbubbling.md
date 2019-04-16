Given

```js
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

Clicking on the `p` results in a series of alerts - p, div, form

- Bubbles up until the document object
- One of the few exceptions to bubbling is the `focus` object
- event.target – is the “target” element that initiated the event, it doesn’t change through the bubbling process.
- this – is the “current” element, the one that has a currently running handler on it.

To prevent bubbling:
- add `onclick="event.stopPropagation()"`

- Capturing is the "bubbling down" the tree of the event until it reaches the target of the click

![capturing](https://javascript.info/article/bubbling-and-capturing/eventflow.png)