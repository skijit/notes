Securing an API
=================

- good sources:
  - (d) [pony foo - jwt web tokens vs session cookies](https://ponyfoo.com/articles/json-web-tokens-vs-session-cookies)
  - (d) [log rocket blog 1](https://blog.logrocket.com/how-to-secure-a-rest-api-using-jwt-7efd83e71432/)
  - (d) [log rocket blog 2](https://logrocket.com/blog/jwt-authentication-best-practices/)
  - [storing jwts in cookies vs web storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
  - [jwt design points](https://stormpath.com/blog/jwt-the-right-way/)
  - [why and when to choose api keys](https://cloud.google.com/endpoints/docs/openapi/when-why-api-key)
  - [jwt.io](https://jwt.io/)
  - [this is interesting too- about oauth](https://medium.com/@ashokyogi5/a-beginners-guide-to-google-oauth-and-google-apis-450f36389184)

- todo
  - Methods of authentication in graphql
  - Cookies, etc
  - How commercial API's work with their API keys, etc.

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

## Cookies
- Generally, the same origin policy prevents sites from reading other sites cookies
- Ads work usually by the federation of individual sites' cookie data in an ad network
- Third party cookies involve cookies which are set by requests (e.g. images, iframes, scripts, etc.) to a different domain than the main document

## Big themes
- Vs Cookie-based sessions
  - statelessness
    - statelessness is key with API's
  - Performance
    - Session based cookies might be quite smaller than JWT's, but they require a lookup
    - OTOH, the JWT conains all the information we need on the client side
      - This is not always the case - sometimes we'll still want to look up data whilst using JWT (e.g. blacklisting a user)
  - Multi-Hop Scenarios
    - If you have downstream calls that need to be made, cookie-based flow is difficult
    - JWT flows more nicely
      - However, presumably there would be another layer of decryption/signing

- Security
  - JWT's are signed by the claim provider (server) to prevent client tampering
  - Susceptiability to XSS when storing in web storage
    - Use of cookies instead
    - Cookies are susceptible to CSRF (typically session cookies)
      - How 
  - Techniques to avoid Replay Attacks
    - Browser fingerprinting (more info)
    - Issuing JWT's specific to the IP address (more info)
  - Usually stored in an HttpOnly cookie: a special kind of cookie that's only sent in HTTP requests to the server, and isn't usable from JavaScript
- How to persist JWT's
  - Cookies
    - Potential complications when CORs

## Token Structure
- Token is just an encoded string
- 3 sections divided by dots:
  `<Header>.<Payload>.<Signature>`
- First 2 sections: User-Data
- Last section: Verify authenticity of token
- Header
  - Information on the jwt schema (usually just jwt) and the algorithm the server uses to sign the token (usually HS256 or RS256) ([more info](https://stackoverflow.com/questions/39239051/rs256-vs-hs256-whats-the-difference))

  ```(json)
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```
- Payload
  - The actual data.  Can follow standard existing schema or put whatever you want in there.
  - Some standard fields include:
    - `Iss`: Issuer - user making the request
    - `Sub`: Subject (of the requst) - probably the url?
    - `Aud`: Audience 
    - `Exp`: Expiration date 
- Signature
  - Basically a hash or signature of the header and payload to verify the authenticity of the token and that it hasn't been tampered with

### Token Generation Scenario
- User provides a username/password to a website, successfully authenticating, and so the server generates a token:
  - Header

  ```(json)
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```

  - Payload

  ```(json)
  {
    "Iss": "fernando" //username
    "Exp": 1550946689, //expiration date
    "Admin": false //custom field indicating whether a user or not
  }
  ```

- Next two steps:
  1. Encode the sections
  2. Sign the resulting values

```(javascript)
const base64Encode = (str) => btoa(str);

let header = `{
  "alg": "HS256",
  "typ": "JWT"
}`;

let encodedHeader = base64Encode(header);
console.log(encodedHeader);
//"ewoiYWxnIjogIkhTMjU2IiwKInR5cCI6ICJKV1QiCn0K"

let payload = `{
  "Iss": "fernando" //username
  "Exp": 1550946689, //expiration date
  "Admin": false //custom field indicating whether a user or not
}`;

let encodedPayload = base64Encode(payload);
console.log(encodedPayload);
//"ewoiSXNzIjogImZlcm5hbmRvIiwKIkV4cCI6IDE1NTA5NDY2ODksCiJBZG1pbiI6IGZhbHNlCn0K"

const sign = (contents) => _H256(contents, "my secret key")

let signature = sign(`${encodedHeader}.${encodedPayload}');

let token = `${encodedHeader}.${encodedPayload}.${signature}`;
//BOOM ^ This is it!!
```

- [interesting discussion on the many uses of base64 encoding](https://stackoverflow.com/questions/201479/what-is-base-64-encoding-used-for)
- The client is able to decipher and act on the token contents
- there are a variety of signing algorithms out there.
  - In some a shared private key is known to the client and server (how is this secure?!)
  - Otherwise, probably some public/private key exchanges are necessary
    - If they're not using a shared private key, the client can probably decrypt the token with the server's public key
- **important point** note that most of the JWT is only encoded (probably to simplify the signing) - not encrypted.  
  - so even though the signature verifies the authenticity, other people can see the contents
  - that's why using HTTPS is super important!

## JWT's in Practice
- TODO: more info
- Services like google will allow you to register for an API
- They give you a secret token
- Then on the client side, you create a token (with one of many libraries), and sign it with your secret token
- Then you pass the token with your API request

## Security Review

### XSS
- Cross site scripting
- Malicious code is saved onto a website and then served alongside the other normal content
- The user has no way to segregate valid scripts from the legitimate since it's a trusted source
- The malicious code can overwrite the HTML, access cookie and web-storage

### CSRF
- The malicious code doesn't read the session cookie of the other side
- Instead it takes advantage of the fact that the existing session cookie means the user is already authenticated
- Then if you get a user to click on a link like the following, you might be able to successfully transact without the user knowing it

```(html)
<a href="http://bank.com/transfer.do?acct=MARIA&amount=100000">View my Pictures!</a>
```

- You could also do this POST's by having them post a form (see below)
- It's harder to get the a successful cross-site XHR request due to CORS

### Cross Domain Form Posting
- You can totally post a form to a different domain
- The same origin policy only applies to when you're using JavaScript to do this
- If you have static html posting to a different domain - that's fine.
- [src](https://stackoverflow.com/questions/11423682/cross-domain-form-posting)

### Replay Attacks
- TODO

## Misc Thoughts
- Does it make most sense to store user data in the JWT on the client (such as their role) or put in in an HTTP-cookie and just use API methods to deduce this information separately.
  - I'm thinking the latter.
- [google sign-in](https://github.com/GoogleChromeLabs/google-sign-in)
- [app sign-in: something completely different](https://developers.google.com/identity/sign-in/web/sign-in)

- general flow:
  - create a shared IsAuth() method which looks at the session cookie and:
    - verify untampered
    - unencrypt, if necessary
    - verify unexpired      
    - lookup user information to for authorization
  - index page server-side code looks for a session cookie
    - if session cookie exists:
      - if IsAuth() return normal page, else redirect to login      
    - if no session cookie exists
      - redirect to /login
  - /login page is static, has javascript
    - on successful login, assign credentials to a safe cookie (untamperable) and re-request index page
  - return api/graphql methods from same domain
    - use isAuth() (possibly in pipeline)
    
  