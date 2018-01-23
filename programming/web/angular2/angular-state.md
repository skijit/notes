Angular State Mgmt 
=================

- [source 1: Victor Savkin Talk](https://www.youtube.com/watch?v=brCGZ8Lk-HY)

## Types of State

- Server State:
  - Back-end
  - Usually exposed by REST endpoint
  - technically not part of your angular app
- Persistent State:
  - The subset of the server state that you cache in your client
  - EG items in a list produced by a query to the web endpoint
- Client State:
  - State which is NOT stored on the Back end
  - Only kept in memory
  - EG filters (checkboxes) selected
- Url or Router State:
  - URL current value or if a router, a structured representation of the URL
- Transient Client State:
  - State which is NOT reflected in URL
  - EG when youtube video lets you resume a video at the place you last left off
    - cookies, local storage, etc.
- Local UI State:
  - State of individual components
  - Component-level state
- **Best practice**: Reflect both persistent and client state in the URL
  - Makes it bookmarkable
  - back button works

## State Sync Problems
- Two types of state synchronization?
  - Server State <--> Persistent State
  - URL/Router State <--> Client State and Persistent State
- Why is synchronization necessary:
  - BC they're copies of the same data (albeit in different forms):
    - Server State and Persistent State : the latter is just a subset of the former
    - Client state + Router state and Url/Router state : same

### Sync Issues Between Server State and Persistent State

```(typescript)
export class Backend {
  _talks: {[id:number]: Talk} = {};

  constructor(private http: Http) {}

  //...

  rateTalk(id:number, rating: number): void {
    const talk = this._talks[id];
    talk.yourRating = rating;
    return this.http.post('/rate', { id: talk.id, yourRating: rating});
  }
}
```

- Optimistically updating: we change the local talk rating before sending it to the server
- But what happens if the post call fails?
  - sync error / inconsistency between front end and back end
- One potential fix (which actually doesn't work)...

```(typescript)
  rateTalk(id:number, rating: number): Observable<any> {
    const talk = this._talks[id];
    talk.yourRating = rating;
    return this.http.post('/rate', { id: talk.id, yourRating: rating}).catch(e => {
      talk.yourRating = null;
      throw e;
    });
  }
```

- Problems with this approach:
  - Setting it to null may not actually match the server state
  - Still susceptible to out of order sync issues (race condition).  EG...
    - send a rating of 4
    - Backend generates a failing response
    - In between sending the rating of 4 and getting the fail, the user might generate another post to a value of 3 and get back a response
    - When the failing response returns, it will set local rating to null but on server side, it will be 3

### Sync Issues Between URL and Client/Persistent State

```(typescript)

@Component({
  //usual descriptors like selector, etc.
})
export class TalksAndFiltersCmp {
  constructor(public backend : Backend) {}

  handleFiltersChange(filters: any) : void {
    this.backend.fetch(filters);
  }
}

```

- handleFiltersChange() gets called any time a user/ui event changes the filter.
  - then it submits the changes to the backend
  - **problem**: if you hit refresh, those filter changes are lost (unless you have some transient state approach, which we don't want here)
- one possible solution:

```(typescript)
@Component({
  //usual descriptors like selector, etc.
})
export class TalksAndFiltersCmp {
  constructor(public backend : Backend, private router: Router, route:ActivatedRoute) {
    route.params.subscribe((p:any) => {
      //when the URL changes, update the backend
      this.backend.fetch(paramsToFilters(p));
    });
  }

  handleFiltersChange(filters: any): void {
    //when a user event occurs, translate those filters into router params and update route
    this.backend.fetch(filters).then(() => {
      this.router.navigate(["/talks"], filtersToParams(filters));
    });
  }
}
```

-  The change event should update the router, router calls the backend.
- **BUT it still fails on the out-of-order response**
  - if there are 2 filter changes, the first request could return last.
    - more accurately, it could finish execution on the server last.
- These are essentially race conditions which involve state synchronization issues
  - Race condition is when the output is dependent on a sequence or timing of uncontrollable events.

## Mistakes Made
- State Management and side effects are not separated
  - A note about side effects:
    - Side effect refers to changing some value as a result of some action (effect rather than a cause)
    - Side effect usually refer to the unintented results- analogously, I think the function return value is the primary effect and any ancillary actions taken during the course of execution (changing state, printing, writing to disk, etc.) is considered a side effect.
    - Pure functions are those which only compute a value (ie mathematically) and do not have side effects
    - Some functions are only useful for their side effects (e.g. sleep())
  - backend class was managing state but also talking to the server... these should be separated.
- No clear sync strategy between persistent and server state
- No clear sync strategy between client and url state
- Model is not immutable
  - Immutability is very important for fast handling of change tracking
  - Mutability also prevents collisions and logical errors when sharing references to objects
  - In Javascript only numbers and string are immutable
 
## State Patterns and Best practices

### Separating State Management from Side Effects

- Remember old code:

```(typescript)
  rateTalk(id:number, rating: number): Observable<any> {
    const talk = this._talks[id];
    talk.yourRating = rating;
    return this.http.post('/rate', { id: talk.id, yourRating: rating}).catch(e => {
      talk.yourRating = null;
      throw e;
    });
  }
```

- **Rule**: Separate services/computation (side effects) from state management 

- Example will use ngrx.
- There are 2 important parts of ngrx:
  - Store: 
    - uses reducers    
    - only manages state
    - actions are dispatched, which trigger reducers, which updates the state
  - Effects classes
    - Listen to the same actions as the store and perform side effects
      - IE computation, talking to server, whatever
- Immutability:
  - Since the model is shared, it is much simpler to keep it immutable
  - For your local UI state, it doesn't have to be immutable because it is local- not shared

- Updated Code:

```(typescript)

export function reducer(store:Store<any>) {
  return (state: State, action: Action) => {
    switch (action.type) {
      // ... other actions here

      case 'RATE':
        store.dispatch({type: 'SUBMIT_RATE', payload: action.payload});
        const talkToRate = state.talks[action.payload.talkId];
        const ratedTalk = {...talkToRate, yourRating: action.payload.rating};
        const updatedTalks = { ...state.talks, [action.payload.talkId]: ratedTalk};
        return { ...state, talks: updatedTalks};

      case 'UNRATE':
        const talkToUnrate = state.talks[action.payload.talkId];
        const unratedTalk = { ... talkToUnrate, yourRating: null};
        const updatedTalksAfterUnrating = { ...state.talks, [action.payload.talkId]: unratedTalk };
        return { ...state, talks: updatedTalksAfterUnrating};

      default:
        return state;
    }
  }
}

class Effects {
  constructor(private actions$: Actions, private backend: Backend) {}

  //filter submit_rate actions
  //if succeed, do nothing
  //if fail return observable of unrate - essentially dispatching a rollback operation
  //switchmap: only handle the latest response.  if there is an out of order response the earliest request's
  //response will be ignored.  this is only possible because you have a single observable of all rate actions.
  //(ie the dispatched action/effect 'submit_rate')
  @Effect() this.actions$.ofType('SUBMIT_RATE').
    switchMap(a => { 
      return this.backend.rateTalk(a.payload.talkId, a.payload.rating).
        catch(() => Observable.of({ type: 'UNRATE', payload: a.payload }))
    });
}

```

- persistent and client state should be immutable
  - bc its shared 
  - also this is good for observable, onpush, etc.
- actions$ of type Actions is an observable that sees every single action that goes through the store
- best practice: optimistic updates require separate actions to deal with errors
- results from this code update:
  - state mgmt and side effects are separated
  - clear sync strategy of the persistent state and the server
  - UNDO strategy
  - No race conditions

## Sync'ing URL and Client State

- Issues: 
  - There are 2 ways to update teh cache 
    1. Click on a button -> event handler
    2. Changing the route manually
  - **Solution**: always the router as the source of truth

```(typescript)
@Component({
  //usual descriptors like selector, etc.
})
export class TalksAndFiltersCmp {
  constructor(public backend : Backend, private router: Router, route:ActivatedRoute) {
    route.params.subscribe((p:any) => {
      //when the URL changes, update the backend
      this.backend.fetch(paramsToFilters(p));
    });
  }

  handleFiltersChange(filters: any): void {
    this.router.navigate(["/talks"], filtersToParams(filters));    
  }
}
```

- **Still a problem though...**
  - But what if there are other ways of changing the list of talks that are showing?
  - The component should not be dumber by uncoupling it to backend.
  - Ideal control flow is:
    - Component calls navigate on route
    - router updates location
    - store/effects is notified
    - store updates state
    - component gets new state

```(typescript)
@Component({
  //usual descriptors like selector, etc.
})
export class TalksAndFiltersCmp {
  talks: Observable<Talk[]>;

  constructor(private router: Router, private store: Store<any>) {
    this.talks = store.select('talks');
  }

  handleFiltersChange(filters: any): void {
    this.router.navigate(["/talks"], filtersToParams(filters));    
  }
}

class Effects {
  constructor(private actions$: Actions, private backend: Backend) {}

  @Effect() this.actions$.typeOf('UPDATE_LOCATION').
    switchMap(path => this.backend.fetch(paramsToFilters(path))).
    map(talks => {type: 'UPDATE_TALKS', talks}));
}

export function reducer(store:Store<any>) {
  return (state: State, action: Action) => {
    switch(action.type) {
      //...
      case 'UPDATE_TALKS':
        return { ...state, talks: action.payload };
      default:
        return state;
    }
  }
}
```

- ngrx has a integration with angular router such that anytime the route changes, it dispatches an UPDATE_LOCATION action
- results from code update:
  - Update via UI or location is same
  - Component dispatch actions and react to state changes
  - no race conditions

## Other stylistic observations
- usage of const regularly on objects
- destructuring in objects as an alternative to object.assign
- I should look into immutable.js to see if it really makes immutable code look nicer (cause it ugly)
- he uses optimistic updating, but there's no provision for rolling back to a previous version... should think about that in future.

    


    
  