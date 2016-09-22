Node Benefits
========================
- Sources
    - [SO question](http://stackoverflow.com/questions/1884724/what-is-node-js/6782438#6782438)

## Benefits
-Web development in a dynamic language (JavaScript) on a VM that is incredibly fast (V8). It is much faster than Ruby, Python, or Perl.
- Ability to handle thousands of concurrent connections with minimal overhead on a single process.
- JavaScript is perfect for event loops with first class function objects and closures. People already know how to use it this way having used it in the browser to respond to user initiated events.
- A lot of people already know JavaScript, even people who do not claim to be programmers. It is arguably the most popular programming language.
- Using JavaScript on a web server as well as the browser reduces the impedance mismatch between the two programming environments which can communicate data structures via JSON that work the same on both sides of the equation. Duplicate form validation code can be shared between server and client, etc
- Compared to C#/Java: Doing asynchronous in Node.js is easier than doing thread-safety anywhere else and arguably provides greater benefit. Node.js is by far the least painful asynchronous paradigm I've ever worked in. With good libraries, it is only slightly harder than writing synchronous code.