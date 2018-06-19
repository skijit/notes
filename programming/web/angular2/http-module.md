Angular HTTP Module
============================

- Based on Observables
- Basic Get:

```(typescript)
/** GET heroes from the server */
getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
}
```

- This returns an Observable, so you can always subscribe for changes.
- remember to add the $ at the end of the observable

```(typescript)
getHeroes (): Observable<Hero[]> {
  return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(heroes => this.log(`fetched heroes`)),
      catchError(this.handleError('getHeroes', []))
    );
}
}
```
- unpacking this code example:
  - `pipe()`: this is an rxjs function where you build your pipeline for each observable value.
    - form: `pipe(operator1, operator2, ...)`
    - you can [build your own pipelines](https://blog.hackages.io/rxjs-5-5-piping-all-the-things-9d469d1b3f44) like...

    ```(typescript)
      return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(myCustomFilters);
    ```

    - [authoritative source](https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md)

  - `catchError()`: catches any errors (so they don't propagate any further), and returns an observable so that subscribers aren't messed up.
    - [other examples](https://www.learnrxjs.io/operators/error_handling/catch.html)
  - `tap()`: tap is where you perform side effects, like logging

- here's what handleError() looks like...

```(typescript)
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
```

- you typically want a service exposing all of your api calls and returning the observables to the smart components


- Questions/Thoughts: 
  - server wrapper return value
  - use puts instead of patches
  - a generic api return val wrapper is fine, but make sure you can still return non-200 without throwing/rejecting
  - look into deserialization to type... is it new'ing up the object or is it just static (interface-based) typing?
  - review state management notes from ngrx 
  - decide on a freshness check paradigm
  - error handling - pipe?