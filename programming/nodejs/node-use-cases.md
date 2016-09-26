Node Benefits
========================
- Status: **In-Progress** Needs update!
- Sources
    - [SO question](http://stackoverflow.com/questions/1884724/what-is-node-js/6782438#6782438)

## Benefits
-Web development in a dynamic language (JavaScript) on a VM that is incredibly fast (V8). It is much faster than Ruby, Python, or Perl.
- Ability to handle thousands of concurrent connections with minimal overhead on a single process.
- JavaScript is perfect for event loops with first class function objects and closures. People already know how to use it this way having used it in the browser to respond to user initiated events.
- A lot of people already know JavaScript, even people who do not claim to be programmers. It is arguably the most popular programming language.
- Using JavaScript on a web server as well as the browser reduces the impedance mismatch between the two programming environments which can communicate data structures via JSON that work the same on both sides of the equation. Duplicate form validation code can be shared between server and client, etc
- Compared to C#/Java: Doing asynchronous in Node.js is easier than doing thread-safety anywhere else and arguably provides greater benefit. Node.js is by far the least painful asynchronous paradigm I've ever worked in. With good libraries, it is only slightly harder than writing synchronous code.
- Why not just use one process/thread per connection like everyone else? In Node.js, a new connection is just a very small heap allocation. Spinning up a new process takes significantly more memory, a megabyte on some platforms. But the real cost is the overhead associated with context-switching. When you have 10^6 kernel threads, the kernel has to do a lot of work figuring out who should execute next. A bunch of work has gone into building an O(1) scheduler for Linux, but in the end, it's just way way more efficient to have a single event-driven process than 10^6 processes competing for CPU time. Also, under overload conditions, the multi-process model behaves very poorly, starving critical administration and management services, especially SSHD (meaning you can't even log into the box to figure out how screwed it really is).
- Node.js is SINGLE THREADED and LOCK FREE. Node.js, as a very deliberate design choice only has a single thread per process. Because of this, it's fundamentally impossible for multiple threads to access data simultaneously. Thus, no locks are needed.