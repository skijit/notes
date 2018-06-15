
- Securing
  - Simplest scenario: you need to be a logged in user.
    - just apply `[Authorize]` attribute to your controller.  Has to have a legit principal.
  - we need logic to validate oauth2 tokens
    - pass in the token in the authorization header
    - authentication scheme: bearer
  - there's middleware for handling jwt which is a standard format for handling tokens
  - install Microsoft.AspNetCore.Authentication.JwtBearer nuget package

  ```(csharp)
  //in Configure()
  app.UseJwtBearerAuthentication();
  app.UseMvc
  ```
  
  - you have to decide what authority or token source you might use?  depends on scenario.
    - if internal: there's probably a directory service that provides tokens for apps that have been registered with it
    - if public facing: azure options, and other 3rd party options
  
https://www.youtube.com/watch?v=z2iCddrJRY8
- security in aspnet core 2.0
- Authentication and authorization
  - modular authentication
    - simple scenarios, to social providers, to oauth
    - will follow similar process
  
  - example: set up simle cookie-based authentication
  
  ```(csharp)
  //in ConfigureServices()
  //this example will use cookie authentication, but the same principle applies if you're using
  //fb, google, email/pwd, other federated, or some other authentication scheme

  services.AddMvc();
  //adds generic authentication services but doesn't turn them on yet
  services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
          //adds the cookie authentication "scheme" as default
          .AddCookie()      
  ```

  ```(csharp)
  //now we add the authentication to the middleware in Configure()
  //remember order is sensitive
  //we put this right before the UseMvc() step.
  App.UseAuthentication();

  App.UseMvc(routes => {
    //...
  });
  ```

  ```(csharp)
  //now we have a login action

  [HttpPost]
  public async Task<IActionResult> Login(string name)
  {
    //CookieAuthenticationDefaults.AuthenticationScheme is just a string for "Cookie"

    if (string.IsNullOrEmpty(name))
      return RedirectToAction(nameof(Index));
    
    //build up an object about the users information that aspnet core
    //understands.  this is called a ClaimsIdentity.  You represent the 
    //users identity in claims (key/value pairs).  In this case there is
    //just a single kv pair - the name.  And you associate this with the 
    //authentication scheme.
    var identity = new ClaimsIdentity(  new[] { new Claim(ClaimTypes.Name, name) }, 
                                        CookieAuthenticationDefaults.AuthenticationScheme);

    //then you wrap the claims idenity in the ClaimsPrinicple, which represents the user
    var principal = new ClaimsPrincipal(identity);

    //then i can log the user into asp.net - its a generic method
    await HttpContect.SignInAsync(
      CookieAuthenticationDefaults.AuthenticationScheme,
      principal);
    );

    return RedirectToAction(nameof(Index));

    //after this, you can see the user is logged in with User.Identity.IsAuthenticated
  }
  ```

  - how it works with the cookie
    - there's a cookie called aspnetcore.cookies which includes (among other things) the user identity we just created 
    - the middleware was injecting that into the browser for us

  ```(csharp)
  [HttpPost]
  public async Task<IActionResult> Logout()
  {
    await HttpContext.SignOutAsync(CookieAuthenticationDefault.AuthenticationScheme);
    return RedirectToAction(nameof(Index));
  }
  ```

- Authorization
  - various paradigms available
    - could be claims based (based on their properties)
    - role based
    - resource based
  - generic authorization system in asp.net core can model all these things

  - example: an admin page

  ```(csharp)
  [Authorize]
  public IActionResult Manage() => View();  
  ```

  - in this version, it's only checking whether you are logged in

  - we have to update ConfigureServices
  
  ```(csharp)
    services.AddMvc();   
    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)            
            .AddCookie(options =>
            {
                options.AccessDeniedPath = "/Home/ErrorForbidden"; //redirect if you fail [Authorize] check in
                options.LoginPath = "/Home/ErrorNotLoggedIn"; //redirect if you're not logged in
            });            
  ```

  - example: authorization policy
  
  ```(csharp)
  [Authorize(Policy = "MustBeAdmin")]
  public IActionResult Manage() => View();    
  ```

  - Now in the startup class, you need to create that policy...

  ```(csharp)
    services.AddMvc();   
    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)            
            .AddCookie(options =>
            {
                options.AccessDeniedPath = "/Home/ErrorForbidden"; //redirect if you fail [Authorize] check in
                options.LoginPath = "/Home/ErrorNotLoggedIn"; //redirect if you're not logged in
            });  
    services.AddAuthorization(options =>
    {
      //you add the policy, and the 2nd parm gives you access to policy builder api
      options.AddPolicy("MustBeAdmin", p => p.RequireAuthenticatedUser().RequireRole("admin"));
    });   
  ```

  - You can also build your own custom authorization methods that plug into this builder since these are pretty basic

  ```(csharp)
  //add the admin role
  [HttpPost]
  public async Task<IActionResult> Login(string name)
  {
    //CookieAuthenticationDefaults.AuthenticationScheme is just a string for "Cookie"

    if (string.IsNullOrEmpty(name))
      return RedirectToAction(nameof(Index));
    
    var identity = new ClaimsIdentity(  new[] 
                                        { 
                                          new Claim(ClaimTypes.Name, name),
                                          new Claim(ClaimTypes.Role, "admin")
                                        }, 
                                        CookieAuthenticationDefaults.AuthenticationScheme);

    var principal = new ClaimsPrincipal(identity);

    await HttpContect.SignInAsync(
      CookieAuthenticationDefaults.AuthenticationScheme,
      principal);
    );

    return RedirectToAction(nameof(Index));

  }
  ```

- Asp.net Core Identity
  - Modular *Membership* system  
    - handles a lot of the usual *membership* requirements:
      - login
      - registration
      - password reset
      - etc.
  - a set of otb classes and prebuilt code that sits on top of the auth functionality just observed
  - a lot of the various project templates for authorization use the membership system
    - these usually add a bunch of controller code
  
- Hardening asp.net core
  - Antiforgery (CSRF Prevention) (Cross-site request forgery)
    - CSRF: spoofing a form, hosting it on a different site, and then posting to the original endpoint with malicious data/intent
    - By default, aspnet core injects an antiforgery token into the form
      - Then in your code, you need to validate this token by adding `[ValidateAntiForgeryToken]` attribute on the action method
      - You could also apply it in the ConfigureServices() line and have it work across all action methods...

    ```(csharp)
    services.AddMvc(options => {
      options.Filters.Add(new AutoValidateAntiForgeryTokenAttribute());
    })
    ```

  - HTTPS
    - it's no longer expensive and difficult
    - use LetsEncrypt service to get ssl certificates for free
    - project properties: select 'enable SSl'
    - You can redirect to https from http in the ConfigureServices....

    ```(csharp)
    services.AddMvc(options => {
      options.Filters.Add(new AutoValidateAntiForgeryTokenAttribute());
      options.Filters.Add(new RequireHttpsAttribute());
    })
    ```

  - Security Headers
    - Modern browsers have a lot of optional security features which can be turned on by using specific headers in the HTTP responses
    - try using securityheaders.io
      - check out the ngrok tool to expose a tunnel for internal apps
    - NuGet package NWebSec.AspNetCore.Middleware lets you add security headers easily


