Web API Notes
=============

- Misc AspNet Core 2 Notes on Web API

## HTTP Concepts
- Application layer protocol
  - Details are relevant for application developer, unlike other lower-level protocols
### Request
- Structure
  - Request Line: Verb  URI  Version
    - `GET /home.html HTTP/1.1`
  - Headers:
    - name, value pairs: `name:value, name:value`    
  - Blank Line
  - Body
- URI / Route structure
  - parameters can be included in:
    - path: required fields
      - `/api/homes/{id}`
    - query string: 
      - optional fields
      - values which include characters not allowed in path
      - non-unique values which could return the same content
      - `/api/homes/search/?q={searchTerm}`
    - Headers:
      - There are tons- here are a few
      - `Accept`: Tells the server the prefered media type(s) of the response.
      - `Accept-Encoding`: TODO
      - `Connection`: TODO
      - `Cache-Control`: TODO
      - `User-Agent`: TODO

### Response 
- Structure
  - Response Line: Version StatusCode StatusTxt
    - `HTTP/1.x 200 OK`
  - Headers:
    - name, value pairs
    - Describes the content of the body
  - blank line
  - Body
    - Huge range of types available for the body:
      - json
      - xml
      - images 
      - videos
      - pdfs
      - text/tml
- Status Codes
  - Summary
    - 2xx: ok
    - 3xx: redirect
    - 4xx: client error
    - 5xx: server error
  - Common
    - 200: ok
    - 201: created
    - 204: no content (like when you delete)    
    - 400:  bad request
    - 401: unauthorized (authentication is missing or bad)
    - 403: forbidden (authentication is ok, but unauthorized)
    - 404: not found
    - 409: conflict
    - 500: server error
- Headers
  - There are tons- here are a few:
    - `Content-Type`: tells the client the content (MIME) type of returned content.
      - many browsers do *content sniffing* which attempts to deduce the MIME type based on the byte stream of the content.
      - this is should be unnecessary if the `Content-Type` header is set (properly).
    - `Content-Encoding`: Expresses the way in which the content was compressed (so that the browser can decompress properly)
    - `Set-Cookie`: specifies cookie(s) to add to the browser
- Content Negotiation
  - Some response attributes can be determined through a negotiation process wherein the request specifies a preference, and the server may (or may not) choose to act on this preference.
  - Applies to:
    - Content-Type: Client may prefer xml over json, for example
    - Language: Client may prefer English over Spanish, for example
    - Encoding: Client may prefer a particular compression algorithm, for example
