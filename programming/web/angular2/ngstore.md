NgStore
===========
- Inspired by redux
- State management
- Basic Ideas:
    - State is a single immutable data structure
    - actions describe state changes
    - Pure functions called reducers take the previous state and the next action to compute the new state
        - Pure function: doesn't depend on or change anything outside of its scope
        - A pure function always returns the same result given the same parameters
        - Very important in functional programming
- State is accessed with `Store`: an observable of state and observer actions
- Rely on `OnPush` change detection strategy, and gives you fast, smart cd throughout the application

## Mapping to Smart-Dumb Component Arch
- Only your smart components will interact with your state service
- Your dumb components will receive updated models from their parent smart components
    - You will set the dumb component change detection strategy to OnPush
    - Dumb components will emit output events, but the smart component will translate that into state service calls

## Similarities to other patterns
- Very similar to event sourcing and CQRS
- One of many transactional message-passing patterns.
- Redux is based on the Flux pattern which is roughly event sourcing and command flow that work well on React
- NgRx is based on Redux- but I think the author didn't know much about CQRS at all
- Distinguishing/Key features for ngrx include:
    - JS Type safety (per typescript)
    - Wired together with Observables
    - State immutability, which works particularly well with one of the angular change detection (cd) strategies (`OnPush`)
- Note this is also an event Bus pattern bc:
    - When you dispatch an action, it can be heard (and acted upon) by all of your reducers
    - Some actions may target multiple reducers
    - Some reducers will be pass-through / no-ops depending on the action
        - That's why the default case in the reducer switch statement is usually to return state[] unmodified.

## Cast of Characters in NgRx Store Arch
- State can be:
    1. A collection of objects
    2. A single object
    3. A collection of functions which might be applied to something else (e.g. filtering functions)
    4. Pretty much anything
- Store:
    - A container for state(s)
    - An application probably has lots of different states
- Store reference 
    - injected into your component
    - gives you access to the dispatcher
- Action
    - Any event which should alter state in some way
    - Action is an interface which should conform to { type: string, payload: any }
    - Actions are passed into the dispatcher
- Reducer
    - A pure function which may apply certain changes to the state based on the input Action
    - The reducer is usually implemented with a top-level switch statement which looks at the particular action types it accepts, with a default value of passing through the state as is.
- provideStore()
    - Wires up your reducers for access via the Store
    - Arguments are every reducer your app uses
- Observables
    - You're subscribing to state changes in your smart component.
    - This could change values to component class properties, or you could use the async pipe in your template to unwrap an observable into values
- Functions like `array.map()`, `array.filter()`, `Object.Assign()` are important bc
    1. They always return a new object (hence state immutability)
    2. They're only dependent on language-provided classes, not state. (see pure functions note above)
- Async Pipe
    - You can use the async pipe to unwrap observables (particularly of state) into their individual values
    - Equally fine to use in the iteration expression in an `*ngFor` as well as an input property:
    ```(html)
    <myDumbComponent [myInputProp]="stateObservable | async"></myDumbComponent>
    ```
    - Also unsubscribes from the observable once your component is disposed.


