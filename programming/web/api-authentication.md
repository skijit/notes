Securing an API
=================

- good sources:
  - [pony foo - jwt web tokens vs session cookies](https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies)
  - [log rocket blog 1](https://blog.logrocket.com/how-to-secure-a-rest-api-using-jwt-7efd83e71432/)
  - [log rocket blog 2](https://logrocket.com/blog/jwt-authentication-best-practices/)
  - [storing jwts in cookies vs web storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
  - [jwt design points](https://stormpath.com/blog/jwt-the-right-way/)

- todo
  - Methods of authentication in graphql
  - Cookies, etc

## Web Storage Review
- Prior to web storage, app data had to be stored in cookies and sent with each request
- You can store more data (5MB) than in cookies (4KB)
- Organized by origin (domain and protocol)
- Data is not sent to the server
- One common distinction is that cookies are more pertinent to sending to server, wherease web storage is used by the client

- Types
  - Local Storage
    - no expiration

    ```(javascript)
    // Store
    localStorage.setItem("lastname", "Smith");

    // Retrieve
    document.getElementById("result").innerHTML = localStorage.getItem("lastname");
    ```

  - Session Storage
    - expires when brower tab is closed


