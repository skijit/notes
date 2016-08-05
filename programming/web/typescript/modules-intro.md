Intro to TypeScript Modules and Namespaces
============

## Modules and Namespaces
- Comparison of Intent: 
    - Namespaces:
        1. Logical grouping of code
    - Modules
        1. Logical grouping of code
        2. Injected into dependent code
- Namespaces:
    - Live in the global scope
    - Rely on \<script\> tags to be imported
    - More appropriate in web applications (since that's where \<script\> tags will occur).
- You shouldn't use BOTH namespaces and modules
    - Modules cover the logical grouping on their own
    - Typescript requires that consumers of a module assign a name / alias to the module, so there's no chance of scope/namespace collisions.
- Modules are part of the ECMA2015/ES6 standard, whereas namespaces are NOT.
    - Prior JS versions had no system definition of modules, but there are various polyfills (e.g. ComonJs, AMD, etc.).
- TypeScript has 3 ways to 'import' code from other files:
    1. Namespaces + \<script\> tags
    2. Import/Export (Modules)
    3. Compiler Directives ```/// <reference> node.d.ts``` (Ambient Modules or Ambient Namespaces) 
- [Decent short discussion of Modules vs Namespaces](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Namespaces%20and%20Modules.md)


## ES6 Modules
### Why?
- Module loading in TypeScript seems a little overwrought but I think this is bc it's a superset of ES6 module syntax:
    A. ES6 part makes it future proof => Obvious Win!
    B. Extra stuff is for compatibility with older-style modules or ECMA versions (that's where it gets a little ugly)
        - Remember that all the pre-ES6 module stuff was not part of the language spec, so the new ES6 module stuff doesn't have to be backwards compatibility.
        - 2 options in tsconfig.json that affect the compiled code: 
            - **target** : the target js version (eg ES5, ES3, etc.)
            - **module** : the module system to use (eg commonjs, requirejs, etc) 
- Makes sense to introduce the ES6 Module approach first, so we can separate the two approaches in TypeScript.
- Good reference [here](http://www.2ality.com/2014/09/es6-modules-final.html)
- Borrows features from both predecessors: CommonJS and AMD
    - Syntactically aligned with CommonJS

### Design
- Has 2 parts:
    1. Declarative Syntax (described below)
    2. API describing functionality like conditional loading, misc configuration (not discussed)
- 2 Kinds of ES6 Modules
    1. **Named Exports**: 1 Module w Several Exports
        - Importing specific exports in a module:
        ```(javascript)
        //------ lib.js ------
        export const sqrt = Math.sqrt;
        export function square(x) {
            return x * x;
        }
        export function diag(x, y) {
            return sqrt(square(x) + square(y));
        }
        
        //------ main.js ------
        import { square, diag } from 'lib';
        console.log(square(11)); // 121
        console.log(diag(4, 3)); // 5```
        
        - Importing all exports in a module:
        ```(javascript)
        //------ main.js ------
        import * as lib from 'lib';
        console.log(lib.square(11)); // 121
        console.log(lib.diag(4, 3)); // 5```
    
    2. **Default Exports**: 1 Module w 1 Export
        ```(javascript)
         //------ myFunc.js ------
        export default function () { ... };
        
        //------ main1.js ------
        import myFunc from 'myFunc';
        myFunc();```

## Modules in TypeScript
- Warning:
    - TypeScript needs to be able to support ES6 modules as well as it's various predecessors (CommonJS, AMD, etc.)
    - The way you import modules in TypeScript is dependent on:
        - The type of module
        - It's structure
- Per [the handbook](https://www.typescriptlang.org/docs/handbook/modules.html), a module is any file containing a top-level ```import``` or ```export```.
    - 'Top-Level' bc namespaces use embdedded ```export``` statements.  This doesn't count as a module.
- Modules are executed in their own scope- not the global scope.
- Objects in a module are not visible unless they are exported by the producer and imported by the consumer.
- Export Methods
    A. Named Exports:
        1. Export at Declaration
        ```(javascript)
        export const numberRegexp = /^[0-9]+$/;

        export class ZipCodeValidator implements StringValidator {
            isAcceptable(s: string) {
                return s.length === 5 && numberRegexp.test(s);
            }
        }```
        
        2. Export Statements (Multiple Varieties)
            - Explicit - No rename:
            ```(javascript)
            export { ZipCodeValidator };```
            
            - Explicit With rename:
            ```(javascript)
            export { ZipCodeValidator as mainValidator };```
            
            - Explicit Re-export:
            ```(javascript)
            //---- blah.ts ----
            export { myExport as myReExported } from './SomeOthermodule'
            ```
            
            - Bundling (= Re-export + Implicit)
            ```(javascript)
            export * from "./StringValidator";
            export * from "./LettersOnlyValidator";
            export * from "./ZipCodeValidator";```
            
        - So...
            - Individual exports can be renamed
            - Logical grouping is applied by **import**
                - For the producer, the exports don't have a container or namespace applied to them (most of the time)
    B. Default Exports:
        1. Normal Way
            - Export at Declaration
            ```(javascript)
            export default function (s: string) {
                return s.length === 5 && numberRegexp.test(s);
            }```
            
            - Export Statement
            ```export default app;```
            
        2. For Non-ES6 Modules
            ```export = ZipCodeValidator;```
    
- Import Methods
    1. Importing Named Export(s) Explicitly
        - No rename, no container:
        ```import { ZipCodeValidator } from "./ZipCodeValidator";```
        
        - Rename, no container:
        ```import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";```
    
    2. Importing All Named Exports into a container
        ```import * as validator from "./ZipCodeValidator";```
                
    3. Importing an ES6 Default Export
    ```import $ from "JQuery";```
    
    4. Importing a Non-ES6 Default Export
    ```import cookieParser = require('cookie-parser');```
   

     
- TODO: Discuss Module Producer/Consumer Scenarios:
    1. Exporter: **Type**Script, Importer: **Type**Script
    2. Exporter: **Java**Script, Importer: **Type**Script
    3. Exporter: **Type**Script, Importer: **Java**Script
### 3 Ways to Import
1. Standard
    ```import * as express from 'express';```
    - We're assigning the type an alias/handle ```express```
    - Compiles to... (in ES5 / Common)
        ```var express = require('express')```
        - This is the typical node require/import style 
2. Pulling a single export from a module
    ```import {join} from 'path'```
    - No alias here!  We're just pulling out the ```join``` export from the 'path' module.
    - Compiles to...
        ```(javascript)
        var path_1 = require('path');
        //all subsequent references to join are through path_1.join```
3. Non-ES6 

    

## Notes on Runtime Module Loaders:
- ECMA2015 : Language supported
- CommonJS: Used by node
- require.js: popular on the web

## Namespaces
- Live in the global scope
- Can span multiple files (use the ```reference``` compiler directive)

## Ambient Namespaces and Ambient Modules
- Describe a (typically 3rd party) API using typescript syntax
- File Extension is .d.ts
- Analogous to a header file insofar as it specifies the interface without the implementation
- Included via compiler directives ``` /// <reference> node.d.ts ```
    - These directives can be bundled in a single file and then added to a top level file
- They're called 'ambient' because they're always available in the background
    - 'Ambient' is probably a better term than 'global' bc these are design-time constructs exclusively
- npm project ```typings``` lets you install these 3rd party 'typings' files from a variety of repository mirrors
- Not totally clear when Ambient namespace is preferred to Ambient module but namespace *might* be preferable when...
    1. The library is primarily loaded via \<script\> tags
    2. The library only exports a few high level objects

## How do you alias types (under namespaces)?

## Other Best Practices / AntiPatterns
- dont [namespace + modules](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Namespaces%20and%20Modules.md#needless-namespacing)


- TODO:    
    - Write up notes
    - Update code
    - possibly write my www start script in TS also... for consistency
    - Update project structure
    - gulp
    - refactor code