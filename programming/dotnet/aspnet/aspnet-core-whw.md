Misc ASP.NET Core Notes
=============

- notes from [web hack wednesday webcast](https://channel9.msdn.com/Shows/Web-Hack-Wednesday/ASPNET-Core-Middleware-Basics)
- in Startup.cs
	-This is the file where you set up how the application:
		- starts up
		- processing pipeline elements (akak *middleware*)
		- dependency injection
		- more...
	- Configure() method:
		- Configures your processing pipeline
		- Initially, doesn't have MVC in it or anything
		- if you want to tell it to serve static files from wwwroot:
				> app.UseStaticFiles()
				
			- This will be defined in a nuget package: Microsoft.AspNet.StaticFiles  
			- The dependencies property in your project.json will also be updated.  Add your using statement.
			- This is an example of *middleware*
			- You call it before the app.Run() call executes
		- You would also add MVC to the pipeline in a similar way:
				> app.UseMVC(routes =>
				> {
				>  ...
				>});
	
		- app.UseIISPlatformHandler()
			- When ASP.NET core runs on IIS, it is implemented as an HTTP module
				- So IIS will just proxy the request to a different server, Kestrel, which runs the ASP.NET core code.
			- You can configure this call here as well (in a manner similar to app.UseMVC())
		- Recall we have dependency injection, so if you pass in IHostingEnvironment to Configure():
			- You can do things like:
				> if (env.IsDevelopment()) {
				>  ...
				> }
			- Based on the environment variables!  Just go to project properties -> Debug -> Environment Variables
			
	- ConfigureServices() method:
		- This is where you would add the services that MVC needs.
		- You also add:
			- Entity Framework
			- MVC
			- Identity
			- Other dependency injection configurations:
				> services.AddTransient<IEmailSender, AuthMessageSender>();				
				> // anytime you set up DI with an IEmailSender, inject the AuthMessageSender type.
				
- wwwroot folder
	- where all the static files live
	- controllers and modules sit outside that
