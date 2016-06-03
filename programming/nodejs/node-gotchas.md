Node Gotchas and Misc Notes
=============

## ES6
- see [here](https://nodejs.org/en/docs/es6/)
- Node is built on V8, which is a Javascript execution, so that will be the primary determinant of what ES6 features are usable
- [This](http://node.green/) site has a compatibility table for various features by node version
- You can also possibly turn features on and off with runtime flags to node, but if they're not on by default it's bc there are some stability concerns
- To see what version of V8 is running with node, use this: ```node -p process.versions.v8```