## Reactive Angular 2 Video
- [Src](https://www.youtube.com/watch?v=mhA7zZ23Odw&feature=youtu.be)
- Redux: predictable state container for javascript (generally used w/ React)
- Based on the concept of the reducer:
```(javascript)
let myArray = [1, 2, 3];

//this is the reducer
//parm 1: accumulator, parm 2: current value
function sum(total, value) {
    return total + value
}

//parm 1: reducer function
//parm 2: initial value
let rv = myArray.reduce(sum, 0);  //returns 6
```
    - So the array object manages calling it with the appropriate parameters (accumulator, current value)
- Expanding on this concept:
```(javascript)
function counter(total, action) {
    switch(action) {
        case 'INCREMENT': 
            return total + 1;
        case 'DECREMENT':
            return total - 1;
    };
}
['INCREMENT', 'INCREMENT', 'DECREMENT'].reduce(counter, 0);
```
- Quick explanation of [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    - copies values of all enumerable own properties from one (OR MORE!) source objects to a target object AND returns the target object.
    - `finalTarget = Object.assign(target, ...sources)`;
    - Basically, it is good for shallow clones (ie those involving only values not references) and combining assignments in pieces (ie these props from object 1, some others from object 2, etc.)
    ```(javascript)
        var obj = { a: 1 };
        var copy = Object.assign({}, obj);
        console.log(copy); // { a: 1 }
    ```
    - Or another more involved version (tldr: use stringify to get deep clones...)
    ```(javascript)
    let a = { b: {c: 4} , d: { e: {f: 1} } };
    let g = Object.assign({}, a);
    let h = JSON.parse(JSON.stringify(a));    
    console.log(JSON.stringify(g.d)); // { e: { f: 1 } }
    
    g.d.e = 32;
    console.log('g.d.e set to 32.'); // g.d.e set to 32.
    console.log(JSON.stringify(g)); // { b: { c: 4 }, d: { e: 32 } }
    console.log(JSON.stringify(a)); // { b: { c: 4 }, d: { e: 32 } }
    console.log(JSON.stringify(h)); // { b: { c: 4 }, d: { e: { f: 1 } } }
    
    h.d.e = 54;
    console.log('h.d.e set to 54.'); // h.d.e set to 54.
    console.log(JSON.stringify(g)); // { b: { c: 4 }, d: { e: 32 } }
    console.log(JSON.stringify(a)); // { b: { c: 4 }, d: { e: 32 } }
    console.log(JSON.stringify(h)); // { b: { c: 4 }, d: { e: 54 } }
    ```
    - check this out for merging objects with the same properties...
    ```(javascript)
    var o1 = { a: 1, b: 1, c: 1 };
    var o2 = { b: 2, c: 2 };
    var o3 = { c: 3 };

    var obj = Object.assign({}, o1, o2, o3);
    console.log(obj); // { a: 1, b: 2, c: 3 }
    ```
    - Remember though- the output is always a new object!  
        - So you have a de facto state immutability when you assign/modify state using Object.assign()
        - The same is true of `map()`, and `filter()`
        - This is important for being able to use `OnPush` cd strategy
- Going even further...
```(javascript)
function todos(allTodos, action) {
    switch(action.type) {
        case 'ADD_TODO':
            return allTodos.concat([action.payload]);
        case 'DELETE_TODO':
            return allTodos.filter(todo => todo.id !== action.payload.id);
        case 'COMPLETE_TODO':
            return allTodos.map(todo => {
                return todo.id === action.payload.id ?
                    Object.assign({}, todo, {completed: true}) : todo;
            });
    }
}
//action { type : string, payload : any}
//payload should be any bc the parms wil depend on the various actions
```
- The next step now is to connect this idea with a stream...
```(typescript)
let initialState = [];

let actions:Observable<Action> = Observable.of([
    {type: 'ADD_TODO', payload: { id: 1, text: 'learn ngrx'} },
    {type: 'ADD_TODO', payload: { id: 1, text: 'learn ngrx'} },
    {type: 'COMPLETE_TODO', payload: { id: 1 } }
]);

//todos is the reducer (defined in last example)
//scan is an obserable method that is going to simulate a series of 
//events in the observable, and behave like reduce() - see notes below.
//just below this we're subscribing to this state and logging 
let state:Observable<Todo[]> = actions.scan(todos, initialState);

state.subscribe(todoState => {
    console.log(todoState);
});
```
    - Cast of characters:
        - `todos()`: reducer function
        - `Action` type: has the type of ation and parameters (payload)
        - `Todo[]`: The state we're maintaining is an array of Todo items which have a `text` and `completed` property
        - `state` is an observable of `Todo[]`
        - `scan()`: just like `reduce()` EXCEPT the problem with `reduce()` is it waits till the end of the array to give you the result, whereas `scan()` also gives you the intermediate values. 
- Put this in your main.ts:
    `import {provideStore} from '@ngrx/store';
    - provideStore() takes application configuration as a parameter.
        - It's like an in-memory db for your application
        - And each reducer is analogous to a table (roughly)
- Example reducer:
```(typescript)
export interface Todo {
    id?:number;  //? after an interface property indicates that it is not required
    text?:string;
    completed?:boolean;
}

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

let nextTodoId = 0;

export function todos(allTodos = [], action) {
    switch(action.type) {
        case ADD_TODO:
            return allTodos.concat([
                Object.assign({}, action.payload, { id: nextTodoId++, completed: false})
            ]);
        case DELETE_TODO:
            return allTodos.filter(todo => todo.id !== action.payload.id);
        case UPDATE_TODO:
            return allTodos.map(todo => {
                    return todo.id === action.payload.id ?
                        Object.assign({}, todo, action.payload) : true;
                }
            );
    };
}
```
- Here's another reducer:
```(typescript)
export const visibilityFilter = (state='SHOW_ALL', action) => {
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.payload;
        default:
            return state;
    }
}
```

### Integration w Actual App
- Write your reducers (as above)
- Register your reducers with provideStore in your app module...
```(typescript)
import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store';
import { todos } from './todos';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.provideStore({ todos: todos })
  ],
  ...
})
export class AppModule {}
```
- Define an interface that represents all the state you maintain:
```(typescript)
export interface AppState {
    todos: Todo[];
    visibilityFilter: string;
}
```
- Then in the your app and smart components, you'll inject `Store<AppState>` into your constructor.
- And you can now subscribe to state changes...
```(typescript)
@Component({}
    //...
})
export class MyComponent {
    todos: Observable<Todo[]>;

