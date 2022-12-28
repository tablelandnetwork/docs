## hello

```js
function HighlightSomeText(highlight) {
  if (highlight) {
    // highlight-next-line
    return "This text is highlighted!";
  }

  return "Nothing highlighted";
}

function HighlightMoreText(highlight) {
  // highlight-start
  if (highlight) {
    return "This range is highlighted!";
  }
  // highlight-end

  return "Nothing highlighted";
}
```
