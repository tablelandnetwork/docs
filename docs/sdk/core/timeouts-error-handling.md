---
title: Error handling
description: Review SDK error handling setup and what types of messages will bubble up.
keywords:
  - error
  - error handling
---

The `stmt.` and `db.` methods will throw an [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) whenever an error occurs. `Database` Errors use [cause property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) for details.

```js
new Error("ERROR", { cause: new Error("Error detail") });
```

To capture exceptions, you can use a [`try...catch` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch). For example, try using an invalid keyword `INSERTZ`:

```js
try {
  await db.exec("INSERTZ INTO my_table (name, employees) VALUES ()");
} catch (e: any) {
  console.log({
    message: e.message,
    cause: e.cause.message,
  });
}
```

The `try...catch` statement will attempt to execute the `try` block's code but `catch` the error and log the following:

```json
{
  "message": "EXEC_ERROR",
  "cause": "Error in line 1: INSERTZ INTO my_table (name, employees) VALUES (): sql error: near \\"INSERTZ\\": syntax error in INSERTZ INTO my_table (name, employees) VALUES () at offset 0"
}
```