- Custom Content Types
  - [interesting discussion](https://stackoverflow.com/questions/13292313/is-using-custom-json-content-types-a-good-idea)
  - many web applications provide a content type of `application/json`.  
  - sometimes, when you have a particular *type* of data modelled with the json responses, you might want to define a custom content type such as `application/myspecialtype+json`.
  - if you support multiple versions of your api, you can encode the version of the custom content type to inform clients
    - alternately, the clients could point at a particular version path. 
### Verbs
- Background
  - There are a variety of HTTP Verbs (aka Methods), but these are the most common for a Web API scenario...
  - The particular way in which these verbs correspond to CRUD operations depends on how you set up your API.  (see details below)
  - The particular status codes you return in your responses also depend on how you set up your API.
  - [src](https://stackoverflow.com/questions/6203231/which-http-methods-match-up-to-which-crud-methods)
  - [src](http://restcookbook.com/HTTP%20Methods/put-vs-post/)
- **GET**
  - Use cases:
    - Access a URI without altering it
    - CRUD: Read
  - Appropriate response:
    - TODO
- **POST**
  - Use cases:
    - Creating a record without knowing what the resulting URI will be
    - If you create a new record which is exposed by an ID determined by back-end logic (e.g. `/api/menuItems/{id}`)    
    - CRUD: Create
  - Appropriate response:
    - TODO
      - usually has Location header?
- **PUT**
  - Use cases:
    - You're creating a record such that you know the URI it will be exposed by
    - You're moving a record to a new known location
    - You're updating a record completely
    - CRUD: Create/* or Update/*   
  - Appropriate response:
    - TODO
- **DELETE**=remove a resource
  - Use cases:
    - You're deleting a record
    - CRUD: Delete
  - Appropriate response:
    - TODO
- **PATCH**
  - Use cases:
    - You're partially updating a resouce (i.e. only some fields)
    - CRUD: Update
  - Appropriate response:
    - TODO
- Idempotent and Safe Methods
  - [src](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
  - [src](https://codeahoy.com/2016/06/30/idempotent-and-safe-http-methods-why-do-they-matter/)
  - Executing the same request multiple times will not change the result
  - GET, HEAD, PUT, DELETE are idempotent
  - POST is non-idempotent
  - Safe methods are those which do not change the state of the server resouce (e.g. GET)
  - Why these concepts matter:
    - It's a guarantee from the server about the logical structure of the API / service
    - Clients and intermediaries can use this information to optimize their interactions with the service

### Json Patch Document
- Body of a Patch (partial update)
  - there is a standard: Json Patch RFC 6902
  - describes the sequence of operations
  - request body looks like:

  ```(javascript)
  [
    {
      "op": "replace",
      "path": "/name",
      "value": "new name"
    },
    {
      "op": "replace",
      "path": "/name",
      "value": "new name"
    }
  ]
  ```

  - its a list of operations for each field
    - [info](http://jsonpatch.com/)
    - [analysis](https://philsturgeon.uk/api/2016/05/03/put-vs-patch-vs-json-patch/)
  - beside resulting in lower payload (sometimes), this can avoid writing back data which has become stale on the client, but not explicitly changed



## Asp.Net Core Web API
  - About
    - Release info
    - Deployments
    - Changes in v2?    
  - Design
    - Main
    - Middleware
    - Misc
  - Request
    - Verb and Route Support    
    - Model Binding    
      - Input Formatting
        - Consumes attributes 
        - Parameter attributes (fromBody, etc)    
  - Response
    - IActionResults
      - IActionResult - Verb mapping
    - Output Formatting
      - Content Type negotiation
      - Produces attribute
    - Validation    
    - Patch
  - Extensions
    - Swagger / Swashbuckle



https://www.youtube.com/watch?v=aIkpVzqLuhA

HTTP Refresher


- Handling HTTP requests
  - kestrel listens for http requests
  - middleware pipeline is invoked for each request
  - mvc routes requests to a controller and action
  - responses flow back down the middleware pipeline
- webapi controllers derive from ControllerBase
  - for MVC, you derive from Controller, which has a bunch more stuff
  - ControllerBase is more streamlined and ideal for webapi
- if you start with an empty project, here's what you do:
  - in ConfigureServices
    - AddMvc()    
  - in COnfigure
    - UseMvc()
  - put all your controllers in a folder (a preference)
- action methods will be decorated with the verb and the action parameters will be decorated with where in the request that data comes from
- TODO: how do verb semantics match with sql ideas
- routing is done with attributes
  - you can also specify multiple verbs to work with an action method - use AcceptverbsAttribute
  - route attributes can go on the controller and the action methods
    - the class will be prepended
  - route templates
    - capture values: api/orders/{id}
    - route tokens: api/[controller]
      - you can use *controller*, *action*, *areaname*
    - optional: {id?}
    - default: {id=latest}
    - constraints: {id:int}
- model binding
  - httpcontext gives you access to everything, but mvc gives you features that can make it strongly typed (ie model binding + validation)
  - there are some precedence rules for model binding sources (ie route vs query string... usually route takes precedence)
  - you can assign validation properties on model classes
  - validation failures should return 4** error codes .  maybe bad request.
- Action Results
  - IActionResult or Task<IActionResult>
    - always return these because you might return different helper methods eg BadReqest, OK, etc
  - Ok() : 200
    - you can use Ok() to return Json      
  - BadRequest(ModelState) : 4xx
  - CreatedAtAction("Get", new {id = valud.Id}, value)
    - this return value is the action and values that would be used to create a new link to the resource
    - "get" is the name of the method, id is the route or other action parameter, and value is the full model (just for further info)
    - routing tables will pull this info and create the appropriate link
  - Content("hello") : returns text
  - Json(object) : return as Json    
  - NoContent() : HTTP 204 - when there's no response but everything is ok.  not sure about the difference between Ok()
    - see notes here:
      https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete

  - Action methods should just return IActionResult
  
  - handling the json patch document on the BE

  ```(csharp)
  [HttpPatch("{cityId}/pointsofinterest/{id})]
  public IActionResult PartiallyUpdatePointOfInterest(int cityId, int id,
    [FromBody] JsonPatchDocument<PointOfInterestForUpdateDto> patchDoc)
  { 
    if (patchDoc == null)
      return BadRequest();
    
    var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
    if (city == null)
      return NotFound();

    var poitnOfInterestFromStore = city.PointsOfInterest.FirstOrDefault(c => c.Id == id);
    if (pointsOfInterestFromStore == null)
      return NotFound();

    //map dtos
    var pointOfInterstToPatch =
      new PointOfInterestForUpdateDto()
      {
        Name = pointOfInterestFromStore.Name,
        Description = pointOfInterestFromStore.Description
      };

    //apply changes
    patchDoc.ApplyTo(pointOfInterestToPatch, ModelState);

    if (!ModelState.IsValid)
      return BadRequest(ModelState);

    pointOfInterestFromStore.Name = pointOfInterestToPatch.Name;
    pointOfInterestFromStore.Description = pointOfInterestToPatch.Description;

    return NoContent();

  }
  ```

- Validation
  - Check modelstate and return BadRequest(ModelState) if necessary
    - this will return info about the validation issue
  - also see TryValidateModel()

- Formatting
  - usually use json
  - but there are tons of formats you can use - just specify in content-type header
  - input formatters: handle request body formats
    - you need to use [FromBody] is you want them to work
  - output formatters: 
    - uses content negotiation: the return content-type is actually requested by the client
      - request format is specifed with the on accept header
      - this is very useful for a public API
    - you can constrain the formats using Produces and Consumes attributes

      ```(csharp)
      [Produces("application/json, Type=typeof(MyModel))]      
      ```

      - So this response will only by json

      ```(csharp)
      [Consumes("application/json")]
      ```
      - the request only consumes requests where the content type is `application/json`

     - you can also do this in the ConfigureServices.  this will allow your API to also return Xml, if spec'ed by the client in the Accept header

    ```(csharp)
    services.AddMvc()
            .AddMvcOptions(o => o.OuytputFormatters.Add(
              new XmlDataContractSerializerOutputFormatter()
            ));
    ``` 
    - one reason for using a special content type is versioning... see [here](https://stackoverflow.com/questions/13292313/is-using-custom-json-content-types-a-good-idea)
  - media type and content type are basically the same, but the header is called content type
  - AddMvc(options => {...}) lets you specify input/output formatters, and there are also extension methods
    - example: in ConfigureServices(), the following will keep the same casing rules for Json as the C# model classes (bc default is to camelCase them)

    ```(csharp)
    services.AddMvc().AddJsonOptions(o=> {
      if (o.SerializerSettings.ContractResolver != null)
      {
        var castedResolver = o.SerializerSettings.ContractResolver as DefaultContractResolver;
        castedResolver.NamingStrategy = null; 
      }
    })
    ```


https://app.pluralsight.com/library/courses/asp-dotnet-core-api-building-first/table-of-contents
- no longer using System.Web
  - much more granular, based on NuGet packages
- can run on full .NEt framework or .Net Core
- .Net core
  - modular version of .net frameowkr
  - susbset of main frainwork
  - portable
  - uses .NET standard
 - LTS (Long term support) releases vs Current releases
- Main() creates the WebHostBuilder
- ContentRoot is base path to any content used by the application including views and web content
  - by default: application base path for executable
    - this might vary for different platform builds
  - it is not the same as the webroot (wwwroot)
- You don't remove BuildWebHost() - can lead to errors when using EF Core Migrations
- Startup class
  - called the Entry Point
  - ConfigureServices
    - used for DI
  - Configure
    - set up you middleware
  - ever wonder why Startup doesn't implement an Interface?
    - because ConfigureServices sets up DI and runs before Configure which sets up the middleware
    - Configure should be DI'ed with the specified services, but there's no way to add all those arbitrary service parameters into a single signature
- Middleware order matters
  - each step in middleware decides whether to pass request on for further middleware
  - authentication fail, will not pass it farther in the pipeline for processing
- WebAPI uses the MVC middleware
  - middleware: Use*()
  - DI: Add*()
- Core 2 adds: 
  - Metapackage:
    - Microsoft.AspNetCore.All metapackage
    - referenced by default for new AspNet Core 2.0 applications 
    - includes all asp.net core, EF core, and some key 3rd party packages
  - runtime Store
    - runtime store is a location on disk containing these packages
    - like the gac
    - must be set up when you install .netcore 2
    - depends on whether you want the self-contained or framework dependent deployments
- convention based vs attribute based routing
  - convention-based refers to the routing table you build
  - attribute routing is using attributes
    - this is the recommended approach for web api's
- Domain Model or DTO objects can have fields which, for reasons of Normalization, etc aren't in the Data Model
  - Calculated fields
  - Concatenate fields
  - etc.
- returning status codes
  
  - app.UseStatusCodePages()
    - shows you the status code in the response payload (not just in the header)    


## Resource Manipulation 
- Extra validation: call ModelState.AddModelError("FieldName", "Your Custom Validation Msg") when you spot a validation fail
  - This lets you keep using ModelState for all validation concerns - not just what is conveniently attribute based

https://www.youtube.com/watch?v=e2qZvabmSvo
- swagger is the way to go for testing out your api - start at 21.23
  - swagger is just a metadata format for describing apis
  - swashbuckle is the nuget package with which you can add swagger and it adds a nice testable front-end
- in ConfigureServices()
  - services.AddSwaggerGen()
- in Configure()
  - app.UseSwaggerGen()
  - app.UseSwaggerUi()
- wonder if you can make swagger hidden or change theming
- it also lets you explore the returned model classes

