# Jest Testing

- async testing:

  - if you're testing a callback from an async function (e.g. `fetchData()`), but a `done()` in the callback

  ```(javascript)
    test('the data is peanut butter', done => {
    function callback(data) {
      expect(data).toBe('peanut butter');
      done();
    }

    fetchData(callback);
  });
  ```

  - more examples of async testing

  ```(javascript)

  test('the data is peanut butter', () => {
    return fetchData().then(data => {  //IMPORTANT: return the func!
      expect(data).toBe('peanut butter');
    });
  });

  /* ------------------- */
  // promise
  test('the data is peanut butter', () => {
    return fetchData().then(data => {
      expect(data).toBe('peanut butter');
    });
  });

  /* ------------------- */
  // catching errors
  test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchData().catch(e => expect(e).toMatch('error'));
  });

  /* ------------------- */
  // resolve or reject'ing the promise
  test('the data is peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
  });

  /* ------------------- */
  // await
  test('the data is peanut butter', async () => {
    const data = await fetchData();
    expect(data).toBe('peanut butter');
  });

  /* ------------------- */
  // await w errors
  test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
      await fetchData();
    } catch (e) {
      expect(e).toMatch('error');
    }
  })
  ```

- `test.only()` - add the only when you want to only execute that one test (for diagnostics upon a failure)
- `beforeEach()` and `afterEach()` can be applied to test or describe level
  - same rules for async'ing these setup methods apply
- `beforeAll()` and `afterAll()` are for one-time setup/teardown

## mocking functions

```(javascript)
/* ---mocking a function and inspecting the params and return values--- */
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}

const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);

// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

// The first argument of the second call to the function was 1
expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
expect(mockCallback.mock.results[0].value).toBe(42);

/* -- also inject specific return values */

const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock
  .mockReturnValueOnce(10)
  .mockReturnValueOnce('x')
  .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

- example mocking a module

```(javascript)
// normal file
// users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;

// test file
// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```

- mock implementation example

## manual mocks
