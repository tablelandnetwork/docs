---
description: Crafting a good bug report takes time, but is well worth the effort!
---

# Bug Reports 101

Before creating bug reports, please **perform a cursory search** in the repo in question to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one. You might just find out that you don't need to create a new ticket at all. When you _are_ creating a bug report, please include as many details as possible.

> Note: If you find a closed issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

### **How do I submit a (good) bug report?**

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined you need to create an issue, create one by filling in the bug report template for the repo in question. Explain the problem and include additional details to help others reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. For example, start by explaining how you started the application, e.g. which command exactly you used in the terminal, or how you installed the library. When listing steps, **don't just say what you did, but explain how you did it**. For example, if you used a command line tool, make sure you provide the sequence of steps you performed to create the bug in the first place.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If you're reporting that something crashed**, include a crash report with a stack trace from the operating system. On macOS, the crash report will be available in `Console.app` under "Diagnostic and usage information" > "User diagnostic reports". Include the crash report in the issue in a [code block](https://help.github.com/articles/markdown-basics/#multiple-lines), a [file attachment](https://help.github.com/articles/file-attachments-on-issues-and-pull-requests/), or put it in a [gist](https://gist.github.com) and provide link to that gist.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Did the problem start happening recently** (e.g. after updating to a new version) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version?** What's the most recent version in which the problem doesn't happen? You can download older versions from the releases page of the repo in question.
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.

Include details about your configuration and environment:

* **Which version of the software are you using?**
* **What's the name and version of the OS you're using**?
* **Are you running in a virtual machine?** If so, which VM software are you using and which operating systems and versions are used for the host and the guest?
