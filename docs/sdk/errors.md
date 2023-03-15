---
title: Errors
description: Mutate your table values with additional access control.
synopsis: Table values can be mutated by the table owner or provisioned actors.
keywords:
  - write to table
  - mutate table
---

The `stmt.` and `db.` methods will throw an [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) whenever an error occurs. `Database` Errors use [cause property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) for details.

```tsx
new Error("ERROR", { cause: new Error("Error detail") });
```

To capture exceptions:

```tsx
try {
  await db.exec("INSERTZ INTO my_table (name, employees) VALUES ()");
} catch (e: any) {
  console.log({
    message: e.message,
    cause: e.cause.message,
  });
}
/*
{
  "message": "EXEC_ERROR",
  "cause": "Error in line 1: INSERTZ INTO my_table (name, employees) VALUES (): sql error: near \\"INSERTZ\\": syntax error in INSERTZ INTO my_table (name, employees) VALUES () at offset 0"
}
*/
```
