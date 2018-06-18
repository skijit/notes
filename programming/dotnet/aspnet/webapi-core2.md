Web API Notes
=============

- Misc AspNet Core 2 Notes on Web API
- [2.1 Update Notes / Synopsis](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-2.1)
- [AspNetCore WebAPI video](https://www.youtube.com/watch?v=aIkpVzqLuhA)
- [Another decent Tutorial](https://www.youtube.com/watch?v=e2qZvabmSvo)
- [Http methods](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
- [PluralSight Class](https://app.pluralsight.com/library/courses/asp-dotnet-core-api-building-first/table-of-contents)

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
      - There are tons- here are a few:
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
  - Blank Line
  - Body
    - Can be anything.  Content types include:    
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
  - [src1](https://stackoverflow.com/questions/6203231/which-http-methods-match-up-to-which-crud-methods)
  - [src2](http://restcookbook.com/HTTP%20Methods/put-vs-post/)
- **GET**
  - Use cases:
    - Access a URI without altering it
    - CRUD: Read
  - Appropriate response:
    - 200 : Ok
- **POST**
  - Use cases:
    - Creating a record without knowing what the resulting URI will be
    - If you create a new record which is exposed by an ID determined by back-end logic (e.g. `/api/menuItems/{id}`)    
    - CRUD: Create
  - Appropriate response:
    - If the resulting data is reachable via a URI:
      - 201 : Created + set the Location Header
    - If the resulting data is **NOT** reachable via a URI:
      - 200 : Ok
      - 204 : No Content
- **PUT**
  - Use cases:
    - You're creating a record such that you know the URI it will be exposed by
    - You're moving a record to a new known location
    - You're updating a record completely
    - CRUD: Create/* or Update/*   
  - Appropriate response:
    - 200 : Ok
    - 204 : No Content
- **DELETE**=remove a resource
  - Use cases:
    - You're deleting a record
    - CRUD: Delete
  - Appropriate response:
    - 200 : Ok
    - 204 : No Content
    - 202 : Accepted 
      - use 202 if you're marking the resource for deletion but perhaps haven't acted on it yet
- **PATCH**
  - Use cases:
    - You're partially updating a resouce (i.e. only some fields)
    - CRUD: Update
  - Appropriate response:
    - 200 : Ok
    - 204 : No Content
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

### About
- no longer using System.Web
  - much more granular, based on NuGet packages
- can run on full .NET FX or .Net Core
- .Net core
  - modular version of .NETFX
  - susbset of main FX
  - portable
  - uses .NET standard
- Has LTS (Long term support) releases vs Current releases
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

### Static Design
- **Main()**
  - Main() creates the WebHostBuilder
  - Sets `ContentRoot`:
    - ContentRoot is base path to any content used by the application including views and web content
    - by default: application base path for executable
      - this might vary for different platform builds
    - it is not the same as the webroot (wwwroot)
  - Don't remove `BuildWebHost()` - can lead to errors when using EF Core Migrations
- **ConfigureServices()**
  - Sets up DI
  - Remember to : `AddMvc()`   
- **Configure()**
  - set up you middleware
  - Middleware order matters
    - each step in middleware decides whether to pass request on for further middleware
    - ex: authentication fail, will not pass it farther in the pipeline for processing
  - Remember to: `UseMvc()`
  - ever wonder why Startup doesn't implement an Interface?
    - because ConfigureServices sets up DI and runs before Configure which sets up the middleware
    - Configure should be DI'ed with the specified services, but there's no way to add all those arbitrary service parameters into a single signature  
  - use `app.UseStatusCodePages()`
    - shows you the status code in the response payload (not just in the header)    

- **Controllers**
  - webapi controllers derive from `ControllerBase`
  - for MVC, you derive from `Controller`, which has a bunch more stuff
  - `ControllerBase` is more streamlined and ideal for webapi
  - usual convention / pref is to put all your controllers in one folder

### Runtime Design
  - kestrel listens for http requests
  - middleware pipeline is invoked for each request
  - mvc routes requests to a controller and action
  - responses flow back down the middleware pipeline

### Request

#### Verb and Route Support
- Usually based on attributes in the Action Method 
  - With MVC, you might use convention-based routing (with routing table), but with WebAPI, the preferred method is attribute-based routing.
- Routing
  - Also possible to specify multiple verbs to work with an action method - use `AcceptverbsAttribute`
  - route attributes can go on the controller and the action methods
    - the route will be prepended 
  - route templates
    - capture values: `api/orders/{id}`
    - route tokens: `api/[controller]`
      - you can use *controller*, *action*, *areaname*
    - optional: `{id?}`
    - default: `{id=latest}`
    - constraints: `{id:int}`

#### Model Binding
- General
  - `HttpContext` gives you access to everything, but MVC gives you features that can make it strongly typed (ie model binding + validation)
  - there are some precedence rules for model binding sources (ie route vs query string... usually route takes precedence)  
- Input Formatting
  - **Consumes** attributes 

  ```(csharp)
  [Consumes("application/json")]
  ```
    - the request only consumes requests where the content type is `application/json`
  - Parameter attributes (fromBody, etc)
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

### Response

#### IActionResults
- Action methods should just return IActionResult or Task<IActionResult>, bc then you can use all the other HTTP IActionResult helper methods.
- IActionResults
  - `Ok()` : 200
    - you can use Ok() to return Json      
  - `BadRequest(ModelState)` : 400
  - `CreatedAtAction("Get", new {id = valud.Id}, value)` : 201
    - this return value is the action and values that would be used to create a new link to the resource
    - "get" is the name of the method, id is the route or other action parameter, and value is the full model (just for further info)
    - routing tables will pull this info and create the appropriate link
  - `NoContent()` : 204 
    - when there's no response but everything is ok.
    - [discussion of when this is appropriate](https://stackoverflow.com/questions/2342579/http-status-code-for-update-and-delete)
- Other return types:
  - `ContentResult.Content("hello")`: returns text
  - `JsonResult.Json("somejsonhere")`: returns json
  - [notes](https://docs.microsoft.com/en-us/aspnet/core/web-api/advanced/formatting?view=aspnetcore-2.1)
  
#### Output Formatting
- Content Type negotiation
- **Produces** attribute
  - you can constrain the formats using Produces attributes

      ```(csharp)
      [Produces("application/json, Type=typeof(MyModel))]      
      ```

      - So this response will only by json

- Also possible in  `ConfigureServices()`.  
  - This will allow your API to also return Xml, if spec'ed by the client in the Accept header

    ```(csharp)
    services.AddMvc()
            .AddMvcOptions(o => o.OuytputFormatters.Add(
              new XmlDataContractSerializerOutputFormatter()
            ));
    ``` 


#### Validation
- you can assign validation properties on model classes
- Domain Model or DTO objects can have fields which, for reasons of Normalization, etc aren't in the Data Model
  - Calculated fields
  - Concatenate fields
  - etc.
- Check `ModelState` and `return BadRequest(ModelState)` if necessary
  - this will return info about the validation issue
  - also see `TryValidateModel()`
- Extra validation: call ModelState.AddModelError("FieldName", "Your Custom Validation Msg") when you spot a validation fail
  - This lets you keep using ModelState for all validation concerns - not just what is conveniently attribute based

#### Patch
- Here's how to handle the a Json Patch document on the BE

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

### Extensions
- **Swagger / Swashbuckle**
  - swagger is the way to go for testing out your api
    - swagger is just a metadata format for describing apis
    - swashbuckle is the nuget package with which you can add swagger and it adds a nice testable front-end
  - in `ConfigureServices()`
    - `services.AddSwaggerGen()`
  - in `Configure()`
    - `app.UseSwaggerGen()`
    - `app.UseSwaggerUi()`
  - wonder if you can make swagger hidden or change theming
  - it also lets you explore the returned model classes
  