    constructor(private store: Store<AppState>) { 
        this.todos = store.select('todo');
        //
    }
}
```
- Examples of store-component interactions:
```(typescript)
//output any state changes to the console
store.subscribe(state => console.log(state));

//select is a custom operator the ngrx team came up with
//basically we can subscribe to the state maintained by 
//a particular reducer.  
//Note: The return value is an Observable... this is good b/c...
this.todos = store.select('todos');

//(btw... this is a more type-safe version of the last)
this.todos = store.select(state=> state.todos);

//you access the observable from your template, via the async pipe
//<todo-list [todos]="todos | async"></todo-list>
//async "unwraps" the observable so all you get are the new values

//if you don't want to unwrap the observable in your template, you
//can use the following approach with subscribe.
//subscribe = give me the last value emitted and all future values
//as long as I'm subscribed.
store.select('todos')
    .subscribe(todos => {
        this.todoVals = todos;
    }):

//as mentioned earlier, select() is a custom operator on the store,
//but it's actually just a combination of existing rx operators.
store.map(state => state['todos']).distinctUntilChanged()
    .subscribe(todos => {
        this.todoVals = todos;
    }):


//dispatch a bogus action
store.dispatch({
    type: 'Anything',
    payload: {
        foo: 'bar'
    }
});

//or in your dumb components, you can emit an action which is in the
//format expected by your reducer
addTodo() {
    this.action.emit({ type: 'ADD_TODO', payload: { text: this.newTodoText }});
    this.newTodoText = '';
}

//if you do this then you can dispatch to the store from your smart component's
//template:
//<new-todo (action)="store.dispatch($event)"></new-todo>

```
- The Time Travelling Debugger
    - use the component `<ngrx-devtools>`
- Nifty rxjs operator: combineLatest()
    - lets you combine observables and anytime any one of them is updated, you can can emit the latest values for both of them.
    ```(typescript)
    Observable.combineLatest(
        store.select('people'),  //this is a state observable
        store.select('filter'),  //this is a state observable
        (people, filter) => {   //this last parm is your projection function that gets called when one changes
            //note that people and filter parms are the latest VALUES of these observables
            //filter, just happens to be a filter function, which is fine for state
            return people.filter(filter);  
        }
    )

## Notes from Comprehensive Github Gist
- [src](https://gist.github.com/btroncone/a6e4347326749f938510)



