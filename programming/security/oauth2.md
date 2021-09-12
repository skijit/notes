OAuth2 Flows
=========================

- [This is a good reference](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)
- [Another example](https://www.youtube.com/watch?v=996OiexHze0)
- A possible better way to explain OAuth: in Reverse

## Historical Development
- Pre-2010
  - Simple websites -> "Forms Authentication"
    - Characteristics
      - Implemented by Website
      - Accepts Email / Password
      - Hashes Password
      - Look up User info
      - Look up authorization info
      - Return a session cookie to track the user
    - Downsides
      - Security is a moving target, so there's a lot to keep up with
      - Couple your site development with your auth solution, so they have to develop together (which may be inconvenient)
      - (OAuth and OIDC address both of these)
  - Single Sign-ON -> SAML
    - SAML is still useful, though somewhat tricky to develop around
    - SAML protocol is good when you have one master account (e.g. AD)
- Around 2010 there was a need for solutions for:
  - Mobile Apps
    - You want to stay logged in after you close the app
    - How do you maintain a session after you close  (we dont have cookies)
  - Delegated Authorization
    - This was where OAuth came from

## Use Case
- There's a need for web apps to share resources
  - E.G. a diagramming app may want to access your google drive account to read/write files
  - SOLUTION: API's: let the drawing app consume google drive's API
  - BUT THERE'S A PROBLEM: 
    - Google isn't going to expose an API to let just anybody call any operations on a user's account
    - API's need to have valid authorization:
      - For the website (more generally, the Application or the Client) making the API calls (e.g. to google drive)
      - That the user gives the permission for the application to make the API calls, accessing their account
- This was the primary use-case for OAuth
  - Delegated Authorization: 3rd party API's need a way to provide authorization information to securely integrate with applications

## Participants and Scope
- There are 3 key Participants in the OAuth flow, which is sometimes referred to as a "3-legged Exchange"
  - **The User**
    - In OAuth Jargon: "Resource Owner"
  - **The Application**
    - In OAuth Jargon: "Client"
  - **The 3rd Party Service**
    - In OAuth Jargon, this is usually divided into two terms, but usually these are controlled by the same organization and exposed together through a single service (though this is not necessary)
      - "Resource Server" - The API server
      - "Authorization Server" - The server that provides the authorization token
- 2 important observations regarding OAuth's limitations thus far:
  1. It doesn't serve permissions for the application (ie client)
    - The Delegated Authorization that the application gets are permissions regarding the *resources provided by that 3rd party*.
      - There's nothing in this use-case to suggest that the 3rd party provides authorization on *resources in the application*  (ie it's not a "permission server" for the application)
      - The actual form of the permission received by the third party is intended to be an `Opaque Token`: a token which is not readable by the recipient (the application) but rather by the issuer.  Therefore:
        - The application would not be able to read/decode it at all
        - The application would just forward it along with API calls to the 3rd party
      - In reality, it does happen that a non-opaque token is returned from the authorization service
      - In the OpenId Connect spec (more on this later), there's a place to add 'Claims', which is probably a better source for this information
      
  2. It doesn't address Authentication
    - Authentication has to happen before Authorization, of course
    - I guess the OAuth spec developers thought of authentication as more of an implementation detail to the authorization flow
    - Remember that the problem OAuth is trying to solve is how to call 3rd party APIs, not provide the application/client with authentication/authorization information
    - Therefore it would be OAuth-compliant for all auth information stored on the client to be in an Opaque Token
    - But in reality, different OAuth providers started serving various degrees of application-readable authentication information because the apps would at least want to know/display the user id, email, first name, etc.
      - Realizing this provider-specific variation was a problem, the OAuth spec developers came up with the OpenID Connect spec
      - More on this later, but the OpenID Connect spec is basically an additive spec: OAuth + Some "Open" (Application-Readable) User Information

## Other Jargon
- `Back Channel`
  - Network security terminology
  - Highly secure connection (e.g. server to server)
- `Front Channel`
  - Network security terminology
  - Less secure connection (e.g. anything from a browser)
  - Less trusted
- `Authorization Grant`
  - The token the proves the User has authorized the Application to access their account on the 3rd party system
- `Redirect URI`
  - Also called the 'callback'
  - This is where the 3rd party dumps the user at end of the successful auth flow
  - Will typically be a URI in the application's domain
- `Scope`
  - The third party has a list of permissions which make sense to it.  The client, when requests authorization, will enumerate the list of permissions (scopes) that it wants.
  - Scope examples: Read History, Read Files, Delete Files, etc.
- `Consent`
  - The view/step where a user is asked to consent to the application having the given permission (scopes) on the resource server
- `Access Token`
  - The token that gets sent with all 3rd party API calls, proving that the client is authorized to do so
  - The access token is limited to the scopes that have been consented to
  - Should only be exchanged on back channels
- `Client Id`
  - Not secure
  - Provided when you register your app with the OAuth provider
- `Client Secret`
  - Secure
  - Provided when you register your app with the OAuth provider
  - Only exchanged on back channels

## Standard Flow
- AKA "Authorization Code Flow" bc in the end we get an authorization code
- By caller:
- App: Connect to 3rd Party
  - Request Details:
    - Client ID 
    - Redirect URI
    - Response Type (e.g. `code`)
    - Scopes (e.g. `read_profile` or if Open ID connect, `openid`)
    - State (this is a simple text value that gets sent back at the end of the flow- additional security, I suppose)
- 3rd Party: Log in
- 3rd Party: Authorize App to connect to you 3rd Party Account
- 3rd Party: App Callback
  - Request Details:
    - Authorization Code
    - State
  - Back Channel Request
- App: Exchange Auth code for Access Token from Auth Server
  - Request Details
    - Authorization Code
    - App Secret
    - Client Id
    - Grant Type (e.g. `authorization_code` since that's the flow we're using here)
  - Back Channel Request
- App: Call 3rd Party API with Access Token
  - Back Channel Request
  - Token looks like this:
    - Access code
    - Type (usually `Bearer`)
    - Expiration
  - So this token will usually be encoded in an HTTP header: `Authorization: Bearer <code>`

## Other Flows
- Implicit Flow
  - Front channel only
  - Used for SPAs
  - You don't get a separate authorization code- you'll just get the access token
  - SImpler flow but less secure
  - Request is with Response Type: Token (instead of code)
- Resource Owner Password Credential
  - Back channel only
- Client Credentials
  - Back channel only
  - Machine-to-machine flows

## Open ID Connect
- Small extension on top of OAuth 2.0 to standardize authentication
- Adds:
  - User Id token 
  - UserInfo endpoint to get more info about the user
  - Standardizes set of scopes
- Flow changes:
  - Initial request adds the scope `openid`
  - You might also be able to ask for `id_token` as the request type
  - App gets an ID token (along with the Access Token) when callback is called
- Id Token
  - encoded as JWT
  - decoded contents:
    - header
    - claims
      - user id
      - email address
      - other user properties
      - when it expires
      - when they logged in
    - signature: validates it's authentic
- You get more info about the user by calling the UserInfo endpoint (call with your access token)
  - Might include full name, profile picture, etc.

## Example Flow Use Cases
- Web Application with BE server: authorization code flow
  - Backend will receive a token and auth code
  - Put a session cookie in the web app and then we can use that to retrieve this security info (so it never makes it into the browser)
- Native Mobile App: authorization code flow with PKCE
  - Same basic flow as above + PKCE (todo- more info)
  - Store tokens and grants in protected device storage
  - Google has library `app auth` which takes care of all these details
- SPA w BE service: Implicit Flow
  - Token storage is complicated
- Microservices and APIs: client credentials flow





