---
title: Logout
description: Exit a session after logging in.
keywords:
  - CLI
  - command line
  - studio
---

## `studio logout`

After you've used the `studio login` command, you can log out of that account in case you need to switch to a different wallet connection or want to simply end the current session.

## Example

```bash
studio logout
```

Once executed, the following will be logged to confirm that account is now logged in:

```md
You are logged out
```

This will erase what's stored in the `.studioclisession.json` file in your home directory. It will now only contain an empty JSON object `{}`.
