
LocalDB
-----------------------------

- It is a version of SQL Server that runs on your local machine instead of a server.
- This is related to SQL Server Express, but different because:
	- SQL Server Express targets FREE over Full SQL feature parity
	- LocalDB targets full SQL feature parity
		- This makes LocalDB well-suited as a development DB (i.e. run it locally)
		- Uses the same DB engine as full SQL
- Instances
	- An Instance is created, if not already running, when you try to connect to it, via the typical client-side providers.
	- You can create 'User instances'
		- Specific to windows login
	- LocalDB runs as a separate process
		- It is not truly embedded
		- The process runs in the same security context as the calling application
- Typically, you don't want to run localDB in [production](https://blogs.msdn.microsoft.com/sqlexpress/2011/12/08/using-localdb-with-full-iis-part-1-user-profile/) underneath full IIS:
	- LocalDB needs user profile to be loaded
	- LocalDB instance is owned by a single user and private (by default)	
- When connecting, you refer to it with a different syntax:
	- Typical SQL (Express) server reference: SERVER\\SqlInstance
	- Local DB reference: (localdb)\\version
		- (localdb)\\v11.0		
- You can have it attach to an .mdf in the connection string:
		```
	Data Source=(localdb)\v11.0; Integrated Security=true; AttachDbFileName=C:\MyData\Database1.mdf
	```

- Other use cases (than developer)
	- Not sure... maybe nothing... TODO...

##Refs
[This](https://blogs.msdn.microsoft.com/sqlexpress/2011/07/12/introducing-localdb-an-improved-sql-express/)
[This](http://stackoverflow.com/questions/13571331/is-it-normal-to-use-localdb-in-production)
[This](https://blogs.msdn.microsoft.com/sqlexpress/2011/12/08/using-localdb-with-full-iis-part-1-user-profile/)